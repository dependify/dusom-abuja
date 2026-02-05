import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { FloatingElement } from "@/components/ui/parallax-section";
interface StatItem {
  value: number;
  suffix: string;
  label: string;
  description: string;
  icon: string;
}

interface AnimatedCounterProps {
  items: StatItem[];
}

function CountUp({ 
  end, 
  suffix, 
  duration = 2000 
}: { 
  end: number; 
  suffix: string; 
  duration?: number 
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export function AnimatedCounter({ items }: AnimatedCounterProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const contentY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section ref={sectionRef} className="relative section-padding bg-background overflow-hidden">
      {/* Floating decorative elements with parallax */}
      <FloatingElement 
        className="top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl"
        speed={0.3}
        direction="up"
      />
      <FloatingElement 
        className="bottom-20 right-10 w-40 h-40 bg-accent-gold/5 rounded-full blur-2xl"
        speed={0.4}
        direction="down"
      />
      
      <motion.div className="container-content relative z-10" style={{ y: contentY }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {items.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                y: -10, 
                scale: 1.03,
                transition: { duration: 0.3 }
              }}
              className="text-center p-8 rounded-2xl bg-secondary/50 hover:bg-secondary hover:shadow-gold transition-all duration-300 group cursor-default"
            >
              <motion.div 
                className="text-5xl mb-4 inline-block"
                whileHover={{ scale: 1.3, rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                {item.icon}
              </motion.div>
              <div className="stat-number text-primary mb-2 group-hover:text-accent-gold transition-colors">
                <CountUp end={item.value} suffix={item.suffix} />
              </div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2 group-hover:text-accent-orange transition-colors">
                {item.label}
              </h3>
              <p className="text-muted-foreground text-sm group-hover:text-foreground/70 transition-colors">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
