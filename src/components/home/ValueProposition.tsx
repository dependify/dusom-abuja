import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingElement } from "@/components/ui/parallax-section";

const features = [
  {
    title: "Spiritual Impartation",
    description: "Direct teaching from seasoned ministers including Dr. Paul Enenche"
  },
  {
    title: "Practical Ministry Training",
    description: "Hands-on experience in real ministry settings"
  },
  {
    title: "Character Development",
    description: "Holistic training that builds biblical foundation"
  },
];

export function ValueProposition() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const leftContentX = useTransform(scrollYProgress, [0, 0.5, 1], [-30, 0, 30]);
  const rightContentX = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -30]);

  return (
    <section ref={sectionRef} className="relative section-padding bg-secondary/50 overflow-hidden">
      {/* Parallax background decoration */}
      <motion.div 
        className="absolute inset-0 -z-10"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </motion.div>

      <FloatingElement 
        className="top-1/4 right-1/4 w-20 h-20 bg-accent-gold/10 rounded-full blur-xl"
        speed={0.5}
        direction="up"
      />

      <div className="container-content">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-primary opacity-90 group-hover:opacity-80 transition-opacity" />
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="text-center text-primary-foreground">
                <div className="text-6xl md:text-7xl font-heading font-bold mb-4">DUSOM</div>
                <div className="text-xl md:text-2xl opacity-90">Dunamis School of Ministry</div>
                <div className="mt-6 text-lg opacity-75">Abuja Campus • Est. 2000</div>
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-foreground text-balance">
              More Than Academic{" "}
              <span className="text-primary">Knowledge</span>
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              At DUNAMIS School of Ministry, our training integrates spiritual impartation 
              with practical ministry experience. You'll learn from seasoned pastors while 
              growing in character and biblical foundation.
            </p>

            <div className="space-y-4 pt-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="flex gap-4 group cursor-pointer p-3 rounded-xl hover:bg-accent-gold/5 hover:shadow-gold-sm transition-all duration-300"
                >
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-accent-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent-gold group-hover:shadow-gold transition-all duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Check className="h-6 w-6 text-accent-gold group-hover:text-primary-dark transition-colors" />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-foreground group-hover:text-accent-orange transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-6"
            >
              <Button 
                size="lg" 
                className="bg-accent-gold hover:bg-accent-orange text-primary-dark font-semibold group shadow-gold hover:shadow-gold-lg transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link to="/about">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
