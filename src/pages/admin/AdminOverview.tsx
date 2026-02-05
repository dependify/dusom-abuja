import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { MessageSquare, Mail, Image, TrendingUp } from "lucide-react";

const AdminOverview = () => {
  const [stats, setStats] = useState({
    submissions: 0,
    unreadSubmissions: 0,
    subscribers: 0,
    galleryImages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [submissionsRes, unreadRes, subscribersRes, galleryRes] = await Promise.all([
          supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
          supabase.from("contact_submissions").select("id", { count: "exact", head: true }).eq("is_read", false),
          supabase.from("newsletter_subscriptions").select("id", { count: "exact", head: true }).eq("is_active", true),
          supabase.from("gallery_images").select("id", { count: "exact", head: true }),
        ]);

        setStats({
          submissions: submissionsRes.count || 0,
          unreadSubmissions: unreadRes.count || 0,
          subscribers: subscribersRes.count || 0,
          galleryImages: galleryRes.count || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Contact Submissions",
      value: stats.submissions,
      subValue: `${stats.unreadSubmissions} unread`,
      icon: MessageSquare,
      color: "bg-blue-500",
    },
    {
      title: "Newsletter Subscribers",
      value: stats.subscribers,
      subValue: "Active subscribers",
      icon: Mail,
      color: "bg-green-500",
    },
    {
      title: "Gallery Images",
      value: stats.galleryImages,
      subValue: "Photos uploaded",
      icon: Image,
      color: "bg-purple-500",
    },
    {
      title: "Site Performance",
      value: "Active",
      subValue: "All systems running",
      icon: TrendingUp,
      color: "bg-accent-gold",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome to the DUSOM admin panel</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loading ? (
                    <div className="h-8 w-16 bg-gray-200 animate-pulse rounded" />
                  ) : (
                    stat.value
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{stat.subValue}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Use the sidebar to navigate to different sections:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-accent-gold rounded-full" />
                <strong>Settings:</strong> Configure webhooks, GA4, and SEO
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-accent-gold rounded-full" />
                <strong>Gallery:</strong> Add, edit, or remove gallery images
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-accent-gold rounded-full" />
                <strong>Submissions:</strong> View contact form submissions
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-accent-gold rounded-full" />
                <strong>Newsletter:</strong> Manage email subscribers
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Database</span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-green-600">Connected</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Storage</span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-green-600">Active</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Edge Functions</span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-green-600">Deployed</span>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverview;
