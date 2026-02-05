import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingElement } from "@/components/ui/parallax-section";
const courses = [
  {
    id: 1,
    title: "Understanding the Bible",
    description: "Deep dive into biblical interpretation, hermeneutics, and proper study methods for effective ministry.",
    variant: "blue",
  },
  {
    id: 2,
    title: "Purpose, Vision & Divine Direction",
    description: "Discover God's specific plan for your life and learn to walk in your divine assignment.",
    variant: "gold",
  },
  {
    id: 3,
    title: "Faith Principles",
    description: "Master the principles of faith that activate God's power and provision in ministry.",
    variant: "green",
  },
  {
    id: 4,
    title: "Prayer & Intercession",
    description: "Develop a powerful prayer life and learn the art of effective intercession.",
    variant: "mixed",
  },
  {
    id: 5,
    title: "Church History & Doctrine",
    description: "Understand the foundations of Christian faith through historical and doctrinal study.",
    variant: "blue",
  },
  {
    id: 6,
    title: "Biblical Leadership",
    description: "Learn kingdom principles of leadership that transform ministries and communities.",
    variant: "gold",
  },
];

const variantStyles: Record<string, string> = {
  blue: "course-card-blue",
  gold: "course-card-gold",
  green: "course-card-green",
  mixed: "course-card-mixed",
};

export function FeaturedCourses() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const titleY = useTransform(scrollYProgress, [0, 0.5], [40, 0]);
  const cardsY = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -30]);

  return (
    <section ref={sectionRef} className="relative section-padding bg-background overflow-hidden">
      {/* Parallax decorative elements */}
      <motion.div 
        className="absolute inset-0 -z-10"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-gold/5 rounded-full blur-3xl" />
      </motion.div>

      <FloatingElement 
        className="top-10 right-20 w-24 h-24 bg-accent-gold/8 rounded-full blur-2xl"
        speed={0.4}
        direction="down"
      />
      <FloatingElement 
        className="bottom-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl"
        speed={0.3}
        direction="up"
      />

      <div className="container-content relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-foreground mb-4">
            Transform Your Ministry Through Our{" "}
            <span className="text-primary">Curriculum</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            22 comprehensive courses designed to equip you spiritually and academically
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                y: -12, 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className={`${variantStyles[course.variant]} rounded-2xl p-6 md:p-8 text-primary-foreground relative overflow-hidden group cursor-pointer hover:shadow-gold-lg transition-shadow duration-300`}
            >
              {/* Course Number Watermark */}
              <span className="absolute top-4 right-4 text-6xl font-heading font-bold opacity-10 group-hover:opacity-20 transition-opacity">
                {String(course.id).padStart(2, "0")}
              </span>

              <div className="relative z-10 space-y-4">
                <motion.span 
                  className="inline-block px-3 py-1 rounded-full bg-primary-foreground/20 text-xs font-medium uppercase tracking-wide group-hover:bg-accent-gold group-hover:text-primary-dark transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  Semester {course.id <= 3 ? "1" : "2"}
                </motion.span>
                
                <h3 className="text-xl md:text-2xl font-heading font-semibold pr-8 group-hover:text-accent-gold transition-colors duration-300">
                  {course.title}
                </h3>
                
                <p className="text-primary-foreground/80 text-sm leading-relaxed line-clamp-3">
                  {course.description}
                </p>

                <div className="flex items-center justify-between pt-4">
                  <span className="text-xs opacity-70">Full semester course</span>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <ArrowRight className="h-5 w-5 opacity-70 group-hover:opacity-100 group-hover:text-accent-gold transition-all" />
                  </motion.div>
                </div>
              </div>

              {/* Enhanced Hover Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-t from-accent-gold/20 via-transparent to-white/10" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button 
            size="lg" 
            className="bg-accent-gold hover:bg-accent-orange text-primary-dark font-semibold group shadow-gold hover:shadow-gold-lg transition-all duration-300 hover:scale-105"
            asChild
          >
            <Link to="/courses">
              View All Courses (22 Total)
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
