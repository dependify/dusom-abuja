import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const SEOHead = () => {
  const [settings, setSettings] = useState({
    site_title: "DUSOM - Dunamis School of Ministry",
    site_description: "Train to ignite the world with the Gospel of Jesus Christ. Join thousands of firebrands who have been equipped at Dunamis School of Ministry.",
    site_keywords: "dunamis, school of ministry, dusom, abuja, nigeria, bible school, ministry training",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("setting_key, setting_value")
        .in("setting_key", ["site_title", "site_description", "site_keywords"]);

      if (data) {
        const settingsMap: Record<string, string> = {};
        data.forEach((s) => {
          if (s.setting_value) settingsMap[s.setting_key] = s.setting_value;
        });
        setSettings((prev) => ({ ...prev, ...settingsMap }));
      }
    };

    fetchSettings();
  }, []);

  useEffect(() => {
    // Use requestAnimationFrame to defer DOM manipulation for Firefox compatibility
    const rafId = requestAnimationFrame(() => {
      document.title = settings.site_title;
      
      // Update meta tags
      const updateMeta = (name: string, content: string, isProperty = false) => {
        const attr = isProperty ? "property" : "name";
        let meta = document.querySelector(`meta[${attr}="${name}"]`);
        if (!meta) {
          meta = document.createElement("meta");
          meta.setAttribute(attr, name);
          document.head.appendChild(meta);
        }
        meta.setAttribute("content", content);
      };

      updateMeta("description", settings.site_description);
      updateMeta("keywords", settings.site_keywords);
      updateMeta("og:title", settings.site_title, true);
      updateMeta("og:description", settings.site_description, true);
      updateMeta("twitter:title", settings.site_title);
      updateMeta("twitter:description", settings.site_description);

      // Add FAQ Schema
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is DUSOM?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "DUSOM (Dunamis School of Ministry) is a ministry training school that equips believers with biblical knowledge, practical skills, and spiritual impartation for effective ministry."
            }
          },
          {
            "@type": "Question",
            name: "How long is the program?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The program runs for 6 months per session, with two sessions offered annually: January-June and July-December."
            }
          },
          {
            "@type": "Question",
            name: "Can I attend part-time?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, DUSOM offers both full-time (Monday-Friday) and part-time (Thursday-Saturday) options to accommodate different schedules."
            }
          }
        ]
      };

      let scriptEl = document.querySelector('script[data-schema="faq"]');
      if (!scriptEl) {
        scriptEl = document.createElement("script");
        scriptEl.setAttribute("type", "application/ld+json");
        scriptEl.setAttribute("data-schema", "faq");
        document.head.appendChild(scriptEl);
        scriptEl.textContent = JSON.stringify(faqSchema);
      }

      // Add Organization Schema
      const orgSchema = {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        name: "Dunamis School of Ministry (DUSOM)",
        url: window.location.origin,
        logo: `${window.location.origin}/favicon.png`,
        description: settings.site_description,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Airport Road, Area 1",
          addressLocality: "Abuja",
          addressCountry: "Nigeria"
        }
      };

      let orgScriptEl = document.querySelector('script[data-schema="organization"]');
      if (!orgScriptEl) {
        orgScriptEl = document.createElement("script");
        orgScriptEl.setAttribute("type", "application/ld+json");
        orgScriptEl.setAttribute("data-schema", "organization");
        document.head.appendChild(orgScriptEl);
        orgScriptEl.textContent = JSON.stringify(orgSchema);
      }
    });

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [settings]);

  return null;
};