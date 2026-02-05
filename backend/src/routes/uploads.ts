import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import { query } from '../utils/db.js';
import { authenticate, AuthenticatedRequest } from '../middleware/auth.js';

const router = Router();

// Configure multer for application documents
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = process.env.UPLOAD_DIR || './uploads';
    const docsDir = path.join(uploadDir, 'application-documents');
    
    if (!fs.existsSync(docsDir)) {
      fs.mkdirSync(docsDir, { recursive: true });
    }
    
    cb(null, docsDir);
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
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, WebP and PDF are allowed.'));
    }
  }
});

// Upload application document (public - uses resume token)
router.post('/application/:token', upload.single('file'), async (req, res) => {
  try {
    const { token } = req.params;
    const { field } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Verify the application exists
    const appResult = await query(
      'SELECT id, status FROM public.admission_applications WHERE resume_token = $1',
      [token]
    );

    if (appResult.rows.length === 0) {
      // Delete uploaded file
      fs.unlinkSync(req.file.path);
      return res.status(404).json({ error: 'Application not found' });
    }

    if (appResult.rows[0].status !== 'draft') {
      // Delete uploaded file
      fs.unlinkSync(req.file.path);
      return res.status(403).json({ error: 'Cannot upload to submitted application' });
    }

    const fileUrl = req.file.filename;

    // Record in storage_objects
    await query(
      `INSERT INTO public.storage_objects (bucket_id, name, mime_type, size, metadata)
       VALUES ($1, $2, $3, $4, $5)`,
      ['application-documents', fileUrl, req.file.mimetype, req.file.size, JSON.stringify({ 
        originalName: req.file.originalname,
        field,
        resumeToken: token
      })]
    );

    const baseUrl = `${req.protocol}://${req.get('host')}/uploads/application-documents`;
    res.json({
      url: `${baseUrl}/${fileUrl}`,
      filename: fileUrl,
      originalName: req.file.originalname
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get file info (authenticated)
router.get('/info/:bucket/:filename', authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    const { bucket, filename } = req.params;

    const result = await query(
      'SELECT * FROM public.storage_objects WHERE bucket_id = $1 AND name = $2',
      [bucket, filename]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get file info error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete file (admin only)
router.delete('/:bucket/:filename', authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    const { bucket, filename } = req.params;

    // Delete from database
    await query(
      'DELETE FROM public.storage_objects WHERE bucket_id = $1 AND name = $2',
      [bucket, filename]
    );

    // Delete file
    const uploadDir = process.env.UPLOAD_DIR || './uploads';
    const filePath = path.join(uploadDir, bucket, filename);
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Delete file error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
