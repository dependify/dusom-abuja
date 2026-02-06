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
  { label: "Alumni", href: "/alumni" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/dusomabuja", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com/dusomabuja", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com/@dusomabuja", label: "YouTube" },
  { icon: Linkedin, href: "https://linkedin.com/company/dusomabuja", label: "LinkedIn" },
];

// WhatsApp icon component
const WhatsAppIcon = () => (
  <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

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
              <a 
                href="https://wa.me/2348083275342" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center hover:bg-[#128C7E] hover:scale-110 transition-all duration-300" 
                aria-label="WhatsApp"
                title="Chat on WhatsApp"
              >
                <WhatsAppIcon />
              </a>
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
              <a href="tel:+2348083275342" className="flex items-start gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors group">
                <Phone size={18} className="mt-0.5 text-accent-gold group-hover:scale-110 transition-transform" />
                <span className="text-sm">+234 808 327 5342</span>
              </a>
              <a 
                href="https://wa.me/2348083275342" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-primary-foreground/70 hover:text-[#25D366] transition-colors group"
              >
                <svg className="h-[18px] w-[18px] mt-0.5 text-[#25D366] group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span className="text-sm">WhatsApp: +234 808 327 5342</span>
              </a>
              <a href="mailto:dusomabuja@gmail.com" className="flex items-start gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors group">
                <Mail size={18} className="mt-0.5 text-accent-gold group-hover:scale-110 transition-transform" />
                <span className="text-sm">dusomabuja@gmail.com</span>
              </a>
              <div className="flex items-start gap-3 text-primary-foreground/70">
                <MapPin size={18} className="mt-0.5 text-accent-gold flex-shrink-0" />
                <span className="text-sm">Dunamis International Gospel Centre, Area 1, Behind Old Federal Secretariat, Abuja, Nigeria</span>
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
          <p className="text-primary-foreground/50 text-xs">
            Designed by{" "}
            <a 
              href="https://dependifyllc.com.ng" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent-gold hover:text-accent-orange transition-colors"
            >
              Dependify LLC
            </a>
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
