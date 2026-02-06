import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { PageSEO } from "@/components/PageSEO";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Check, ArrowRight, Calendar, Clock, FileText, 
  Users, Award, AlertTriangle, Mail, Phone, MessageCircle
} from "lucide-react";
import headerAdmissionsBg from "@/assets/header-admissions.jpg";
import { pageSEO, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo";
const requirements = [
  {
    title: "General Requirements",
    items: [
      "Must be able to read and write fluently",
      "Must be a practicing Christian, born again",
      "Must be medically and mentally sound",
      "Must attend induction exercise",
      "Must pass admission interview"
    ]
  },
  {
    title: "Academic Requirements",
    items: [
      "For DUNAMIS Members: Evidence of Foundation & Maturity Courses completion",
      "For Non-Members: Recognized worker status in a church",
      "Letter of recommendation from your pastor",
      "Purchase and complete application form"
    ]
  },
  {
    title: "What We're Looking For",
    items: [
      "Genuine passion for ministry and souls",
      "Commitment to spiritual growth",
      "Demonstrated Christian character",
      "Willingness to serve and be mentored",
      "Evidence of spiritual maturity"
    ]
  },
  {
    title: "Additional Information",
    items: [
      "Minimum age requirement: 18 years",
      "English fluency required",
      "Good physical health",
      "Background check may be required"
    ]
  }
];

const applicationSteps = [
  { step: 1, title: "Purchase Form", description: "Get your application form from the DUSOM office or online portal", icon: FileText },
  { step: 2, title: "Gather Documents", description: "Collect all required documents including recommendation letters", icon: FileText },
  { step: 3, title: "Submit Application", description: "Complete and submit your application via the online portal", icon: Users },
  { step: 4, title: "Interview", description: "Attend your scheduled admission interview (30-45 minutes)", icon: Users },
  { step: 5, title: "Confirmation", description: "Receive your acceptance notification within 2-3 weeks", icon: Award },
];

const sessions = [
  {
    title: "Session 1: January - June",
    dates: [
      { label: "Application Opens", value: "October 1" },
      { label: "Application Closes", value: "November 30" },
      { label: "Orientation", value: "January 5" },
      { label: "Classes Begin", value: "January 12" },
      { label: "Semester Ends", value: "June 30" },
    ]
  },
  {
    title: "Session 2: July - December",
    dates: [
      { label: "Application Opens", value: "April 1" },
      { label: "Application Closes", value: "May 31" },
      { label: "Orientation", value: "July 1" },
      { label: "Classes Begin", value: "July 8" },
      { label: "Semester Ends", value: "December 31" },
    ]
  }
];

const scheduleOptions = [
  {
    title: "Full-Time Track",
    days: "Monday - Friday",
    time: "8:00 AM - 4:00 PM",
    duration: "6 Months",
    ideal: "Ideal for those who can commit full-time to intensive training"
  },
  {
    title: "Part-Time Track",
    days: "Thu-Fri + Saturday",
    time: "Thu-Fri: 4-8 PM, Sat: 8 AM-4 PM",
    duration: "6 Months",
    ideal: "Perfect for working professionals and those with other commitments"
  }
];

const faqs = [
  { q: "What is the purpose of DUSOM?", a: "DUSOM trains believers to become firebrands for Christ, equipping them with biblical knowledge, practical skills, and spiritual impartation for effective ministry." },
  { q: "How many sessions are offered per year?", a: "We offer two main sessions: January-June and July-December, each lasting 6 months." },
  { q: "Can I attend part-time while working?", a: "Yes! We offer both full-time and part-time options to accommodate different schedules." },
  { q: "What about international students?", a: "We welcome students from around the world. International students should apply early to allow time for travel arrangements." },
  { q: "Is accommodation provided?", a: "While we don't provide direct accommodation, we maintain a list of recommended housing options near the campus." },
  { q: "Is financial aid available?", a: "We offer payment plans and limited scholarship opportunities for qualifying students. Contact admissions for details." },
  { q: "What happens after graduation?", a: "Alumni have access to continuing education, networking events, and ministry placement assistance through our global alumni network." },
];

const Admissions = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.5], [1, 0]);

  const processRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: processProgress } = useScroll({
    target: processRef,
    offset: ["start end", "end start"],
  });
  const processY = useTransform(processProgress, [0, 1], ["5%", "-5%"]);

  const scheduleRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: scheduleProgress } = useScroll({
    target: scheduleRef,
    offset: ["start end", "end start"],
  });
  const scheduleY = useTransform(scheduleProgress, [0, 1], ["3%", "-3%"]);

  const admissionFAQs = faqs.map(f => ({ question: f.q, answer: f.a }));
  
  const seo = pageSEO.admissions;
  const schemas = [
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Admissions", url: "/admissions" }
    ]),
    generateFAQSchema(admissionFAQs)
  ];

  return (
    <Layout>
      <PageSEO {...seo} schemas={schemas} />
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${headerAdmissionsBg})`,
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
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-white/30 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-accent-gold/30 rounded-full blur-3xl" />
        </motion.div>

        {/* Floating elements */}
        <motion.div
          className="absolute top-20 left-16 w-20 h-20 rounded-full bg-accent-gold/20 blur-xl"
          animate={{ y: [0, 20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-16 w-28 h-28 rounded-full bg-accent-green/20 blur-xl"
          animate={{ y: [0, -25, 0], scale: [1, 1.15, 1] }}
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
              Home / Admissions
            </span>
            <h1 className="text-primary-foreground">Join DUSOM</h1>
            <p className="text-xl text-primary-foreground/80">
              Begin your journey to becoming a firebrand for Christ
            </p>
            <div className="flex flex-wrap justify-center gap-6 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-foreground">High</div>
                <div className="text-sm text-primary-foreground/60">Acceptance Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-foreground">50+</div>
                <div className="text-sm text-primary-foreground/60">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-foreground">95%+</div>
                <div className="text-sm text-primary-foreground/60">Success Rate</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Requirements */}
      <section className="section-padding bg-background relative overflow-hidden" id="requirements">
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
            <h2 className="text-foreground mb-4">Admission Requirements</h2>
            <p className="text-muted-foreground text-lg">What you need to join DUSOM</p>
          </motion.div>

          <Accordion type="single" collapsible className="max-w-3xl mx-auto space-y-4">
            {requirements.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <AccordionItem value={`item-${index}`} className="border rounded-xl px-6 bg-secondary/30">
                  <AccordionTrigger className="hover:no-underline py-5">
                    <span className="font-heading font-semibold text-lg text-left">{section.title}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    <ul className="space-y-3">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex gap-3 items-start">
                          <Check className="h-5 w-5 text-accent-green mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Application Process */}
      <section ref={processRef} className="section-padding bg-secondary/30 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-40"
          style={{ y: processY }}
        >
          <div className="absolute top-20 left-20 w-40 h-40 bg-primary/10 rounded-full blur-2xl" />
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-accent-gold/10 rounded-full blur-2xl" />
        </motion.div>

        <div className="container-content relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-foreground mb-4">Application Process</h2>
            <p className="text-muted-foreground text-lg">5 simple steps to join DUSOM</p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-6">
            {applicationSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h4 className="text-foreground mb-2">{step.title}</h4>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12 p-6 bg-primary/5 rounded-2xl max-w-md mx-auto"
          >
            <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-foreground font-medium">Estimated Timeline</p>
            <p className="text-muted-foreground">2-3 weeks from submission to confirmation</p>
          </motion.div>
        </div>
      </section>

      {/* Important Dates */}
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
            <h2 className="text-foreground mb-4">Academic Sessions & Dates</h2>
            <p className="text-muted-foreground text-lg">Plan your application timeline</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {sessions.map((session, index) => (
              <motion.div
                key={session.title}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`bg-secondary/30 rounded-2xl p-8 border-l-4 ${index === 0 ? 'border-primary' : 'border-accent-green'}`}
              >
                <h3 className={`mb-6 ${index === 0 ? 'text-primary' : 'text-accent-green'}`}>{session.title}</h3>
                <div className="space-y-4">
                  {session.dates.map((date) => (
                    <div key={date.label} className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <span className="text-xs text-muted-foreground uppercase">{date.label}</span>
                        <p className="font-medium text-foreground">{date.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            All times in WAT (West Africa Time)
          </p>
        </div>
      </section>

      {/* Schedule Options */}
      <section 
        ref={scheduleRef}
        className="section-padding relative overflow-hidden" 
        style={{ background: "linear-gradient(135deg, hsl(40 30% 97%) 0%, hsl(42 40% 95%) 100%)" }}
      >
        <motion.div 
          className="absolute inset-0 opacity-50"
          style={{ y: scheduleY }}
        >
          <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-accent-gold/10 rounded-full blur-2xl" />
          <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-primary/10 rounded-full blur-2xl" />
        </motion.div>

        <div className="container-content relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-foreground mb-4">Class Schedule Options</h2>
            <p className="text-muted-foreground text-lg">Choose the track that fits your life</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {scheduleOptions.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-background rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow border-2 border-transparent hover:border-primary"
              >
                <h3 className="text-primary mb-6">{option.title}</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Days</span>
                    <span className="font-medium text-foreground">{option.days}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time</span>
                    <span className="font-medium text-foreground">{option.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium text-foreground">{option.duration}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground italic">{option.ideal}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Graduation Requirements */}
      <section className="section-padding bg-background relative overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="container-content relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-foreground mb-4">Graduation Requirements</h2>
            <p className="text-muted-foreground text-lg">What it takes to complete the program</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              "Complete all courses with passing grade",
              "Maintain 100% attendance",
              "Complete 2-week practicum",
              "Write approved project",
              "Demonstrate Christian character",
              "Spiritual impartation completion"
            ].map((req, index) => (
              <motion.div
                key={req}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-3 items-start p-4 bg-secondary/30 rounded-xl"
              >
                <Check className="h-6 w-6 text-accent-green flex-shrink-0" />
                <span className="text-foreground font-medium">{req}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 p-6 bg-destructive/5 border-l-4 border-destructive rounded-xl max-w-3xl mx-auto"
          >
            <div className="flex gap-3">
              <AlertTriangle className="h-6 w-6 text-destructive flex-shrink-0" />
              <div>
                <p className="font-semibold text-destructive">Important Notice</p>
                <p className="text-muted-foreground">Lifestyle inconsistent with Biblical standards may result in expulsion from the program.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-secondary/30 relative overflow-hidden">
        <motion.div
          className="absolute -bottom-20 -right-20 w-60 h-60 bg-accent-gold/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="container-content relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-lg">Find answers to common questions</p>
          </motion.div>

          <Accordion type="single" collapsible className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <AccordionItem value={`faq-${index}`} className="border rounded-xl px-6 bg-background">
                  <AccordionTrigger className="hover:no-underline py-5">
                    <span className="font-medium text-left">{faq.q}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
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
            className="text-center max-w-2xl mx-auto space-y-8"
          >
            <h2 className="text-primary-foreground">Ready to Apply?</h2>
            <p className="text-primary-foreground/80 text-lg">
              We're here to help you every step of the way
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                asChild
              >
                <Link to="/apply">
                  Start Application <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link to="/contact">Schedule Counseling Call</Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 pt-8">
              <div className="flex flex-col items-center gap-2">
                <Mail className="h-6 w-6" />
                <span className="text-sm text-primary-foreground/70">Email</span>
                <a href="mailto:dusomabuja@gmail.com" className="font-medium hover:text-accent-gold transition-colors">
                  dusomabuja@gmail.com
                </a>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Phone className="h-6 w-6" />
                <span className="text-sm text-primary-foreground/70">Phone</span>
                <a href="tel:+2348083275342" className="font-medium hover:text-accent-gold transition-colors">
                  +234 808 327 5342
                </a>
              </div>
              <a 
                href="https://wa.me/2348083275342" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 transition-colors group"
              >
                <svg className="h-6 w-6 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span className="text-sm text-[#25D366] font-medium">WhatsApp</span>
                <span className="font-medium text-primary-foreground group-hover:text-[#25D366] transition-colors">+234 808 327 5342</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Admissions;
