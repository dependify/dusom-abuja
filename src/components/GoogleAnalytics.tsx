import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const GoogleAnalytics = () => {
  const [gaId, setGaId] = useState<string | null>(null);

  useEffect(() => {
    const fetchGaId = async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("setting_value")
        .eq("setting_key", "ga4_measurement_id")
        .maybeSingle();

      if (data?.setting_value) {
        setGaId(data.setting_value);
      }
    };

    fetchGaId();
  }, []);

  useEffect(() => {
    if (!gaId || !gaId.startsWith("G-")) return;

    // Check if already loaded
    if (document.querySelector(`script[src*="${gaId}"]`)) return;

    // Load gtag.js
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    // Initialize gtag
    const inlineScript = document.createElement("script");
    inlineScript.textContent = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}');
    `;
    document.head.appendChild(inlineScript);

  }, [gaId]);

  return null;
};