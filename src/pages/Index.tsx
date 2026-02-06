import { Layout } from "@/components/layout/Layout";
import { PageSEO } from "@/components/PageSEO";
import { HeroSection } from "@/components/home/HeroSection";
import { AnimatedCounter } from "@/components/home/AnimatedCounter";
import { ValueProposition } from "@/components/home/ValueProposition";
import { FeaturedCourses } from "@/components/home/FeaturedCourses";
import { TestimonialsPreview } from "@/components/home/TestimonialsPreview";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { CTASection } from "@/components/home/CTASection";
import { 
  pageSEO, 
  generateOrganizationSchema, 
  generateLocalBusinessSchema,
  generateCourseSchema,
  generateWebsiteSchema,
  generateFAQSchema 
} from "@/lib/seo";

const stats = [
  {
    value: 10000,
    suffix: "+",
    label: "Students Trained",
    description: "Since 2000, we've equipped believers for ministry globally",
    icon: "🎓",
  },
  {
    value: 50,
    suffix: "+",
    label: "Countries Reached",
    description: "Our alumni serve across continents spreading the Gospel",
    icon: "🌍",
  },
  {
    value: 100,
    suffix: "%",
    label: "Practical Experience",
    description: "Hands-on ministry training integrated throughout",
    icon: "🔥",
  },
];

const homeFAQs = [
  {
    question: "What is DUSOM?",
    answer: "DUSOM (Dunamis School of Ministry) is a ministry training school established in 2000 by Dr. Paul Enenche. We equip believers with biblical knowledge, practical skills, and spiritual impartation for effective ministry. Over 10,000 graduates from 50+ countries have been trained at DUSOM."
  },
  {
    question: "How long is the DUSOM program?",
    answer: "The program runs for 6 months per session, with two sessions offered annually: January-June and July-December. We offer both full-time (Monday-Friday, 8AM-4PM) and part-time (Thursday-Saturday) options."
  },
  {
    question: "What are the admission requirements for DUSOM?",
    answer: "Applicants must be born-again Christians, able to read and write fluently, medically and mentally sound. Dunamis members need Foundation & Maturity certificates; non-members need a pastor's recommendation letter. Minimum age is 18 years."
  },
  {
    question: "Where is DUSOM located?",
    answer: "DUSOM is located at Dunamis International Gospel Centre, Area 1, Behind Old Federal Secretariat, Abuja, Nigeria. Contact us at +234 808 327 5342 or dusomabuja@gmail.com."
  },
  {
    question: "Can I attend DUSOM part-time while working?",
    answer: "Yes! DUSOM offers a part-time track perfect for working professionals. Classes run Thursday-Friday (4PM-8PM) and Saturday (8AM-4PM), allowing you to continue working while receiving ministry training."
  }
];

const Index = () => {
  const seo = pageSEO.home;
  const schemas = [
    generateWebsiteSchema(),
    generateOrganizationSchema(),
    generateLocalBusinessSchema(),
    generateCourseSchema(),
    generateFAQSchema(homeFAQs)
  ];

  return (
    <Layout>
      <PageSEO {...seo} schemas={schemas} />
      <HeroSection />
      <AnimatedCounter items={stats} />
      <ValueProposition />
      <FeaturedCourses />
      <TestimonialsPreview />
      <GalleryPreview />
      <CTASection />
    </Layout>
  );
};

export default Index;
