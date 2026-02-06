import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { PageSEO } from "@/components/PageSEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import headerContactBg from "@/assets/header-contact.jpg";
import { pageSEO, generateLocalBusinessSchema, generateBreadcrumbSchema } from "@/lib/seo";
const contactInfo = [
  { icon: Phone, label: "Phone", value: "+234 808 327 5342", href: "tel:+2348083275342" },
  { icon: Mail, label: "Email", value: "dusomabuja@gmail.com", href: "mailto:dusomabuja@gmail.com" },
  { icon: MapPin, label: "Address", value: "Dunamis International Gospel Centre, Area 1, Behind Old Federal Secretariat, Abuja, Nigeria", href: "#" },
  { icon: Clock, label: "Hours", value: "Mon - Fri: 9AM - 5PM WAT", href: "#" },
];

const additionalEmails = [
  "dusomexamsabuja@gmail.com",
  "dunamisschoolofministryabuja@gmail.com"
];

const socialLinks = [
  { name: "Facebook", url: "https://facebook.com/DUNAMIS SCHOOL OF MINISTRY HQ, ABUJA" },
  { name: "Instagram", url: "https://instagram.com/@DusomAbuja" },
  { name: "Twitter", url: "https://twitter.com/@DusomAbuja" },
  { name: "YouTube", url: "https://youtube.com/@DusomAbuja" },
];

const Contact = () => {
  const seo = pageSEO.contact;
  const schemas = [
    generateLocalBusinessSchema(),
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Contact", url: "/contact" }
    ])
  ];

  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save to database
      const { error } = await supabase.from("contact_submissions").insert({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone || null,
        message: formData.message,
        source: "contact_form",
      });

      if (error) throw error;

      // Try webhook
      const { data: webhookSetting } = await supabase
        .from("site_settings")
        .select("setting_value")
        .eq("setting_key", "contact_webhook_url")
        .maybeSingle();

      if (webhookSetting?.setting_value) {
        fetch(webhookSetting.setting_value, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, name: `${formData.firstName} ${formData.lastName}` }),
        }).catch(console.error);
      }

      toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
      setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

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
      <section ref={heroRef} className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${headerContactBg})`,
            y: heroY,
            scale: 1.1,
          }}
        />
        {/* Gradient Overlay for blending */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary-dark/80 to-primary/75" />
        
        <motion.div 
          className="relative z-10 container-content px-4 text-center py-32"
          style={{ opacity: heroOpacity }}
        >
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-primary-foreground">Contact Us</h1>
            <p className="text-xl text-primary-foreground/80">We'd love to hear from you. Get in touch with our team.</p>
          </motion.div>
        </motion.div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-content">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-foreground mb-6">Get in Touch</h2>
              <p className="text-muted-foreground mb-8">Have questions about admissions, courses, or campus life? Fill out the form and we'll get back to you within 24 hours.</p>
              
              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <a key={info.label} href={info.href} className="flex gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                      <info.icon className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{info.label}</p>
                      <p className="font-medium text-foreground">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>
              
              <div className="pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground mb-3">Additional Email Addresses</p>
                <div className="space-y-2">
                  {additionalEmails.map((email) => (
                    <a key={email} href={`mailto:${email}`} className="block text-sm text-primary hover:underline">
                      {email}
                    </a>
                  ))}
                </div>
              </div>
              
              <div className="pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground mb-3">Follow Us</p>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social) => (
                    <a 
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full bg-primary/10 text-sm text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <form className="bg-secondary/30 rounded-2xl p-8 space-y-6" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">First Name</label>
                    <Input placeholder="John" value={formData.firstName} onChange={(e) => setFormData(p => ({ ...p, firstName: e.target.value }))} required />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Last Name</label>
                    <Input placeholder="Doe" value={formData.lastName} onChange={(e) => setFormData(p => ({ ...p, lastName: e.target.value }))} required />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                  <Input type="email" placeholder="john@example.com" value={formData.email} onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))} required />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Phone</label>
                  <Input type="tel" placeholder="+234 XXX XXX XXXX" value={formData.phone} onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Message</label>
                  <Textarea placeholder="Tell us how we can help you..." rows={5} value={formData.message} onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))} required />
                </div>
                <Button type="submit" className="w-full bg-accent-gold hover:bg-accent-orange text-white" size="lg" disabled={loading}>
                  {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</> : <>Send Message <Send className="ml-2 h-4 w-4" /></>}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;