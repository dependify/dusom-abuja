import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { PageSEO } from "@/components/PageSEO";
import { 
  BookOpen, 
  DollarSign, 
  Music, 
  FileText, 
  Users, 
  Globe,
  GraduationCap,
  CheckCircle,
  AlertCircle,
  Clock,
  Award
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import headerAboutBg from "@/assets/header-about.jpg";
import { pageSEO, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo";

const codeOfConduct = [
  "Students must commit to the duration of the school calendar. Admission will be revoked if a student abandons school activities.",
  "Resumption time is 8:00 AM (Monday to Friday) for full-time students and 4:00 PM for part-time students.",
  "Consistent late coming attracts suspension, requiring students to repeat missed courses.",
  "No loitering during class hours except during break time without explicit permission.",
  "Students who miss any course without explainable reason must repeat the course to graduate.",
  "No student shall be addressed with titles (Bishop, Pastor, or Evangelist) during training.",
  "Quarreling, fighting, or open confrontation attracts strict disciplinary measures including dismissal.",
  "All students' appearance should be neat, washed, and clean always.",
  "Dress code for brothers: smart shirt, tie, and neatly ironed trousers with or without suit.",
  "Dress code for sisters: smart shirt or gown under the knee (must cover the knee), not tight, not short, and no sleeveless.",
  "Applications for absence must be submitted three days before leave commencement for grave reasons only.",
  "Every student must attend the monthly Vigil every second Friday of the month.",
  "Weekly personal reports must be submitted every Monday (full-time) or Thursday (part-time).",
  "Answering/making phone calls during class is a gross offense - phone may be forfeited for the day.",
  "Cheating, duping, or examination malpractice attracts outright dismissal."
];

const financialPolicies = [
  "All students shall pay a specified amount as School Fees for the session.",
  "Students shall pay for study-aided materials and student ID Card.",
  "Students shall pay a specified graduation fee (to be announced).",
  "Students shall pay other contributions agreed upon among the student body.",
  "All payments shall be made to the school Bank account provided by management.",
  "All admitted and fully registered students are eligible for a student Identity Card.",
  "Student I.D. cards must not be used for visitation on behalf of DUNAMIS or DUSOM.",
  "Identity Cards must not be used to solicit funds or organize personal night vigils.",
  "All Identity Cards remain the property of DUNAMIS School of Ministry.",
  "I.D. cards must be submitted to school authority on the day of final examination.",
  "Lost I.D. cards shall be re-issued only after submission of Police report and court affidavit (also applicable to Certificates).",
  "Certificates shall not be given to anyone on behalf of a student."
];

const anthemVerses = [
  "DUNAMIS School of Ministry",
  "Where servants are trained",
  "Engulfed with the fire",
  "To saturate the world",
  "Raising firemen",
  "For fire gospel spread",
  "With tongues of fire",
  "Inflaming the world",
  "Like a volcano, we are firebrands",
  "With the voice of thunder, we advance",
  "With wings on our feet",
  "Like burning fiery missiles",
  "Authorized to turn the world to God"
];

const anthemChorus = [
  "La-la-la-la-la-la-la-la",
  "Spreading the gospel through all the Earth",
  "As the waters cover the sea",
  "Spreading His glory through all the Earth",
  "As the waters cover the sea"
];

const weeklyRequirements = [
  { task: "Daily 40 chapters of the Bible", hours: "21 hours/week" },
  { task: "Personal prayer in tongues (1.5 hours/day)", hours: "10.5 hours/week" },
  { task: "Listening to Senior Pastor's messages", hours: "7 hours/week" },
  { task: "Personal devotion (1.5 hours/day)", hours: "10.5 hours/week" },
  { task: "Midnight prayers (12-3 AM, 2 hours/day)", hours: "14 hours/week" },
  { task: "Personal Evangelism (win 1 soul/week)", hours: "Variable" },
  { task: "Reading/Summarizing Books by Senior Pastor", hours: "Variable" }
];

const studentExecutives = [
  "Class Prophet/Prophetess",
  "General Secretary & Assistant",
  "Financial Secretary & Assistant",
  "Treasurer",
  "Disciplinarian & Assistant",
  "Prayer Coordinator & Assistant",
  "Music Director & Assistant",
  "Praise Leader & Assistant",
  "Head Protocol & Assistant",
  "Head Usher & Assistant",
  "Sanctuary I & II",
  "Technical I & II"
];

const foreignStudentInfo = [
  "Students from all nations are eligible for admission provided they meet requirements.",
  "Foreign students must have permission to reside in Nigeria and a study permit where necessary.",
  "Foreign students shall make arrangements for their accommodation and living expenses.",
  "Early application is recommended to allow time for travel arrangements."
];

const codeOfConductFAQs = [
  {
    question: "What is the dress code at DUSOM?",
    answer: "For brothers: smart shirt, tie, and neatly ironed trousers with or without suit. For sisters: smart shirt or gown under the knee (must cover the knee), not tight, not short, and no sleeveless."
  },
  {
    question: "What happens if I'm consistently late to DUSOM classes?",
    answer: "Consistent late coming attracts suspension from school. Any student under discipline shall be compelled to repeat the courses missed during the suspension period."
  },
  {
    question: "Can I use my phone during DUSOM classes?",
    answer: "Answering or making phone calls during class sessions is considered a gross offense. Offenders shall be severely disciplined and may forfeit the usage of the phone for the rest of the day."
  }
];

const StudentAffairs = () => {
  const seo = pageSEO.studentAffairs;
  const schemas = [
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Student Affairs", url: "/student-affairs" }
    ]),
    generateFAQSchema(codeOfConductFAQs)
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
              Home / Student Affairs
            </span>
            <h1 className="text-primary-foreground">Student Affairs</h1>
            <p className="text-xl text-primary-foreground/80">
              Guidelines, policies, and resources for DUSOM students
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Foreign Students */}
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
              <Globe className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-foreground mb-4">Information for Foreign Students</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              DUSOM welcomes students from all nations of the world
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {foreignStudentInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-3 items-start p-4 bg-secondary/30 rounded-xl"
              >
                <CheckCircle className="h-5 w-5 text-accent-green flex-shrink-0 mt-0.5" />
                <span className="text-foreground">{info}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Code of Conduct */}
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
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-foreground mb-4">Code of Conduct</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Standards of behavior expected from all DUSOM students
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {codeOfConduct.map((rule, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex gap-3 items-start p-4 bg-background rounded-xl shadow-sm"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                  {index + 1}
                </span>
                <span className="text-foreground text-sm">{rule}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Policies */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="container-content relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-foreground mb-4">Financial Policies</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Payment procedures and ID card policies
            </p>
          </motion.div>

          <Accordion type="single" collapsible className="max-w-3xl mx-auto space-y-4">
            <AccordionItem value="fees" className="border rounded-xl px-6 bg-secondary/30">
              <AccordionTrigger className="hover:no-underline py-5">
                <span className="font-heading font-semibold text-lg text-left">Fees and Payments</span>
              </AccordionTrigger>
              <AccordionContent className="pb-5">
                <ul className="space-y-3">
                  {financialPolicies.slice(0, 4).map((item, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <CheckCircle className="h-5 w-5 text-accent-green mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="id-cards" className="border rounded-xl px-6 bg-secondary/30">
              <AccordionTrigger className="hover:no-underline py-5">
                <span className="font-heading font-semibold text-lg text-left">Student ID Cards & Certificates</span>
              </AccordionTrigger>
              <AccordionContent className="pb-5">
                <ul className="space-y-3">
                  {financialPolicies.slice(4).map((item, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <AlertCircle className="h-5 w-5 text-accent-gold mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* DUSOM Anthem */}
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
              <Music className="h-8 w-8 text-primary-foreground" />
            </div>
            <h2 className="text-primary-foreground mb-4">DUSOM Anthem</h2>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 border border-primary-foreground/20"
            >
              <div className="space-y-1 text-center mb-6">
                {anthemVerses.map((line, index) => (
                  <p key={index} className="text-primary-foreground/90 text-lg leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
              
              <div className="border-t border-primary-foreground/20 pt-6 mt-6">
                <p className="text-accent-gold text-center font-semibold mb-3">Chorus</p>
                <div className="space-y-1 text-center">
                  {anthemChorus.map((line, index) => (
                    <p key={index} className="text-primary-foreground italic">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Weekly Evaluation */}
      <section className="section-padding bg-background relative overflow-hidden">
        <motion.div
          className="absolute -top-20 -right-20 w-60 h-60 bg-accent-green/10 rounded-full blur-3xl"
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
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-foreground mb-4">Weekly Evaluation Requirements</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Non-lecture training procedures and out-of-class activities
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-secondary/30 rounded-2xl p-6 mb-8"
            >
              <p className="text-foreground leading-relaxed">
                Because of the vision to raise men and women of impact and passion for God, 
                students are expected to maintain the following weekly schedule. Total out-of-class 
                work: <span className="font-bold text-primary">63+ hours per week</span>.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-4">
              {weeklyRequirements.map((req, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex justify-between items-center p-4 bg-background rounded-xl border border-border"
                >
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    <span className="text-foreground">{req.task}</span>
                  </div>
                  <span className="text-sm text-accent-gold font-medium">{req.hours}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Student Executives */}
      <section className="section-padding bg-secondary/30 relative overflow-hidden">
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
            <h2 className="text-foreground mb-4">Student Executives</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Student leadership positions elected under the supervision of the coordinating pastor
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {studentExecutives.map((position, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3 p-4 bg-background rounded-xl"
              >
                <Award className="h-5 w-5 text-accent-gold flex-shrink-0" />
                <span className="text-foreground text-sm">{position}</span>
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
              <strong>Note:</strong> These positions are held only by current students and shall be 
              vacated upon completion of studies. The student leadership assists school management 
              to maintain and sustain the standard of the school among fellow students.
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default StudentAffairs;
