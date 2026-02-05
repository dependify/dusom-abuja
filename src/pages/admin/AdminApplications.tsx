import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Search, 
  Loader2, 
  Eye, 
  FileText, 
  User, 
  Mail, 
  Phone, 
  Calendar,
  MapPin,
  Church,
  GraduationCap,
  Heart,
  AlertCircle,
  ExternalLink,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw
} from "lucide-react";
import { format } from "date-fns";

type ApplicationStatus = "draft" | "submitted" | "under_review" | "accepted" | "rejected";

interface Application {
  id: string;
  application_number: string | null;
  first_name: string | null;
  middle_name: string | null;
  last_name: string | null;
  email: string | null;
  work_mobile: string | null;
  status: ApplicationStatus;
  study_preference: string | null;
  created_at: string;
  submitted_at: string | null;
  current_step: number;
  city: string | null;
  state: string | null;
  country: string | null;
  date_of_birth: string | null;
  marital_status: string | null;
  highest_education: string | null;
  present_church: string | null;
  pastor_name: string | null;
  is_dunamis_member: boolean | null;
  passport_url: string | null;
  testimony: string | null;
  why_dusom: string | null;
  why_chosen_dusom: string | null;
}

const statusColors: Record<ApplicationStatus, string> = {
  draft: "bg-muted text-muted-foreground",
  submitted: "bg-accent-gold/10 text-accent-gold border-accent-gold",
  under_review: "bg-primary/10 text-primary border-primary",
  accepted: "bg-accent-green/10 text-accent-green border-accent-green",
  rejected: "bg-destructive/10 text-destructive border-destructive",
};

const statusIcons: Record<ApplicationStatus, React.ReactNode> = {
  draft: <FileText className="h-3 w-3" />,
  submitted: <Clock className="h-3 w-3" />,
  under_review: <RefreshCw className="h-3 w-3" />,
  accepted: <CheckCircle className="h-3 w-3" />,
  rejected: <XCircle className="h-3 w-3" />,
};

const AdminApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [updating, setUpdating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("admission_applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error: any) {
      console.error("Error fetching applications:", error);
      toast({
        title: "Error",
        description: "Failed to fetch applications",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: ApplicationStatus) => {
    try {
      setUpdating(true);
      const { error } = await supabase
        .from("admission_applications")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Status Updated",
        description: `Application status changed to ${newStatus.replace("_", " ")}`,
      });

      // Refresh the list
      fetchApplications();
      
      // Update the selected application if open
      if (selectedApplication?.id === id) {
        setSelectedApplication(prev => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (error: any) {
      console.error("Error updating status:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  const filteredApplications = applications.filter((app) => {
    const matchesSearch = 
      (app.first_name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (app.last_name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (app.email?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (app.application_number?.toLowerCase() || "").includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: applications.length,
    draft: applications.filter(a => a.status === "draft").length,
    submitted: applications.filter(a => a.status === "submitted").length,
    under_review: applications.filter(a => a.status === "under_review").length,
    accepted: applications.filter(a => a.status === "accepted").length,
    rejected: applications.filter(a => a.status === "rejected").length,
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
        <h1 className="text-2xl font-bold text-foreground">Applications</h1>
        <p className="text-muted-foreground">View and manage admission applications</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Total", value: stats.total, color: "bg-primary" },
          { label: "Draft", value: stats.draft, color: "bg-muted" },
          { label: "Submitted", value: stats.submitted, color: "bg-accent-gold" },
          { label: "Under Review", value: stats.under_review, color: "bg-primary" },
          { label: "Accepted", value: stats.accepted, color: "bg-accent-green" },
          { label: "Rejected", value: stats.rejected, color: "bg-destructive" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${stat.color}`} />
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or application number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={fetchApplications}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card>
        <CardContent className="p-0">
          {filteredApplications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No applications found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Application #</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Study Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((app, index) => (
                    <motion.tr
                      key={app.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.02 }}
                      className="border-b hover:bg-muted/50"
                    >
                      <TableCell className="font-mono text-sm">
                        {app.application_number || `Draft (Step ${app.current_step}/7)`}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {[app.first_name, app.middle_name, app.last_name].filter(Boolean).join(" ") || "—"}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {app.email || "—"}
                      </TableCell>
                      <TableCell>
                        {app.study_preference === "full_time" ? "Full Time" : 
                         app.study_preference === "part_time" ? "Part Time" : "—"}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={`${statusColors[app.status]} flex items-center gap-1 w-fit`}
                        >
                          {statusIcons[app.status]}
                          {app.status.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {app.submitted_at 
                          ? format(new Date(app.submitted_at), "MMM d, yyyy")
                          : format(new Date(app.created_at), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setSelectedApplication(app);
                            setDetailsOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Application Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedApplication && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <span>Application Details</span>
                  <Badge 
                    variant="outline" 
                    className={`${statusColors[selectedApplication.status]} flex items-center gap-1`}
                  >
                    {statusIcons[selectedApplication.status]}
                    {selectedApplication.status.replace("_", " ")}
                  </Badge>
                </DialogTitle>
                <DialogDescription>
                  {selectedApplication.application_number || `Draft Application (Step ${selectedApplication.current_step}/7)`}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-6 py-4">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Full Name:</span>
                      <p className="font-medium">
                        {[selectedApplication.first_name, selectedApplication.middle_name, selectedApplication.last_name].filter(Boolean).join(" ") || "—"}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Email:</span>
                      <p className="font-medium flex items-center gap-2">
                        <Mail className="h-3 w-3" />
                        {selectedApplication.email || "—"}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Phone:</span>
                      <p className="font-medium flex items-center gap-2">
                        <Phone className="h-3 w-3" />
                        {selectedApplication.work_mobile || "—"}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Date of Birth:</span>
                      <p className="font-medium flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        {selectedApplication.date_of_birth 
                          ? format(new Date(selectedApplication.date_of_birth), "MMMM d, yyyy")
                          : "—"}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Location:</span>
                      <p className="font-medium flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        {[selectedApplication.city, selectedApplication.state, selectedApplication.country].filter(Boolean).join(", ") || "—"}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Marital Status:</span>
                      <p className="font-medium capitalize">{selectedApplication.marital_status || "—"}</p>
                    </div>
                  </div>
                </div>

                {/* Education & Church */}
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    Education & Church
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Highest Education:</span>
                      <p className="font-medium uppercase">{selectedApplication.highest_education || "—"}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Study Preference:</span>
                      <p className="font-medium">
                        {selectedApplication.study_preference === "full_time" ? "Full Time" : 
                         selectedApplication.study_preference === "part_time" ? "Part Time" : "—"}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Present Church:</span>
                      <p className="font-medium flex items-center gap-2">
                        <Church className="h-3 w-3" />
                        {selectedApplication.present_church || "—"}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Pastor's Name:</span>
                      <p className="font-medium">{selectedApplication.pastor_name || "—"}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Dunamis Member:</span>
                      <p className="font-medium">
                        {selectedApplication.is_dunamis_member === true ? "Yes" : 
                         selectedApplication.is_dunamis_member === false ? "No" : "—"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Testimony & Why DUSOM */}
                {(selectedApplication.testimony || selectedApplication.why_dusom || selectedApplication.why_chosen_dusom) && (
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Heart className="h-4 w-4 text-primary" />
                      Testimony & Motivation
                    </h3>
                    {selectedApplication.testimony && (
                      <div>
                        <span className="text-muted-foreground text-sm">Testimony:</span>
                        <p className="text-sm mt-1 bg-muted/50 p-3 rounded-lg whitespace-pre-wrap">
                          {selectedApplication.testimony}
                        </p>
                      </div>
                    )}
                    {selectedApplication.why_dusom && (
                      <div>
                        <span className="text-muted-foreground text-sm">Why DUSOM:</span>
                        <p className="text-sm mt-1 bg-muted/50 p-3 rounded-lg whitespace-pre-wrap">
                          {selectedApplication.why_dusom}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Documents */}
                {selectedApplication.passport_url && (
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      Documents
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href={selectedApplication.passport_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          View Passport
                        </a>
                      </Button>
                    </div>
                  </div>
                )}

                {/* Status Update */}
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-semibold flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-primary" />
                    Update Status
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(["submitted", "under_review", "accepted", "rejected"] as ApplicationStatus[]).map((status) => (
                      <Button
                        key={status}
                        variant={selectedApplication.status === status ? "default" : "outline"}
                        size="sm"
                        onClick={() => updateStatus(selectedApplication.id, status)}
                        disabled={updating || selectedApplication.status === status}
                      >
                        {updating && selectedApplication.status !== status ? (
                          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                        ) : (
                          statusIcons[status]
                        )}
                        <span className="ml-1 capitalize">{status.replace("_", " ")}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <DialogFooter>
                {selectedApplication.email && (
                  <Button variant="outline" asChild>
                    <a href={`mailto:${selectedApplication.email}`}>
                      <Mail className="h-4 w-4 mr-2" />
                      Email Applicant
                    </a>
                  </Button>
                )}
                <Button onClick={() => setDetailsOpen(false)}>Close</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminApplications;
