import { useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef, RefObject } from "react";

interface ParallaxOptions {
  speed?: number; // 0.1 = slow, 0.5 = medium, 1 = fast
  direction?: "up" | "down";
  offset?: ["start start" | "start end" | "end start" | "end end", "start start" | "start end" | "end start" | "end end"];
}

interface ParallaxResult {
  ref: RefObject<HTMLDivElement>;
  y: MotionValue<number>;
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
}

export function useParallax({
  speed = 0.3,
  direction = "up",
  offset = ["start end", "end start"],
}: ParallaxOptions = {}): ParallaxResult {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  // Calculate movement range based on speed and direction
  const movement = 100 * speed;
  const yRange = direction === "up" ? [movement, -movement] : [-movement, movement];
  
  const y = useTransform(scrollYProgress, [0, 1], yRange);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return { ref, y, opacity, scale };
}

// Simplified hook for just background parallax
export function useBackgroundParallax(speed: number = 0.5) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);
  
  return { ref, y };
}
