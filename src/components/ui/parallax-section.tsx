import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  backgroundClassName?: string;
  backgroundImage?: string;
  backgroundGradient?: string;
  parallaxSpeed?: number; // 0.1 to 1, default 0.3
  fadeOnScroll?: boolean;
  scaleOnScroll?: boolean;
  overlay?: boolean;
  overlayClassName?: string;
}

export function ParallaxSection({
  children,
  className,
  backgroundClassName,
  backgroundImage,
  backgroundGradient,
  parallaxSpeed = 0.3,
  fadeOnScroll = true,
  scaleOnScroll = false,
  overlay = false,
  overlayClassName,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax movement for background
  const y = useTransform(scrollYProgress, [0, 1], [0, -150 * parallaxSpeed]);
  
  // Optional fade effect
  const opacity = fadeOnScroll 
    ? useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.7, 1, 1, 0.7])
    : undefined;
  
  // Optional scale effect
  const scale = scaleOnScroll
    ? useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.98])
    : undefined;

  return (
    <section ref={ref} className={cn("relative overflow-hidden", className)}>
      {/* Parallax Background */}
      {(backgroundImage || backgroundGradient) && (
        <motion.div
          className={cn("absolute inset-0 -z-10", backgroundClassName)}
          style={{
            y,
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : backgroundGradient,
            backgroundSize: "cover",
            backgroundPosition: "center",
            // Extend background to prevent gaps during parallax
            top: "-10%",
            bottom: "-10%",
            height: "120%",
          }}
        />
      )}

      {/* Optional Overlay */}
      {overlay && (
        <div className={cn("absolute inset-0 -z-5", overlayClassName || "hero-overlay")} />
      )}

      {/* Content with optional animations */}
      <motion.div
        style={{
          opacity,
          scale,
        }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </section>
  );
}

// Simpler parallax background component for existing sections
interface ParallaxBackgroundProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export function ParallaxBackground({
  children,
  className,
  speed = 0.2,
}: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [30 * speed, -30 * speed]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y, opacity }}
    >
      {children}
    </motion.div>
  );
}

// Floating decorative elements with parallax
interface FloatingElementProps {
  className?: string;
  speed?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function FloatingElement({
  className,
  speed = 0.5,
  direction = "up",
}: FloatingElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const movement = 100 * speed;
  const transforms = {
    up: { y: useTransform(scrollYProgress, [0, 1], [movement, -movement]) },
    down: { y: useTransform(scrollYProgress, [0, 1], [-movement, movement]) },
    left: { x: useTransform(scrollYProgress, [0, 1], [movement, -movement]) },
    right: { x: useTransform(scrollYProgress, [0, 1], [-movement, movement]) },
  };

  return (
    <motion.div
      ref={ref}
      className={cn("absolute pointer-events-none", className)}
      style={transforms[direction]}
    />
  );
}
