import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "DUSOM completely transformed my understanding of ministry. The spiritual impartation I received here equipped me to plant three churches in my home country. I went in as a believer but came out as a firebrand!",
    name: "Pastor Emmanuel Okonkwo",
    role: "Church Planter, 2021 Alumnus",
    rating: 5,
  },
  {
    id: 2,
    quote: "The practical training at DUSOM prepared me for real ministry challenges. Today, I lead a youth ministry of over 500 young people. The foundation laid here was invaluable.",
    name: "Pastor Grace Adebayo",
    role: "Youth Ministry Director, 2020 Alumnus",
    rating: 5,
  },
  {
    id: 3,
    quote: "I traveled from Kenya to attend DUSOM, and it was the best decision of my life. The curriculum, the mentorship, and the spiritual atmosphere here are unmatched anywhere else.",
    name: "Rev. David Kimani",
    role: "Senior Pastor, 2019 Alumnus",
    rating: 5,
  },
];

export function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentY = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -30]);
  const decorScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, next]);

  return (
    <section 
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
      style={{ background: "linear-gradient(135deg, hsl(199 81% 97%) 0%, hsl(194 90% 95%) 100%)" }}
    >
      {/* Parallax decorative elements */}
      <motion.div 
        className="absolute inset-0 -z-10"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent-gold/8 rounded-full blur-3xl" />
      </motion.div>

      <motion.div 
        className="absolute top-20 right-10 w-20 h-20 bg-accent-gold/15 rounded-full blur-xl pointer-events-none"
        style={{ scale: decorScale }}
      />
      <motion.div 
        className="absolute bottom-20 left-10 w-24 h-24 bg-primary/10 rounded-full blur-xl pointer-events-none"
        style={{ scale: decorScale }}
      />

      <motion.div className="container-content relative z-10" style={{ y: contentY }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-foreground mb-4">
            Stories of <span className="text-primary">Transformation</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Real students. Real change. Real impact.
          </p>
        </motion.div>

        <div 
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={prev}
            className="absolute -left-4 lg:-left-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background shadow-md border flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors z-10 hidden md:flex"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={next}
            className="absolute -right-4 lg:-right-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background shadow-md border flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors z-10 hidden md:flex"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Testimonial Cards */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-background rounded-2xl p-8 md:p-10 shadow-lg"
              >
                {/* Quote Icon */}
                <Quote className="h-10 w-10 text-primary/20 mb-4" />

                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <blockquote className="text-lg md:text-xl text-foreground/80 italic leading-relaxed mb-8">
                  "{testimonials[current].quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-heading font-bold text-xl">
                    {testimonials[current].name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-heading font-semibold text-foreground">
                      {testimonials[current].name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonials[current].role}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === current 
                    ? "bg-primary scale-125" 
                    : "bg-primary/30 hover:bg-primary/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
