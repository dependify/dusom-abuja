import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText, Mail, Phone } from "lucide-react";

const sections = [
  {
    icon: Eye,
    title: "Information We Collect",
    content: `We collect information that you voluntarily provide to us when you:
    • Submit an application for admission
    • Subscribe to our newsletter
    • Contact us through our forms
    • Register for events or programs

    This may include your name, email address, phone number, mailing address, and other information relevant to your inquiry or application.`
  },
  {
    icon: Lock,
    title: "How We Protect Your Information",
    content: `We implement appropriate security measures to protect your personal information:
    • Secure SSL encryption for all data transmission
    • Restricted access to personal information
    • Regular security audits and updates
    • Compliance with data protection regulations

    Your data is stored securely using industry-standard encryption and security protocols.`
  },
  {
    icon: Shield,
    title: "How We Use Your Information",
    content: `We use the information we collect to:
    • Process your admission applications
    • Communicate with you about programs and events
    • Send newsletters and updates (with your consent)
    • Improve our services and website experience
    • Comply with legal obligations

    We will never sell your personal information to third parties.`
  },
  {
    icon: FileText,
    title: "Cookies and Analytics",
    content: `Our website uses cookies to enhance your browsing experience. These include:
    • Essential cookies for website functionality
    • Analytics cookies to understand visitor behavior
    • Preference cookies to remember your settings

    You can control cookie settings through your browser preferences.`
  }
];

export default function PrivacyPolicy() {
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
            <h1 className="text-primary-foreground mb-4">Privacy Policy</h1>
            <p className="text-primary-foreground/80 text-lg">
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
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
              Dunamis School of Ministry ("DUSOM," "we," "us," or "our") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
              visit our website or use our services. By accessing or using our services, you consent to the practices 
              described in this policy.
            </p>
          </motion.div>

          {/* Policy Sections */}
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
              <h2 className="text-foreground mb-4">Third-Party Sharing</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may share your information with trusted third-party service providers who assist us in operating 
                our website, conducting our business, or serving our users. These parties are bound by confidentiality 
                agreements and are only permitted to use your information for the specific services they provide to us. 
                We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties 
                for marketing purposes.
              </p>
            </div>

            <div className="bg-secondary/30 rounded-2xl p-8">
              <h2 className="text-foreground mb-4">Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this 
                Privacy Policy, unless a longer retention period is required or permitted by law. For application data, 
                we typically retain records for up to 5 years to maintain historical records and comply with educational 
                regulations.
              </p>
            </div>

            <div className="bg-secondary/30 rounded-2xl p-8">
              <h2 className="text-foreground mb-4">Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent where processing is based on consent</li>
              </ul>
            </div>

            <div className="bg-secondary/30 rounded-2xl p-8">
              <h2 className="text-foreground mb-4">Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal 
                information from children. If you are a parent or guardian and believe your child has provided us with 
                personal information, please contact us immediately.
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
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <a href="mailto:privacy@dusomabuja.org" className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Mail className="h-5 w-5 text-accent-gold" />
                <span>privacy@dusomabuja.org</span>
              </a>
              <a href="tel:+2348012345678" className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Phone className="h-5 w-5 text-accent-gold" />
                <span>+234 (801) 234-5678</span>
              </a>
            </div>
          </motion.div>

          {/* Changes to Policy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <p className="text-muted-foreground text-sm">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
              the new policy on this page and updating the "Last Updated" date.
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
