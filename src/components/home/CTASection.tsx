import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const infoItems = [
  { icon: Calendar, label: "Session Dates", value: "January - June 2026" },
  { icon: Clock, label: "Application Deadline", value: "December 15, 2025" },
  { icon: Zap, label: "Class Duration", value: "6 Months" },
];

export function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const contentY = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -40]);
  const decorLeft = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);
  const decorRight = useTransform(scrollYProgress, [0, 1], ["50%", "0%"]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Background Gradient with Parallax */}
      <motion.div 
        className="absolute inset-0 bg-gradient-primary" 
        style={{ y: backgroundY }}
      />
      
      {/* Parallax Decorative Pattern */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl"
          style={{ x: decorRight, y: "-50%" }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl"
          style={{ x: decorLeft, y: "50%" }}
        />
      </div>

      <motion.div className="relative z-10 container-content section-padding text-center" style={{ y: contentY }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <h2 className="text-primary-foreground">
            Ready to Become a <span className="text-accent">Firebrand</span>?
          </h2>
          
          <p className="text-xl text-primary-foreground/80">
            Join the next cohort and transform your life and ministry
          </p>

          {/* Info Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 py-8"
          >
            {infoItems.map((item, index) => (
              <motion.div 
                key={item.label}
                className="flex flex-col items-center gap-2 group cursor-default"
                whileHover={{ y: -8, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="group-hover:drop-shadow-[0_0_12px_rgba(212,160,23,0.6)] transition-all duration-300"
                >
                  <item.icon className="h-8 w-8 text-accent-gold mb-1 group-hover:text-accent-orange transition-colors" />
                </motion.div>
                <span className="text-xs uppercase tracking-wide text-primary-foreground/60 group-hover:text-accent-gold transition-colors">
                  {item.label}
                </span>
                <span className="font-heading font-semibold text-lg text-primary-foreground group-hover:text-accent-gold transition-colors">
                  {item.value}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4 pt-4"
          >
            <Button
              size="lg"
              className="bg-accent-gold text-primary-dark hover:bg-accent-orange shadow-gold hover:shadow-gold-lg text-lg px-8 py-6 group font-semibold transition-all duration-300 hover:scale-105"
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
              <Link to="/admissions#requirements">View Requirements</Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
