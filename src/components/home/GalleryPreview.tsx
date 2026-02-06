import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Images } from "lucide-react";

// First 9 gallery images
const previewImages = [
  { src: "/gallery/gallery-01.jpg", alt: "DUSOM Campus Life" },
  { src: "/gallery/gallery-02.jpg", alt: "Student Fellowship" },
  { src: "/gallery/gallery-03.jpg", alt: "Worship Session" },
  { src: "/gallery/gallery-04.jpg", alt: "Classroom Session" },
  { src: "/gallery/gallery-05.jpg", alt: "Student Activities" },
  { src: "/gallery/gallery-06.jpg", alt: "Ministry Training" },
  { src: "/gallery/gallery-07.jpg", alt: "Group Discussion" },
  { src: "/gallery/gallery-08.jpg", alt: "Campus Events" },
  { src: "/gallery/gallery-09.jpg", alt: "Student Worship" },
];

export function GalleryPreview() {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container-content relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <Images className="w-4 h-4" />
            Photo Gallery
          </span>
          <h2 className="text-foreground mb-4">Life at DUSOM</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience the vibrant campus life, powerful worship sessions, and memorable moments at Dunamis School of Ministry.
          </p>
        </motion.div>

        {/* 3x3 Image Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto mb-10"
        >
          {previewImages.map((image, index) => (
            <motion.div
              key={image.src}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow"
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h4 className="text-white font-semibold text-sm">{image.alt}</h4>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 group"
            asChild
          >
            <Link to="/student-life">
              View Full Gallery
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <p className="text-muted-foreground text-sm mt-3">
            Explore 270+ photos from our vibrant community
          </p>
        </motion.div>
      </div>
    </section>
  );
}
