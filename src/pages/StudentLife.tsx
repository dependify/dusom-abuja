import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Flame, Users, Target, Heart, Globe, GraduationCap, ArrowRight, BookOpen, Monitor } from "lucide-react";
import { PhotoGallery } from "@/components/student-life/PhotoGallery";
import headerStudentLifeBg from "@/assets/header-student-life.jpg";

const facilities = [
  {
    icon: BookOpen,
    title: "DUSOM Library",
    description: "A well-stocked library with biblical resources, reference materials, and study spaces for students to enhance their learning experience."
  },
  {
    icon: Monitor,
    title: "DUSOM Media/IT Support",
    description: "Modern multimedia facilities and IT support to aid in presentations, research, and accessing digital learning resources."
  }
];
const features = [
  { icon: Flame, title: "Spiritual Impartation", description: "Direct teaching from Dr. Paul & Dr. Becky Enenche" },
  { icon: Target, title: "Practical Training", description: "Real-world ministry experience" },
  { icon: Users, title: "Global Community", description: "Fellowship with students from 50+ countries" },
  { icon: Heart, title: "Personal Growth", description: "Character and leadership development" },
  { icon: GraduationCap, title: "Clear Purpose", description: "Equipped for any ministerial role" },
  { icon: Globe, title: "Alumni Network", description: "Join 10,000+ graduates worldwide" },
];

const StudentLife = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const { scrollYProgress: featuresProgress } = useScroll({
    target: featuresRef,
    offset: ["start end", "end start"],
  });

  const heroBackgroundY = useTransform(heroProgress, [0, 1], ["0%", "30%"]);
  const heroContentOpacity = useTransform(heroProgress, [0, 0.5], [1, 0]);
  const featuresY = useTransform(featuresProgress, [0, 0.5, 1], [40, 0, -20]);

  return (
    <Layout>
      <section ref={heroRef} className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${headerStudentLifeBg})`,
            y: heroBackgroundY,
            scale: 1.1,
          }}
        />
        {/* Gradient Overlay for blending */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary-dark/80 to-primary/75" />
        
        <motion.div 
          className="relative z-10 container-content px-4 text-center py-32"
          style={{ opacity: heroContentOpacity }}
        >
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-primary-foreground">Life at DUSOM</h1>
            <p className="text-xl text-primary-foreground/80">More than just classes — it's a transformation journey</p>
          </motion.div>
        </motion.div>
      </section>

      <section ref={featuresRef} className="relative section-padding bg-background overflow-hidden">
        <motion.div className="container-content" style={{ y: featuresY }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-foreground mb-4">What Makes DUSOM Unique</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-secondary/50 rounded-xl p-6 hover:shadow-md transition-all group">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-all">
                  <feature.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h4 className="text-foreground mb-2">{feature.title}</h4>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Facilities */}
      <section className="section-padding bg-secondary/30 relative overflow-hidden">
        <div className="container-content relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-foreground mb-4">Our Facilities</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Resources to support your learning and spiritual growth
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {facilities.map((facility, index) => (
              <motion.div
                key={facility.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-background rounded-2xl p-8 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <facility.icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-foreground mb-4">{facility.title}</h3>
                <p className="text-muted-foreground">{facility.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PhotoGallery />

      <section className="section-padding bg-gradient-primary text-center">
        <div className="container-content">
          <h2 className="text-primary-foreground mb-6">Experience DUSOM Life</h2>
          <Button size="lg" className="bg-accent-gold hover:bg-accent-orange text-white" asChild>
            <Link to="/apply">Apply Now <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default StudentLife;
