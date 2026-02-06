import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Admissions from "./pages/Admissions";
import StudentLife from "./pages/StudentLife";
import StudentAffairs from "./pages/StudentAffairs";
import Alumni from "./pages/Alumni";
import Testimonies from "./pages/Testimonies";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Apply from "./pages/Apply";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";
import AdminAuth from "./pages/admin/AdminAuth";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminSubmissions from "./pages/admin/AdminSubmissions";
import AdminNewsletter from "./pages/admin/AdminNewsletter";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminApplications from "./pages/admin/AdminApplications";
import { SEOHead } from "./components/SEOHead";
import { GoogleAnalytics } from "./components/GoogleAnalytics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SEOHead />
      <GoogleAnalytics />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/student-life" element={<StudentLife />} />
          <Route path="/student-affairs" element={<StudentAffairs />} />
          <Route path="/alumni" element={<Alumni />} />
          <Route path="/testimonies" element={<Testimonies />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminAuth />} />
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<AdminOverview />} />
            <Route path="applications" element={<AdminApplications />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="submissions" element={<AdminSubmissions />} />
            <Route path="newsletter" element={<AdminNewsletter />} />
            <Route path="analytics" element={<AdminAnalytics />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;