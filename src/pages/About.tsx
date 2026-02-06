import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { PageSEO } from "@/components/PageSEO";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, Users, Target, Heart, Globe, Flame,
  ArrowRight
} from "lucide-react";
import headerAboutBg from "@/assets/header-about.jpg";
import { pageSEO, generateOrganizationSchema, generateBreadcrumbSchema } from "@/lib/seo";
const values = [
  { icon: Flame, title: "Spiritual Impartation", description: "Direct spiritual transfer from seasoned ministers with decades of experience" },
  { icon: Target, title: "Practical Training", description: "Real-world ministry experience integrated throughout your learning journey" },
  { icon: Heart, title: "Character Development", description: "Holistic training that builds biblical foundations and godly character" },
  { icon: GraduationCap, title: "Academic Excellence", description: "Rigorous curriculum designed for comprehensive ministerial preparation" },
  { icon: Users, title: "Community", description: "Fellowship with students from 50+ nations sharing one purpose" },
  { icon: Globe, title: "Global Network", description: "Join 10,000+ alumni making impact across the world" },
];

const studyFocus = [
  "Raising Firemen like missiles to compel the obedience of their generation",
  "Providing skilled labor for the end-time harvest",
  "Training men to gather their destinies and effectively fulfill God's purpose",
  "Providing help for God's servants to run their God-given assignment with excellence and integrity"
];

const administrativeStructure = [
  {
    title: "Director of DUNAMIS School of Ministry",
    description: "The spiritual and administrative head of DUSOM Worldwide. Gives directives and instructions on spiritual, academic, administrative, and financial policies."
  },
  {
    title: "Director of Administration",
    description: "Approves and signs the quarterly budget. The Coordinating Pastor reports directly to the Administrator."
  },
  {
    title: "Coordinating Pastor",
    description: "Coordinates all activities of the school, lecturers, students' compliance, paid and voluntary staff. Ensures the vision and mission are followed."
  },
  {
    title: "Assistant Coordinating Pastor",
    description: "Assists the Coordinating Pastor in all duties and steps in during their absence."
  },
  {
    title: "Secretary",
    description: "Administrative support for the smooth running of school operations."
  }
];

const timeline = [
  { year: "2000", title: "Foundation", description: "DUSOM was established under the vision of Dr. Paul Enenche" },
  { year: "2010", title: "Growth", description: "Expanded to serve students from over 20 countries" },
  { year: "2020", title: "Milestone", description: "Celebrated 20 years with 8,000+ trained ministers" },
  { year: "2026", title: "Present", description: "Continuing the legacy with modern facilities and curriculum" },
];

const About = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.5], [1, 0]);

  const valuesRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: valuesProgress } = useScroll({
    target: valuesRef,
    offset: ["start end", "end start"],
  });
  const valuesY = useTransform(valuesProgress, [0, 1], ["5%", "-5%"]);

  const leadershipRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: leadershipProgress } = useScroll({
    target: leadershipRef,
    offset: ["start end", "end start"],
  });
  const leadershipY = useTransform(leadershipProgress, [0, 1], ["10%", "-10%"]);

  const seo = pageSEO.about;
  const schemas = [
    generateOrganizationSchema(),
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "About", url: "/about" }
    ])
  ];

  return (
    <Layout>
      <PageSEO {...seo} schemas={schemas} />
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${headerAboutBg})`,
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
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/30 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent/30 rounded-full blur-3xl" />
        </motion.div>

        {/* Floating decorative elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 rounded-full bg-accent-gold/20 blur-xl"
          animate={{ y: [0, 20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-accent-green/20 blur-xl"
          animate={{ y: [0, -30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
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
              Home / About
            </span>
            <h1 className="text-primary-foreground">
              About Dunamis School of Ministry
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Equipping servants to saturate the world with Gospel fire since 2000
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-background relative overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="container-content relative z-10">
          {/* History/Preamble */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-secondary/50 rounded-2xl p-8 mb-8"
          >
            <h3 className="text-primary mb-4">Brief History</h3>
            <p className="text-muted-foreground leading-relaxed">
              DUNAMIS School of Ministry (DUSOM) was established in January 2000 through God's Servant, 
              the Senior Pastor, Dr. Pastor Paul Enenche. The school exists to teach the word of God 
              through which the impartation of the unction that is at work on DUNAMIS is transmitted 
              through the various topics being taught in the school. The program is designed to prepare 
              students from all Bible-believing churches across the globe to function effectively in any 
              ministerial role such as Church workers, home Church leaders, evangelists, Altar Ministers, 
              and pastoral calling.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Our Vision",
                content: "DUNAMIS School of Ministry, where servants are trained engulfed with fire to saturate the world. Raising fire men for fire Gospel spread with tongues of fire, inflaming the world like a volcano, we are firebrands. With the voice of thunder, we advance. With wings on our feet, like burning fiery missiles authorized to turn the world to God. Hebrews 1:7; Psalm 104:4.",
                color: "primary"
              },
              {
                title: "Our Mission",
                content: "Spread the Gospel through all the earth as the waters cover the sea. Spreading His Glory through all the earth as the waters cover the sea. Habakkuk 2:14.",
                color: "accent-gold"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-secondary/50 rounded-2xl p-8 border-l-4 border-primary hover:shadow-lg transition-shadow"
              >
                <h3 className="text-primary mb-4">{item.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  "{item.content}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Study Focus */}
      <section className="section-padding bg-secondary/30 relative overflow-hidden">
        <motion.div
          className="absolute -bottom-20 -left-20 w-60 h-60 bg-accent-gold/10 rounded-full blur-3xl"
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
            <h2 className="text-foreground mb-4">Study Focus</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The core objectives that drive our training and formation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {studyFocus.map((focus, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4 items-start p-6 bg-background rounded-xl shadow-sm"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center">
                  <Flame className="h-5 w-5 text-accent-gold" />
                </div>
                <p className="text-foreground leading-relaxed">{focus}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-background relative overflow-hidden">
        <motion.div
          className="absolute -bottom-20 -left-20 w-60 h-60 bg-accent-gold/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="container-content relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-foreground mb-4">Our Journey</h2>
            <p className="text-muted-foreground text-lg">26 years of equipping ministers for global impact</p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary via-accent-gold to-accent-green hidden md:block" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-background rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow inline-block">
                      <span className="text-primary font-heading font-bold text-2xl">{item.year}</span>
                      <h4 className="text-foreground mt-2">{item.title}</h4>
                      <p className="text-muted-foreground text-sm mt-1">{item.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex w-4 h-4 rounded-full bg-primary ring-4 ring-background z-10" />
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section ref={valuesRef} className="section-padding bg-background relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-30"
          style={{ y: valuesY }}
        >
          <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-primary/10 rounded-full blur-2xl" />
          <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-accent-green/10 rounded-full blur-2xl" />
        </motion.div>

        <div className="container-content relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-foreground mb-4">Our Core Values</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The pillars that guide everything we do at DUSOM
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-secondary/50 rounded-xl p-6 hover:bg-primary/5 hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <value.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h4 className="text-foreground mb-2 group-hover:text-primary transition-colors">
                  {value.title}
                </h4>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Administrative Structure */}
      <section className="section-padding bg-secondary/30 relative overflow-hidden">
        <motion.div
          className="absolute -top-20 -right-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="container-content relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-foreground mb-4">Administrative Structure</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The organizational hierarchy that ensures effective management of DUSOM
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {administrativeStructure.map((role, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-background rounded-xl p-6 shadow-sm border-l-4 border-primary"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                    {index + 1}
                  </span>
                  <h4 className="text-foreground">{role.title}</h4>
                </div>
                <p className="text-muted-foreground pl-11">{role.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 p-6 bg-primary/5 rounded-2xl max-w-4xl mx-auto"
          >
            <p className="text-muted-foreground text-sm">
              <strong>Note:</strong> All lecturers are drawn from the pastorate of DUNAMIS International 
              Gospel Centre, having served as pastors for not less than five years. They are seasoned 
              ministers in full agreement with the Statement of Faith and doctrinal beliefs of the Commission.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Leadership */}
      <section ref={leadershipRef} className="section-padding bg-gradient-primary text-primary-foreground relative overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          style={{ y: leadershipY }}
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-60 h-60 bg-accent-gold rounded-full blur-3xl" />
          </div>
        </motion.div>

        <div className="container-content relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-primary-foreground mb-4">Our Leadership</h2>
            <p className="text-primary-foreground/70 text-lg">Visionary leaders guiding DUSOM's mission</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: "Dr. Paul Enenche",
                role: "Founder & Senior Pastor",
                bio: "Dr. Paul Enenche is the Founder and Senior Pastor of Dunamis International Gospel Centre. A medical doctor by training, he received the call to full-time ministry and has since raised thousands of ministers worldwide."
              },
              {
                name: "Dr. Becky Paul-Enenche",
                role: "Co-Pastor & Women Ministry Director",
                bio: "Dr. Becky Paul-Enenche is the Co-Pastor of Dunamis International Gospel Centre and heads the women's ministry. She is passionate about raising women leaders and ministers for the Kingdom."
              }
            ].map((leader, index) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="glass-dark rounded-2xl p-8"
              >
                <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-4xl font-heading font-bold mb-6 mx-auto">
                  {leader.name.charAt(0)}
                </div>
                <div className="text-center">
                  <h3 className="text-primary-foreground text-2xl mb-1">{leader.name}</h3>
                  <p className="text-accent-gold text-sm font-medium mb-4">{leader.role}</p>
                  <p className="text-primary-foreground/70 text-sm leading-relaxed">{leader.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-secondary/30 relative overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-80 h-80 bg-accent-gold/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="container-content text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto space-y-6"
          >
            <h2 className="text-foreground">Join Our Community</h2>
            <p className="text-muted-foreground text-lg">
              Be part of the next generation of world-changers being raised at DUSOM
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="bg-accent-gold hover:bg-accent-orange text-white" asChild>
                <Link to="/apply">
                  Apply Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">Request Information</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
