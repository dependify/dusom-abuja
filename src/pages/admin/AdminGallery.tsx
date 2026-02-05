import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2, Upload, Loader2, Image as ImageIcon, Eye, EyeOff } from "lucide-react";

interface GalleryImage {
  id: string;
  title: string;
  alt_text: string | null;
  category: string;
  image_url: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

const categories = ["General", "Worship", "Graduation", "Campus Life", "Outreach", "Academics", "Fellowship"];

const AdminGallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    alt_text: "",
    category: "General",
    display_order: 0,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = editingImage?.image_url || "";

      // Upload new image if selected
      if (selectedFile) {
        const fileExt = selectedFile.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from("gallery")
          .upload(fileName, selectedFile);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("gallery")
          .getPublicUrl(fileName);

        imageUrl = urlData.publicUrl;
      }

      if (!imageUrl && !editingImage) {
        throw new Error("Please select an image to upload");
      }

      if (editingImage) {
        // Update existing image
        const { error } = await supabase
          .from("gallery_images")
          .update({
            title: formData.title,
            alt_text: formData.alt_text,
            category: formData.category,
            display_order: formData.display_order,
            image_url: imageUrl,
          })
          .eq("id", editingImage.id);

        if (error) throw error;

        toast({
          title: "Image updated!",
          description: "The gallery image has been updated.",
        });
      } else {
        // Create new image
        const { error } = await supabase
          .from("gallery_images")
          .insert({
            title: formData.title,
            alt_text: formData.alt_text,
            category: formData.category,
            display_order: formData.display_order,
            image_url: imageUrl,
          });

        if (error) throw error;

        toast({
          title: "Image added!",
          description: "The new image has been added to the gallery.",
        });
      }

      setDialogOpen(false);
      resetForm();
      fetchImages();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (image: GalleryImage) => {
    setEditingImage(image);
    setFormData({
      title: image.title,
      alt_text: image.alt_text || "",
      category: image.category,
      display_order: image.display_order,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("gallery_images")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Image deleted!",
        description: "The image has been removed from the gallery.",
      });
      fetchImages();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const toggleActive = async (image: GalleryImage) => {
    try {
      const { error } = await supabase
        .from("gallery_images")
        .update({ is_active: !image.is_active })
        .eq("id", image.id);

      if (error) throw error;

      toast({
        title: image.is_active ? "Image hidden" : "Image visible",
        description: `The image is now ${image.is_active ? "hidden from" : "visible on"} the website.`,
      });
      fetchImages();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setEditingImage(null);
    setFormData({
      title: "",
      alt_text: "",
      category: "General",
      display_order: 0,
    });
    setSelectedFile(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gallery Management</h1>
          <p className="text-muted-foreground">Add, edit, and manage gallery images</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="bg-accent-gold hover:bg-accent-orange text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Image
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingImage ? "Edit Image" : "Add New Image"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Worship Session"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="alt_text">Alt Text (for accessibility)</Label>
                <Input
                  id="alt_text"
                  value={formData.alt_text}
                  onChange={(e) => setFormData((prev) => ({ ...prev, alt_text: e.target.value }))}
                  placeholder="Students worshipping during morning session"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="order">Display Order</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData((prev) => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image {!editingImage && "*"}</Label>
                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="image"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {selectedFile ? selectedFile.name : "Click to upload image"}
                    </span>
                  </label>
                </div>
                {editingImage && !selectedFile && (
                  <p className="text-xs text-muted-foreground">
                    Leave empty to keep current image
                  </p>
                )}
              </div>

              <div className="flex gap-2 justify-end pt-4">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={uploading} className="bg-accent-gold hover:bg-accent-orange">
                  {uploading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      {editingImage ? "Updating..." : "Uploading..."}
                    </>
                  ) : (
                    editingImage ? "Update" : "Add Image"
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {images.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No images in the gallery yet</p>
            <Button
              className="mt-4 bg-accent-gold hover:bg-accent-orange text-white"
              onClick={() => setDialogOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add First Image
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={`overflow-hidden ${!image.is_active ? "opacity-60" : ""}`}>
                  <div className="relative aspect-video">
                    <img
                      src={image.image_url}
                      alt={image.alt_text || image.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <span className="px-2 py-1 bg-black/50 text-white text-xs rounded">
                        {image.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold truncate">{image.title}</h3>
                    <p className="text-sm text-muted-foreground">Order: {image.display_order}</p>
                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(image)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleActive(image)}
                      >
                        {image.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Image?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently remove "{image.title}" from the gallery. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(image.id)}
                              className="bg-destructive hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
