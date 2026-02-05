import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, ExternalLink, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminAnalytics = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground">View website traffic and engagement</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-accent-gold" />
              <CardTitle>Google Analytics Integration</CardTitle>
            </div>
            <CardDescription>
              View detailed analytics in your Google Analytics dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-secondary/30 rounded-lg p-6 text-center">
              <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Analytics Dashboard</h3>
              <p className="text-muted-foreground mb-4">
                To view detailed analytics, visit your Google Analytics dashboard. Make sure you've configured your GA4 Measurement ID in Settings.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-accent-gold hover:bg-accent-orange text-white">
                  <a
                    href="https://analytics.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Google Analytics
                  </a>
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">What You Can Track</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Page views and unique visitors</li>
                  <li>• User demographics and location</li>
                  <li>• Traffic sources and referrals</li>
                  <li>• User behavior and engagement</li>
                  <li>• Conversion tracking</li>
                </ul>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Setup Instructions</h4>
                <ol className="space-y-1 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Go to Settings → Site Settings</li>
                  <li>Enter your GA4 Measurement ID</li>
                  <li>Save settings</li>
                  <li>Analytics will start tracking immediately</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminAnalytics;
