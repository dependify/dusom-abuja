import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";
import heroVideo from "@/assets/hero-video.mp4";
import heroBg from "@/assets/hero-bg.jpg";

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax effect for content
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  // Lazy load video after initial render for faster LCP
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldLoadVideo(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };

  const scrollToContent = () => {
    window.scrollTo({ 
      top: window.innerHeight - 100, 
      behavior: "smooth" 
    });
  };

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        {/* Poster image shown while video loads */}
        <div 
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 ${isVideoLoaded ? 'opacity-0' : 'opacity-100'}`}
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        
        {/* Video - lazy loaded with optimized settings */}
        {shouldLoadVideo && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={heroBg}
            onLoadedData={handleVideoLoaded}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        )}
        
        {/* Blue overlay for text visibility */}
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Content with parallax fade */}
      <motion.div 
        className="relative z-10 container-content px-4 md:px-6 py-20 text-center"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground/90 text-sm font-medium border border-primary-foreground/20"
          >
            🔥 Now Accepting Applications for 2026 Session
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-primary-foreground text-balance"
          >
            Train to Ignite the World with the{" "}
            <span className="text-accent">Gospel of Jesus Christ</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl md:text-2xl text-primary-foreground/80 max-w-2xl mx-auto"
          >
            Join thousands of firebrands who've been equipped at Dunamis School of Ministry
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <Button
              size="lg"
              className="bg-accent-gold hover:bg-accent-orange text-primary-dark font-semibold shadow-gold hover:shadow-gold-lg text-lg px-8 py-6 btn-glow group transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link to="/apply">
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-accent-gold/50 text-accent-gold hover:bg-accent-gold hover:text-primary-dark text-lg px-8 py-6 transition-all duration-300 hover:scale-105 hover:shadow-gold"
              asChild
            >
              <Link to="/about">Discover More</Link>
            </Button>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-wrap justify-center gap-8 pt-8"
          >
            {[
              { value: "10,000+", label: "Graduates" },
              { value: "50+", label: "Countries" },
              { value: "26+", label: "Years" },
            ].map((stat, index) => (
              <motion.div 
                key={stat.label} 
                className="text-center group cursor-default"
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-2xl md:text-3xl font-heading font-bold text-accent-gold group-hover:text-accent-orange transition-colors">
                  {stat.value}
                </div>
                <div className="text-primary-foreground/60 text-sm group-hover:text-primary-foreground/80 transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          onClick={scrollToContent}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary-foreground/70 hover:text-primary-foreground transition-colors cursor-pointer"
          aria-label="Scroll to content"
        >
          <ChevronDown className="h-10 w-10 animate-bounce-down" />
        </motion.button>
      </motion.div>
    </section>
  );
}
