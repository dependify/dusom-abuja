import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Save, Webhook, BarChart, Search, Loader2 } from "lucide-react";

interface Setting {
  id: string;
  setting_key: string;
  setting_value: string | null;
  description: string | null;
}

const AdminSettings = () => {
  const [settings, setSettings] = useState<Record<string, string>>({
    contact_webhook_url: "",
    newsletter_webhook_url: "",
    ga4_measurement_id: "",
    site_title: "",
    site_description: "",
    site_keywords: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*");

      if (error) throw error;

      const settingsMap: Record<string, string> = {};
      data?.forEach((setting: Setting) => {
        settingsMap[setting.setting_key] = setting.setting_value || "";
      });

      setSettings((prev) => ({ ...prev, ...settingsMap }));
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updates = Object.entries(settings).map(([key, value]) => ({
        setting_key: key,
        setting_value: value,
      }));

      for (const update of updates) {
        const { error } = await supabase
          .from("site_settings")
          .update({ setting_value: update.setting_value, updated_at: new Date().toISOString() })
          .eq("setting_key", update.setting_key);

        if (error) throw error;
      }

      toast({
        title: "Settings saved!",
        description: "Your settings have been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error saving settings",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Site Settings</h1>
        <p className="text-muted-foreground">Configure webhooks, analytics, and SEO settings</p>
      </div>

      <div className="grid gap-6">
        {/* Webhook Settings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Webhook className="h-5 w-5 text-accent-gold" />
                <CardTitle>Webhook Configuration</CardTitle>
              </div>
              <CardDescription>
                Configure webhook URLs to receive form submissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="contact_webhook">Contact Form Webhook URL</Label>
                <Input
                  id="contact_webhook"
                  placeholder="https://your-webhook-url.com/contact"
                  value={settings.contact_webhook_url}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, contact_webhook_url: e.target.value }))
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Form submissions will be sent to this URL as a POST request
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newsletter_webhook">Newsletter Webhook URL</Label>
                <Input
                  id="newsletter_webhook"
                  placeholder="https://your-webhook-url.com/newsletter"
                  value={settings.newsletter_webhook_url}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, newsletter_webhook_url: e.target.value }))
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Newsletter signups will be sent to this URL as a POST request
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Analytics Settings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-accent-gold" />
                <CardTitle>Google Analytics</CardTitle>
              </div>
              <CardDescription>
                Configure Google Analytics 4 tracking
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ga4_id">GA4 Measurement ID</Label>
                <Input
                  id="ga4_id"
                  placeholder="G-XXXXXXXXXX"
                  value={settings.ga4_measurement_id}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, ga4_measurement_id: e.target.value }))
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Enter your Google Analytics 4 Measurement ID (starts with G-)
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* SEO Settings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Search className="h-5 w-5 text-accent-gold" />
                <CardTitle>SEO Configuration</CardTitle>
              </div>
              <CardDescription>
                Configure search engine optimization settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="site_title">Site Title</Label>
                <Input
                  id="site_title"
                  placeholder="DUSOM - Dunamis School of Ministry"
                  value={settings.site_title}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, site_title: e.target.value }))
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Maximum 60 characters recommended for search results
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="site_description">Site Description</Label>
                <Textarea
                  id="site_description"
                  placeholder="Train to ignite the world with the Gospel..."
                  value={settings.site_description}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, site_description: e.target.value }))
                  }
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  Maximum 160 characters recommended for search results
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="site_keywords">SEO Keywords</Label>
                <Textarea
                  id="site_keywords"
                  placeholder="dunamis, school of ministry, bible school..."
                  value={settings.site_keywords}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, site_keywords: e.target.value }))
                  }
                  rows={2}
                />
                <p className="text-xs text-muted-foreground">
                  Separate keywords with commas
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-accent-gold hover:bg-accent-orange text-white"
        >
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;
