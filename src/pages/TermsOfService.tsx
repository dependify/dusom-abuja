import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Scale, BookOpen, Users, Shield, AlertCircle, Mail, Phone } from "lucide-react";

const sections = [
  {
    icon: BookOpen,
    title: "Acceptance of Terms",
    content: `By accessing and using the Dunamis School of Ministry website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.

    We reserve the right to modify these terms at any time. Your continued use of our services following any changes constitutes acceptance of those changes.`
  },
  {
    icon: Users,
    title: "Admission and Eligibility",
    content: `Admission to DUSOM programs is subject to the following conditions:
    • Applicants must be at least 18 years of age
    • Must be able to read and write fluently
    • Must be a practicing Christian, born again
    • Must meet all academic requirements specified for each program
    • Must complete the full application process including interviews

    Meeting minimum requirements does not guarantee admission. DUSOM reserves the right to accept or reject any application at its discretion.`
  },
  {
    icon: Scale,
    title: "Code of Conduct",
    content: `All students and users of our services are expected to maintain high standards of conduct:
    • Respect for faculty, staff, and fellow students
    • Adherence to biblical principles and values
    • Compliance with all school policies and regulations
    • Maintaining academic integrity
    • Dressing modestly and appropriately for ministry training

    DUSOM reserves the right to dismiss any student whose conduct is deemed inconsistent with biblical standards.`
  },
  {
    icon: Shield,
    title: "Intellectual Property",
    content: `All content on this website, including but not limited to text, graphics, logos, images, audio clips, and course materials, is the property of Dunamis School of Ministry or its content suppliers and is protected by copyright laws.

    You may not reproduce, distribute, modify, or create derivative works from any content without our express written permission. Personal, non-commercial use is permitted.`
  }
];

export default function TermsOfService() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-primary">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white/30 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-accent-gold/30 rounded-full blur-3xl" />
        </div>
        
        <div className="container-content relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-2 bg-white/10 rounded-full text-sm text-white/80 mb-4">
              Legal
            </span>
            <h1 className="text-primary-foreground mb-4">Terms of Service</h1>
            <p className="text-primary-foreground/80 text-lg">
              Please read these terms carefully before using our website and services.
            </p>
            <p className="text-primary-foreground/60 text-sm mt-4">
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding bg-background">
        <div className="container-content max-w-4xl">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-lg max-w-none mb-16"
          >
            <p className="text-muted-foreground leading-relaxed">
              These Terms of Service ("Terms") govern your access to and use of the Dunamis School of Ministry 
              ("DUSOM," "we," "us," or "our") website, applications, and educational services (collectively, 
              the "Services"). By accessing or using our Services, you agree to be bound by these Terms and our 
              Privacy Policy.
            </p>
          </motion.div>

          {/* Terms Sections */}
          <div className="space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-secondary/30 rounded-2xl p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <section.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-foreground mb-4">{section.title}</h2>
                    <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                      {section.content}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Sections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 space-y-8"
          >
            <div className="bg-secondary/30 rounded-2xl p-8">
              <h2 className="text-foreground mb-4">Payment and Refunds</h2>
              <div className="text-muted-foreground space-y-4">
                <p>
                  All fees for DUSOM programs must be paid according to the payment schedule provided at registration. 
                  We accept various payment methods as indicated during the enrollment process.
                </p>
                <p>
                  <strong className="text-foreground">Refund Policy:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Full refund available within 7 days of payment, before program commencement</li>
                  <li>50% refund available if withdrawal is before the second week of classes</li>
                  <li>No refunds after the second week of the program</li>
                  <li>Application fees are non-refundable</li>
                </ul>
              </div>
            </div>

            <div className="bg-secondary/30 rounded-2xl p-8">
              <h2 className="text-foreground mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                Dunamis School of Ministry and its affiliates, directors, employees, or agents shall not be liable 
                for any indirect, incidental, special, consequential, or punitive damages resulting from your access 
                to or use of, or inability to access or use, our services. This includes but is not limited to damages 
                for loss of profits, goodwill, data, or other intangible losses.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Our total liability to you for all claims arising from or relating to these Terms or your use of 
                the Services shall not exceed the amount you paid to us, if any, during the 12 months preceding 
                the event giving rise to liability.
              </p>
            </div>

            <div className="bg-secondary/30 rounded-2xl p-8">
              <h2 className="text-foreground mb-4">Indemnification</h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree to defend, indemnify, and hold harmless Dunamis School of Ministry and its affiliates, 
                directors, employees, and agents from and against any claims, liabilities, damages, losses, and 
                expenses, including reasonable attorneys' fees, arising out of or in any way connected with your 
                access to or use of the Services, your violation of these Terms, or your violation of any rights 
                of another.
              </p>
            </div>

            <div className="bg-secondary/30 rounded-2xl p-8">
              <h2 className="text-foreground mb-4">Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the Federal Republic 
                of Nigeria, without regard to its conflict of law provisions. Any legal action or proceeding arising 
                out of or relating to these Terms shall be brought exclusively in the courts of Abuja, Nigeria.
              </p>
            </div>

            <div className="bg-secondary/30 rounded-2xl p-8">
              <h2 className="text-foreground mb-4">Disclaimer of Warranties</h2>
              <div className="flex items-start gap-4">
                <AlertCircle className="h-6 w-6 text-accent-gold flex-shrink-0 mt-1" />
                <p className="text-muted-foreground leading-relaxed">
                  OUR SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. DUNAMIS SCHOOL OF MINISTRY 
                  MAKES NO WARRANTIES, EXPRESSED OR IMPLIED, AND HEREBY DISCLAIMS ALL WARRANTIES INCLUDING, 
                  WITHOUT LIMITATION, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, 
                  OR NON-INFRINGEMENT. WE DO NOT WARRANT THAT OUR SERVICES WILL BE UNINTERRUPTED, TIMELY, 
                  SECURE, OR ERROR-FREE.
                </p>
              </div>
            </div>

            <div className="bg-secondary/30 rounded-2xl p-8">
              <h2 className="text-foreground mb-4">Termination</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may terminate or suspend your access to our Services immediately, without prior notice or 
                liability, for any reason whatsoever, including without limitation if you breach these Terms. 
                Upon termination, your right to use the Services will immediately cease.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                All provisions of these Terms which by their nature should survive termination shall survive 
                termination, including, without limitation, ownership provisions, warranty disclaimers, 
                indemnity, and limitations of liability.
              </p>
            </div>

            <div className="bg-secondary/30 rounded-2xl p-8">
              <h2 className="text-foreground mb-4">Severability</h2>
              <p className="text-muted-foreground leading-relaxed">
                If any provision of these Terms is found to be unenforceable or invalid, that provision will 
                be limited or eliminated to the minimum extent necessary so that these Terms will otherwise 
                remain in full force and effect and enforceable.
              </p>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-gradient-primary rounded-2xl p-8 text-primary-foreground"
          >
            <h2 className="text-primary-foreground mb-4">Contact Us</h2>
            <p className="text-primary-foreground/80 mb-6">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <a href="mailto:legal@dusomabuja.org" className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Mail className="h-5 w-5 text-accent-gold" />
                <span>legal@dusomabuja.org</span>
              </a>
              <a href="tel:+2348012345678" className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Phone className="h-5 w-5 text-accent-gold" />
                <span>+234 (801) 234-5678</span>
              </a>
            </div>
          </motion.div>

          {/* Final Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <p className="text-muted-foreground text-sm">
              By using our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
