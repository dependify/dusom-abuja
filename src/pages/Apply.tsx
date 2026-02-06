import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { PageSEO } from "@/components/PageSEO";
import { AdmissionForm } from "@/components/admissions/AdmissionForm";
import { motion } from "framer-motion";
import headerImage from "@/assets/header-admissions.jpg";
import { pageSEO, generateBreadcrumbSchema } from "@/lib/seo";

export default function Apply() {
  const [searchParams] = useSearchParams();
  const resumeToken = searchParams.get("token") || undefined;

  const seo = pageSEO.apply;
  const schemas = [
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Admissions", url: "/admissions" },
      { name: resumeToken ? "Continue Application" : "Apply Now", url: "/apply" }
    ])
  ];

  return (
    <Layout>
      <PageSEO {...seo} schemas={schemas} />
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${headerImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-dark/90" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading font-bold mb-4"
          >
            {resumeToken ? "Continue Your Application" : "Apply to DUSOM"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
          >
            Begin your journey to becoming a firebrand for Christ
          </motion.p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container px-4">
          <AdmissionForm resumeToken={resumeToken} />
        </div>
      </section>
    </Layout>
  );
}
