import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { PageSEO } from "@/components/PageSEO";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Award, 
  Calendar, 
  BookOpen, 
  Heart, 
  Globe,
  ArrowRight,
  CheckCircle,
  GraduationCap,
  Trophy
} from "lucide-react";
import headerAboutBg from "@/assets/header-about.jpg";
import { pageSEO, generateBreadcrumbSchema, generateOrganizationSchema } from "@/lib/seo";

const alumniBenefits = [
  {
    icon: Users,
    title: "Official Alumni Platform",
    description: "Access to exclusive alumni network and communication channels"
  },
  {
    icon: Calendar,
    title: "Yearly Meetings",
    description: "Periodic gatherings as directed by the Coordinating Pastor"
  },
  {
    icon: BookOpen,
    title: "Alumni Refresher Conference (D-ARC)",
    description: "Periodic re-fire conferences for all past students worldwide"
  },
  {
    icon: Heart,
    title: "Legacy Project Participation",
    description: "Contribute to yearly Alumni Legacy Projects approved by leadership"
  },
  {
    icon: Globe,
    title: "Global Network",
    description: "Connect with 10,000+ graduates making impact worldwide"
  },
  {
    icon: GraduationCap,
    title: "Continued Learning",
    description: "Access to refresher courses and continuing education opportunities"
  }
];

const alumniRequirements = [
  "Completion of all academic requirements for either first or second academic session",
  "Membership in the Official Alumni Platform",
  "Attendance at periodic (yearly) meetings as directed",
  "Yearly financial responsibility to the school",
  "Participation in Alumni Legacy Projects",
  "Maintenance of spiritual and moral standards/policies of the School"
];

const recognitionAwards = [
  {
    category: "Curricular Activities",
    awards: ["Academic Excellence", "Moral Excellence", "Excellence in Service and Commitment"]
  },
  {
    category: "Special Award",
    awards: ["Best Behaved Graduating Student (sponsored by Alumni Body)"]
  }
];

const dArcInfo = {
  title: "D-ARC: DUSOM Alumni Refresher Conference",
  description: "A periodic conference designed to re-fire all past students of the School, both within and outside DUNAMIS. This conference provides:",
  benefits: [
    "Spiritual refreshing and re-igniting of the fire",
    "Networking opportunities with fellow alumni",
    "Access to new teachings and impartations",
    "Updates on DUSOM developments and achievements",
    "Opportunities to give back and support current students"
  ]
};

const Alumni = () => {
  const seo = pageSEO.alumni;
  const schemas = [
    generateOrganizationSchema(),
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Alumni", url: "/alumni" }
    ])
  ];

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.5], [1, 0]);

  return (
    <Layout>
      <PageSEO {...seo} schemas={schemas} />
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${headerAboutBg})`,
            y: heroY,
            scale: 1.1,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary-dark/80 to-primary/75" />
        
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
              Home / Alumni
            </span>
            <h1 className="text-primary-foreground">DUSOM Alumni</h1>
            <p className="text-xl text-primary-foreground/80">
              Once a firebrand, always a firebrand. Join 10,000+ graduates changing the world
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Membership Info */}
      <section className="section-padding bg-background relative overflow-hidden">
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
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-foreground mb-4">Alumni Membership</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              All candidates who complete academic requirements qualify for membership
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-secondary/30 rounded-2xl p-8"
            >
              <h3 className="text-foreground mb-6 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-accent-green" />
                Membership Requirements
              </h3>
              <ul className="space-y-4">
                {alumniRequirements.map((req, index) => (
                  <li key={index} className="flex gap-3 items-start">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-green/10 flex items-center justify-center text-xs font-bold text-accent-green">
                      {index + 1}
                    </span>
                    <span className="text-muted-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-primary text-primary-foreground rounded-2xl p-8"
            >
              <h3 className="text-primary-foreground mb-6">Leadership Structure</h3>
              <p className="text-primary-foreground/80 mb-6">
                The Alumni Body is coordinated by Alumni Executives under the Coordinating Pastor, 
                holding a term of office for two years, renewable once.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-accent-gold" />
                  <span className="text-primary-foreground/90">Term: 2 years (renewable once)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-accent-gold" />
                  <span className="text-primary-foreground/90">Supervised by Coordinating Pastor</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
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
            <h2 className="text-foreground mb-4">Alumni Benefits</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Stay connected, stay inspired, continue making impact
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {alumniBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-background rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <benefit.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h4 className="text-foreground mb-2">{benefit.title}</h4>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* D-ARC Section */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="container-content relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-primary/5 to-accent-gold/5 rounded-2xl p-8 md:p-12 border border-primary/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-foreground">{dArcInfo.title}</h2>
              </div>
              
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {dArcInfo.description}
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {dArcInfo.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-background rounded-xl"
                  >
                    <ArrowRight className="h-4 w-4 text-accent-gold flex-shrink-0" />
                    <span className="text-foreground text-sm">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Recognition & Awards */}
      <section className="section-padding bg-gradient-primary text-primary-foreground relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-20"
        >
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-accent-gold rounded-full blur-3xl" />
        </motion.div>
        
        <div className="container-content relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-8 w-8 text-accent-gold" />
            </div>
            <h2 className="text-primary-foreground mb-4">Recognition & Awards</h2>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              DUSOM values and gives room for excellence, cultivating this trait in students
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {recognitionAwards.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 border border-primary-foreground/20"
              >
                <h3 className="text-primary-foreground mb-6 flex items-center gap-2">
                  <Award className="h-5 w-5 text-accent-gold" />
                  {section.category}
                </h3>
                <ul className="space-y-3">
                  {section.awards.map((award, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-accent-gold" />
                      <span className="text-primary-foreground/90">{award}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-secondary/30">
        <div className="container-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto space-y-6"
          >
            <h2 className="text-foreground">Join the Alumni Network</h2>
            <p className="text-muted-foreground text-lg">
              Stay connected with fellow firebrands and continue your journey of impact
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent-gold hover:bg-accent-orange text-white" asChild>
                <Link to="/contact">
                  Contact Alumni Office <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/apply">Apply to DUSOM</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Alumni;
