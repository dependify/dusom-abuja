import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import worshipSession from "@/assets/gallery/worship-session.jpg";
import graduation from "@/assets/gallery/graduation.jpg";
import campusStudy from "@/assets/gallery/campus-study.jpg";
import outreach from "@/assets/gallery/outreach.jpg";
import classroom from "@/assets/gallery/classroom.jpg";
import fellowship from "@/assets/gallery/fellowship.jpg";

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

const galleryImages: GalleryImage[] = [
  { src: worshipSession, alt: "Worship Session", category: "Worship" },
  { src: graduation, alt: "Graduation Ceremony", category: "Graduation" },
  { src: campusStudy, alt: "Campus Study", category: "Campus Life" },
  { src: outreach, alt: "Community Outreach", category: "Outreach" },
  { src: classroom, alt: "Classroom Session", category: "Academics" },
  { src: fellowship, alt: "Student Fellowship", category: "Fellowship" },
];

const categories = ["All", "Worship", "Graduation", "Campus Life", "Outreach", "Academics", "Fellowship"];

export const PhotoGallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentY = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -20]);
  const gridScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.98, 1, 1, 0.98]);

  const filteredImages = activeCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  const handlePrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1);
    }
  };

  const handleNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === filteredImages.length - 1 ? 0 : selectedImage + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrevious();
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "Escape") setSelectedImage(null);
  };

  return (
    <section ref={sectionRef} className="relative section-padding bg-secondary/30 overflow-hidden">
      {/* Parallax background decoration */}
      <motion.div 
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent-gold/5 rounded-full blur-3xl" />
      </motion.div>

      <motion.div className="container-content relative z-10" style={{ y: contentY }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Photo Gallery
          </span>
          <h2 className="text-foreground mb-4">Life in Pictures</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience the vibrant campus life, powerful worship sessions, and memorable graduation ceremonies at DUSOM.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className={activeCategory === category 
                ? "bg-primary text-primary-foreground" 
                : "border-primary/30 text-primary hover:bg-primary/10"
              }
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Gallery Grid with parallax scale */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          style={{ scale: gridScale }}
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs text-primary-foreground/80 uppercase tracking-wider mb-1">
                    {image.category}
                  </span>
                  <h4 className="text-white font-semibold">{image.alt}</h4>
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn className="w-5 h-5 text-white" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Dialog */}
        <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent 
            className="max-w-5xl w-[95vw] p-0 bg-black/95 border-none overflow-hidden"
            onKeyDown={handleKeyDown}
          >
            {selectedImage !== null && (
              <div className="relative">
                {/* Close button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 z-50 text-white hover:bg-white/20 rounded-full"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="w-6 h-6" />
                </Button>

                {/* Navigation buttons */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 rounded-full w-12 h-12"
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="w-8 h-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 rounded-full w-12 h-12"
                  onClick={handleNext}
                >
                  <ChevronRight className="w-8 h-8" />
                </Button>

                {/* Image */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImage}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="relative"
                  >
                    <img
                      src={filteredImages[selectedImage].src}
                      alt={filteredImages[selectedImage].alt}
                      className="w-full h-auto max-h-[80vh] object-contain"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                      <span className="text-xs text-primary uppercase tracking-wider mb-1 block">
                        {filteredImages[selectedImage].category}
                      </span>
                      <h3 className="text-white text-xl font-semibold">
                        {filteredImages[selectedImage].alt}
                      </h3>
                      <p className="text-white/60 text-sm mt-1">
                        {selectedImage + 1} of {filteredImages.length}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </motion.div>
    </section>
  );
};
