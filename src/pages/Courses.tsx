import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, Award, Lightbulb, Heart, Globe } from "lucide-react";
import headerCoursesBg from "@/assets/header-courses.jpg";
const firstSemesterCourses = [
  { id: 1, title: "Use of English", description: "Develop effective communication skills for ministry and professional contexts." },
  { id: 2, title: "Financial Overflow", description: "Biblical principles for financial prosperity and management in ministry." },
  { id: 3, title: "Understanding the Bible", description: "Deep dive into biblical interpretation, hermeneutics, and proper study methods." },
  { id: 4, title: "Purpose, Vision & Divine Direction", description: "Discover God's specific plan for your life and walk in your divine assignment." },
  { id: 5, title: "Faith Principles", description: "Master the principles of faith that activate God's power and provision." },
  { id: 6, title: "Ministry, Minister & Message", description: "Understanding the calling, character, and communication of a minister." },
  { id: 7, title: "Servanthood, Fatherhood and Mentoring", description: "Learn the dynamics of serving, fathering, and mentoring others in ministry." },
  { id: 8, title: "Leadership and People's Management", description: "Kingdom principles of leadership that transform ministries and communities." },
  { id: 9, title: "Anointing Secrets & Essentials", description: "Discover the secrets of operating in the anointing for effective ministry." },
  { id: 10, title: "Gift, Calling & Ministry", description: "Understand your spiritual gifts and calling for effective service." },
  { id: 11, title: "Church Growth & Administration", description: "Learn principles for growing and administrating a thriving church." },
];

const secondSemesterCourses = [
  { id: 12, title: "Family Wisdom", description: "Biblical principles for building and maintaining godly family relationships." },
  { id: 13, title: "Thou Art My Battle Axe", description: "Understanding your role as God's instrument for kingdom advancement." },
  { id: 14, title: "Go In This Thy Might", description: "Operating in the power and authority given to every believer." },
  { id: 15, title: "Secrets of Jesus' Ministry and the Acts of the Apostles", description: "Learning from the ministry patterns of Jesus and the early church." },
  { id: 16, title: "Dynamics of Praise & Worship", description: "The theology and practice of worship that honors God." },
  { id: 17, title: "Evangelism & Discipleship", description: "Master the art of soul winning and making disciples." },
  { id: 18, title: "Principles & Powers of Prayer", description: "Develop a powerful prayer life and effective intercession." },
  { id: 19, title: "Character and Principles of Integrity", description: "Build the character foundation essential for lasting ministry impact." },
  { id: 20, title: "Making Full Proof of Ministry", description: "Maximizing your effectiveness and fulfilling your ministry calling." },
  { id: 21, title: "Excellence In Life and Ministry", description: "Pursuing and maintaining excellence in all areas of life and service." },
  { id: 22, title: "Holy Ghost & The End-Time Move of God", description: "Understanding the Holy Spirit's role in the last days." },
];

const features = [
  { icon: BookOpen, title: "Academic Excellence", description: "Rigorous curriculum designed by experienced theologians and practitioners" },
  { icon: Heart, title: "Spiritual Impartation", description: "Direct ministry transfer from anointed servants of God" },
  { icon: Users, title: "Expert Instructors", description: "Learn from seasoned pastors with 20+ years of ministry experience" },
  { icon: Lightbulb, title: "Practical Application", description: "Hands-on learning integrated throughout every course" },
  { icon: Award, title: "Character Development", description: "Holistic training that builds godly character" },
  { icon: Globe, title: "Global Perspective", description: "Prepare for ministry impact anywhere in the world" },
];

const gradientVariants = [
  "course-card-blue",
  "course-card-gold",
  "course-card-green",
  "course-card-mixed",
];

const Courses = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.5], [1, 0]);

  const firstSemRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: firstSemProgress } = useScroll({
    target: firstSemRef,
    offset: ["start end", "end start"],
  });
  const firstSemY = useTransform(firstSemProgress, [0, 1], ["3%", "-3%"]);

  const featuresRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: featuresProgress } = useScroll({
    target: featuresRef,
    offset: ["start end", "end start"],
  });
  const featuresY = useTransform(featuresProgress, [0, 1], ["5%", "-5%"]);

  return (
    <Layout>
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${headerCoursesBg})`,
            y: heroY,
            scale: 1.1,
          }}
        />
        {/* Gradient Overlay for blending */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary-dark/80 to-primary/75" />
        
        {/* Decorative Elements */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          style={{ y: heroY }}
        >
          <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-white/30 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-accent-gold/30 rounded-full blur-3xl" />
        </motion.div>

        {/* Floating elements */}
        <motion.div
          className="absolute top-16 right-20 w-16 h-16 rounded-full bg-accent-gold/20 blur-xl"
          animate={{ y: [0, 15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-16 left-20 w-24 h-24 rounded-full bg-accent-green/20 blur-xl"
          animate={{ y: [0, -20, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div 
          className="relative z-10 container-content px-4 text-center py-32"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <span className="text-primary-foreground/70 text-sm uppercase tracking-wider">
              Home / Courses
            </span>
            <h1 className="text-primary-foreground">Our Curriculum</h1>
            <p className="text-xl text-primary-foreground/80">
              22 transformative courses across two semesters designed to equip you for ministry
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <span className="px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm">
                Expert Instructors
              </span>
              <span className="px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm">
                Hands-on Learning
              </span>
              <span className="px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm">
                Spiritual Impartation
              </span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Course Philosophy */}
      <section className="section-padding bg-background relative overflow-hidden">
        <motion.div
          className="absolute -top-20 -right-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="container-content text-center max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-foreground mb-6">Our Approach to Training</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              All courses are designed to integrate academic rigor with spiritual impartation. 
              We believe in transformational education that not only informs the mind but 
              transforms the heart and equips the hands for effective ministry.
            </p>
            <div className="p-6 bg-primary/5 rounded-2xl border-l-4 border-primary">
              <p className="text-foreground italic text-lg">
                "Knowledge puffs up, but love builds up. We teach not just for information 
                but for transformation." — Dr. Paul Enenche
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* First Semester */}
      <section 
        ref={firstSemRef}
        className="section-padding relative overflow-hidden" 
        style={{ background: "linear-gradient(135deg, hsl(40 30% 97%) 0%, hsl(42 40% 95%) 100%)" }}
      >
        <motion.div 
          className="absolute inset-0 opacity-50"
          style={{ y: firstSemY }}
        >
          <div className="absolute top-20 left-20 w-32 h-32 bg-accent-gold/10 rounded-full blur-2xl" />
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-primary/10 rounded-full blur-2xl" />
        </motion.div>

        <div className="container-content relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-foreground mb-4">First Semester Courses</h2>
            <p className="text-muted-foreground text-lg">Foundation & Spiritual Growth</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {firstSemesterCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`${gradientVariants[index % 4]} rounded-2xl p-6 text-primary-foreground relative overflow-hidden group card-hover`}
              >
                <span className="absolute top-4 right-4 text-5xl font-heading font-bold opacity-10">
                  {String(course.id).padStart(2, "0")}
                </span>
                <div className="relative z-10">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary-foreground/20 text-xs font-medium uppercase tracking-wide mb-3">
                    Semester 1
                  </span>
                  <h4 className="text-xl font-semibold mb-2">{course.title}</h4>
                  <p className="text-primary-foreground/80 text-sm line-clamp-2">{course.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Second Semester */}
      <section className="section-padding bg-background relative overflow-hidden">
        <motion.div
          className="absolute -bottom-20 -left-20 w-60 h-60 bg-accent-green/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="container-content relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-foreground mb-4">Second Semester Courses</h2>
            <p className="text-muted-foreground text-lg">Advanced Ministry & Specialization</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {secondSemesterCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`${gradientVariants[(index + 2) % 4]} rounded-2xl p-6 text-primary-foreground relative overflow-hidden group card-hover`}
              >
                <span className="absolute top-4 right-4 text-5xl font-heading font-bold opacity-10">
                  {String(course.id).padStart(2, "0")}
                </span>
                <div className="relative z-10">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary-foreground/20 text-xs font-medium uppercase tracking-wide mb-3">
                    Semester 2
                  </span>
                  <h4 className="text-xl font-semibold mb-2">{course.title}</h4>
                  <p className="text-primary-foreground/80 text-sm line-clamp-2">{course.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Features */}
      <section ref={featuresRef} className="section-padding bg-secondary/30 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-40"
          style={{ y: featuresY }}
        >
          <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-primary/10 rounded-full blur-2xl" />
          <div className="absolute bottom-1/4 left-1/3 w-60 h-60 bg-accent-gold/10 rounded-full blur-2xl" />
        </motion.div>

        <div className="container-content relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-foreground mb-4">What Every Course Includes</h2>
            <p className="text-muted-foreground text-lg">Comprehensive training for complete ministers</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h4 className="text-foreground mb-2">{feature.title}</h4>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-primary text-primary-foreground text-center relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        >
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-accent-gold rounded-full blur-3xl" />
        </motion.div>

        <div className="container-content relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto space-y-6"
          >
            <h2 className="text-primary-foreground">Ready to Transform Your Ministry?</h2>
            <p className="text-primary-foreground/80 text-lg">
              Take the first step towards becoming an equipped firebrand
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                size="lg" 
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                asChild
              >
                <Link to="/admissions">
                  View Admissions <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Download Syllabus
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Courses;
