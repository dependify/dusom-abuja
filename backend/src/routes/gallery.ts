import { Router } from 'express';
import { z } from 'zod';
import { query } from '../utils/db.js';
import { authenticate, AuthenticatedRequest, requireRole } from '../middleware/auth.js';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

const router = Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = process.env.UPLOAD_DIR || './uploads';
    const galleryDir = path.join(uploadDir, 'gallery');
    
    if (!fs.existsSync(galleryDir)) {
      fs.mkdirSync(galleryDir, { recursive: true });
    }
    
    cb(null, galleryDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760') },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG and WebP are allowed.'));
    }
  }
});

// Get all active gallery images (public)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    
    let whereClause = 'WHERE is_active = true';
    const params: any[] = [];
    
    if (category && category !== 'all') {
      whereClause += ' AND category = $1';
      params.push(category);
    }

    const result = await query(
      `SELECT * FROM public.gallery_images 
       ${whereClause}
       ORDER BY display_order ASC, created_at DESC`,
      params
    );

    // Transform image URLs to full URLs
    const baseUrl = `${req.protocol}://${req.get('host')}/uploads/gallery`;
    const images = result.rows.map(img => ({
      ...img,
      image_url: img.image_url.startsWith('http') ? img.image_url : `${baseUrl}/${img.image_url}`
    }));

    res.json(images);
  } catch (error: any) {
    console.error('Get gallery error:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message, stack: error.stack });
  }
});

// Get all gallery images (admin)
router.get('/admin', authenticate, requireRole('admin'), async (req: AuthenticatedRequest, res) => {
  try {
    const result = await query(
      'SELECT * FROM public.gallery_images ORDER BY display_order ASC, created_at DESC'
    );

    const baseUrl = `${req.protocol}://${req.get('host')}/uploads/gallery`;
    const images = result.rows.map(img => ({
      ...img,
      image_url: img.image_url.startsWith('http') ? img.image_url : `${baseUrl}/${img.image_url}`
    }));

    res.json(images);
  } catch (error) {
    console.error('Get gallery admin error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Upload image (admin)
router.post('/', authenticate, requireRole('admin'), upload.single('file'), async (req: AuthenticatedRequest, res) => {
  try {
    const { title, alt_text, category, display_order } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const imageUrl = req.file.filename;

    const result = await query(
      `INSERT INTO public.gallery_images (title, alt_text, category, image_url, display_order, created_by)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [title, alt_text || title, category || 'General', imageUrl, parseInt(display_order) || 0, req.user!.userId]
    );

    // Also record in storage_objects
    await query(
      `INSERT INTO public.storage_objects (bucket_id, name, owner, mime_type, size, metadata)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      ['gallery', imageUrl, req.user!.userId, req.file.mimetype, req.file.size, JSON.stringify({ originalName: req.file.originalname })]
    );

    const baseUrl = `${req.protocol}://${req.get('host')}/uploads/gallery`;
    res.status(201).json({
      ...result.rows[0],
      image_url: `${baseUrl}/${imageUrl}`
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update image (admin)
router.patch('/:id', authenticate, requireRole('admin'), async (req: AuthenticatedRequest, res) => {
  try {
    const { id } = req.params;
    const { title, alt_text, category, display_order, is_active } = req.body;

    const result = await query(
      `UPDATE public.gallery_images 
       SET title = COALESCE($1, title),
           alt_text = COALESCE($2, alt_text),
           category = COALESCE($3, category),
           display_order = COALESCE($4, display_order),
           is_active = COALESCE($5, is_active)
       WHERE id = $6
       RETURNING *`,
      [title, alt_text, category, display_order, is_active, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Image not found' });
    }

    const baseUrl = `${req.protocol}://${req.get('host')}/uploads/gallery`;
    res.json({
      ...result.rows[0],
      image_url: result.rows[0].image_url.startsWith('http') ? result.rows[0].image_url : `${baseUrl}/${result.rows[0].image_url}`
    });
  } catch (error) {
    console.error('Update gallery error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete image (admin)
router.delete('/:id', authenticate, requireRole('admin'), async (req: AuthenticatedRequest, res) => {
  try {
    const { id } = req.params;

    // Get image info first
    const imageResult = await query(
      'SELECT * FROM public.gallery_images WHERE id = $1',
      [id]
    );

    if (imageResult.rows.length === 0) {
      return res.status(404).json({ error: 'Image not found' });
    }

    const image = imageResult.rows[0];

    // Delete from database
    await query('DELETE FROM public.gallery_images WHERE id = $1', [id]);

    // Delete file
    const uploadDir = process.env.UPLOAD_DIR || './uploads';
    const filePath = path.join(uploadDir, 'gallery', image.image_url);
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete from storage_objects
    await query('DELETE FROM public.storage_objects WHERE bucket_id = $1 AND name = $2', ['gallery', image.image_url]);

    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Delete gallery error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
