import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { AnimatedCounter } from "@/components/home/AnimatedCounter";
import { ValueProposition } from "@/components/home/ValueProposition";
import { FeaturedCourses } from "@/components/home/FeaturedCourses";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { CTASection } from "@/components/home/CTASection";

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

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <AnimatedCounter items={stats} />
      <ValueProposition />
      <FeaturedCourses />
      <TestimonialsCarousel />
      <CTASection />
    </Layout>
  );
};

export default Index;
