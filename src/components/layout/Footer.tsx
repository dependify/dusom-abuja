import { useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Linkedin, Mail, Phone, MapPin, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.png";

const quickLinks = [
  { label: "About DUSOM", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Admissions", href: "/admissions" },
  { label: "Student Life", href: "/student-life" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/dusomabuja", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com/dusomabuja", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com/@dusomabuja", label: "YouTube" },
  { icon: Linkedin, href: "https://linkedin.com/company/dusomabuja", label: "LinkedIn" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      const { error } = await supabase.from("newsletter_subscriptions").insert({ email });
      if (error) {
        if (error.code === "23505") {
          toast({ title: "Already subscribed!", description: "This email is already on our list." });
        } else {
          throw error;
        }
      } else {
        // Try webhook
        const { data: webhookSetting } = await supabase
          .from("site_settings")
          .select("setting_value")
          .eq("setting_key", "newsletter_webhook_url")
          .maybeSingle();

        if (webhookSetting?.setting_value) {
          fetch(webhookSetting.setting_value, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          }).catch(console.error);
        }

        toast({ title: "Subscribed!", description: "You'll receive our updates." });
        setEmail("");
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-primary-dark text-primary-foreground">
      <div className="container-content section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand & Social */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <img src={logo} alt="DUSOM Logo" className="h-12 w-auto" />
              <span className="font-heading font-bold text-xl">DUSOM</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Train to ignite the world with the Gospel of Jesus Christ. Equipping servants for global ministry impact.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent-gold hover:scale-110 transition-all duration-300" aria-label={social.label}>
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-heading font-semibold text-lg">Quick Links</h4>
            <nav className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <Link key={link.href} to={link.href} className="text-primary-foreground/70 hover:text-primary-foreground hover:translate-x-1 transition-all duration-200 text-sm">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="font-heading font-semibold text-lg">Contact Us</h4>
            <div className="space-y-4">
              <a href="tel:+2348012345678" className="flex items-start gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors group">
                <Phone size={18} className="mt-0.5 text-accent-gold group-hover:scale-110 transition-transform" />
                <span className="text-sm">+234 (801) 234-5678</span>
              </a>
              <a href="mailto:admissions@dusomabuja.org" className="flex items-start gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors group">
                <Mail size={18} className="mt-0.5 text-accent-gold group-hover:scale-110 transition-transform" />
                <span className="text-sm">admissions@dusomabuja.org</span>
              </a>
              <div className="flex items-start gap-3 text-primary-foreground/70">
                <MapPin size={18} className="mt-0.5 text-accent-gold flex-shrink-0" />
                <span className="text-sm">Airport Road, Area 1, Abuja, Nigeria</span>
              </div>
              <div className="flex items-start gap-3 text-primary-foreground/70">
                <Clock size={18} className="mt-0.5 text-accent-gold" />
                <span className="text-sm">Mon - Fri: 9AM - 5PM WAT</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="font-heading font-semibold text-lg">Stay Updated</h4>
            <p className="text-primary-foreground/70 text-sm">Get news and updates about upcoming sessions</p>
            <form className="space-y-3" onSubmit={handleSubscribe}>
              <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-accent-gold focus:ring-accent-gold" required />
              <Button type="submit" className="w-full bg-accent-gold hover:bg-accent-orange text-white transition-colors" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/50 text-xs">
            © {new Date().getFullYear()} Dunamis School of Ministry. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link 
              to="/privacy-policy" 
              className="text-primary-foreground/50 hover:text-primary-foreground text-xs transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className="text-primary-foreground/50 hover:text-primary-foreground text-xs transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
