import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quote, ArrowRight, Sparkles, Heart, Flame, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimony {
  id: number;
  name: string;
  role: string;
  category: "healing" | "transformation" | "calling" | "provision";
  highlight: string;
  excerpt: string;
}

const testimonies: Testimony[] = [
  {
    id: 1,
    name: "Innocent Power",
    role: "DUSOM Student",
    category: "transformation",
    highlight: "The mantle of the commission visited me",
    excerpt: "During our induction program, I contacted fire and something left me. In a dream, I saw the mantle of the commission visit me. This encounter has transformed my life completely."
  },
  {
    id: 2,
    name: "Blessing Okonkwo",
    role: "DUSOM Student",
    category: "provision",
    highlight: "From discouragement to retentive memory",
    excerpt: "I was discouraged about meeting up with lectures, but after Monday's prayer meeting, I started having retentive memory. God has been faithful to me and my family."
  },
  {
    id: 3,
    name: "Olamide Israel",
    role: "DUSOM Student",
    category: "calling",
    highlight: "Led by the Spirit to DUSOM",
    excerpt: "I was in Italy with health problems. In 2001, I had an encounter with Jesus Christ in a dream. The Spirit led me to DUSOM instead of where I planned to go."
  }
];

const categoryConfig = {
  healing: {
    icon: Heart,
    label: "Healing",
    gradient: "from-rose-500/10 to-pink-500/10",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600"
  },
  transformation: {
    icon: Flame,
    label: "Transformation",
    gradient: "from-amber-500/10 to-orange-500/10",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600"
  },
  calling: {
    icon: BookOpen,
    label: "Divine Calling",
    gradient: "from-blue-500/10 to-indigo-500/10",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600"
  },
  provision: {
    icon: Sparkles,
    label: "Divine Provision",
    gradient: "from-emerald-500/10 to-teal-500/10",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600"
  }
};

export const TestimonialsPreview = () => {
  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-content">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center justify-center w-14 h-14 bg-accent-gold/10 rounded-full mb-4"
          >
            <Quote className="w-7 h-7 text-accent-gold" />
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Student <span className="text-accent-gold">Testimonies</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Hear from our students about how God has transformed their lives through DUSOM
          </p>
        </motion.div>

        {/* Testimony Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonies.map((testimony, index) => {
            const config = categoryConfig[testimony.category];
            const CategoryIcon = config.icon;
            
            return (
              <motion.div
                key={testimony.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  "group relative bg-secondary/30 rounded-2xl p-6 md:p-8",
                  "hover:shadow-xl hover:shadow-primary/5 transition-all duration-500",
                  "border border-transparent hover:border-accent-gold/20",
                  "overflow-hidden"
                )}
              >
                {/* Background gradient */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                  config.gradient
                )} />
                
                <div className="relative z-10">
                  {/* Category Badge */}
                  <div className={cn(
                    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium mb-4",
                    config.iconBg,
                    config.iconColor
                  )}>
                    <CategoryIcon className="w-3 h-3" />
                    {config.label}
                  </div>

                  {/* Quote Icon */}
                  <Quote className="w-8 h-8 text-accent-gold/30 mb-3 group-hover:text-accent-gold/50 transition-colors" />

                  {/* Highlight */}
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-3 group-hover:text-primary transition-colors">
                    "{testimony.highlight}"
                  </h3>

                  {/* Excerpt */}
                  <p className="text-foreground/70 text-sm leading-relaxed line-clamp-4 mb-6">
                    {testimony.excerpt}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-primary-foreground font-heading font-bold text-sm">
                      {testimony.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{testimony.name}</p>
                      <p className="text-xs text-muted-foreground">{testimony.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
        >
          <Button 
            asChild 
            variant="outline" 
            size="lg" 
            className="group border-primary text-primary hover:bg-primary hover:text-white gap-2"
          >
            <Link to="/testimonies">
              Read All Testimonies
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsPreview;
