import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FormProgress } from "./FormProgress";
import { Step1Requirements } from "./form-steps/Step1Requirements";
import { Step2PersonalDetails } from "./form-steps/Step2PersonalDetails";
import { Step3ChristianLife } from "./form-steps/Step3ChristianLife";
import { Step4References } from "./form-steps/Step4References";
import { Step5MedicalFinancial } from "./form-steps/Step5MedicalFinancial";
import { Step6Documents } from "./form-steps/Step6Documents";
import { Step7Agreement } from "./form-steps/Step7Agreement";
import { ChevronLeft, ChevronRight, Save, Send, Loader2, Link as LinkIcon, Copy, Check } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const STEPS = [
  { title: "Requirements", description: "Basic requirements and personal information" },
  { title: "Personal Details", description: "Your details and emergency contact" },
  { title: "Christian Life", description: "Your spiritual journey and church involvement" },
  { title: "References", description: "Two references who can vouch for you" },
  { title: "Medical & Financial", description: "Health and financial information" },
  { title: "Documents", description: "Upload required certificates and testimony" },
  { title: "Agreement", description: "Review and accept terms" },
];

// Form schema with validation
const formSchema = z.object({
  // Step 1
  passport_url: z.string().optional(),
  study_preference: z.string().min(1, "Please select a study preference"),
  first_name: z.string().min(2, "First name is required"),
  middle_name: z.string().optional(),
  last_name: z.string().min(2, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  address_line1: z.string().min(1, "Address is required"),
  address_line2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postal_code: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  
  // Step 2
  nationality: z.string().optional(),
  date_of_birth: z.string().optional(),
  work_mobile: z.string().optional(),
  place_of_birth: z.string().optional(),
  telephone_home: z.string().optional(),
  facsimile: z.string().optional(),
  emergency_contact_first_name: z.string().optional(),
  emergency_contact_last_name: z.string().optional(),
  emergency_relationship: z.string().optional(),
  emergency_address_line1: z.string().optional(),
  emergency_city: z.string().optional(),
  emergency_state: z.string().optional(),
  emergency_postal_code: z.string().optional(),
  emergency_country: z.string().optional(),
  emergency_phone: z.string().optional(),
  marital_status: z.string().optional(),
  highest_education: z.string().optional(),
  
  // Step 3
  date_of_salvation: z.string().optional(),
  date_of_water_baptism: z.string().optional(),
  salvation_location: z.string().optional(),
  baptism_location: z.string().optional(),
  present_church: z.string().optional(),
  pastor_name: z.string().optional(),
  church_address_line1: z.string().optional(),
  church_city: z.string().optional(),
  church_state: z.string().optional(),
  church_postal_code: z.string().optional(),
  church_country: z.string().optional(),
  church_phone: z.string().optional(),
  church_involvement_duration: z.string().optional(),
  church_email: z.string().optional(),
  church_involvement_details: z.string().optional(),
  why_dusom: z.string().optional(),
  needs_counseling: z.boolean().optional(),
  counseling_details: z.string().optional(),
  has_criminal_record: z.boolean().optional(),
  criminal_record_details: z.string().optional(),
  
  // Step 4
  ref1_first_name: z.string().optional(),
  ref1_last_name: z.string().optional(),
  ref1_address_line1: z.string().optional(),
  ref1_city: z.string().optional(),
  ref1_state: z.string().optional(),
  ref1_postal_code: z.string().optional(),
  ref1_country: z.string().optional(),
  ref1_phone: z.string().optional(),
  ref1_email: z.string().optional(),
  ref2_first_name: z.string().optional(),
  ref2_last_name: z.string().optional(),
  ref2_address_line1: z.string().optional(),
  ref2_city: z.string().optional(),
  ref2_state: z.string().optional(),
  ref2_postal_code: z.string().optional(),
  ref2_country: z.string().optional(),
  ref2_phone: z.string().optional(),
  ref2_email: z.string().optional(),
  
  // Step 5
  has_physical_condition: z.boolean().optional(),
  physical_condition_details: z.string().optional(),
  has_learning_difficulties: z.boolean().optional(),
  learning_difficulties_details: z.string().optional(),
  on_medication: z.boolean().optional(),
  medication_details: z.string().optional(),
  hospitalized_recently: z.boolean().optional(),
  hospitalization_details: z.string().optional(),
  how_heard_about_dusom: z.string().optional(),
  why_chosen_dusom: z.string().optional(),
  has_financial_commitments: z.boolean().optional(),
  financial_commitments_details: z.string().optional(),
  has_dependents: z.boolean().optional(),
  dependents_details: z.string().optional(),
  
  // Step 6
  certificates_urls: z.array(z.string()).optional(),
  is_dunamis_member: z.boolean().optional(),
  foundation_maturity_certificates_urls: z.array(z.string()).optional(),
  pastor_recommendation_url: z.string().optional(),
  testimony: z.string().optional(),
  
  // Step 7
  agrees_to_policy: z.boolean().optional(),
  agrees_to_terms: z.boolean().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface AdmissionFormProps {
  resumeToken?: string;
}

export function AdmissionForm({ resumeToken }: AdmissionFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [savedResumeToken, setSavedResumeToken] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [applicationNumber, setApplicationNumber] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "Nigeria",
      emergency_country: "Nigeria",
      church_country: "Nigeria",
      ref1_country: "Nigeria",
      ref2_country: "Nigeria",
      certificates_urls: [],
      foundation_maturity_certificates_urls: [],
    },
  });

  // Load existing application if resumeToken is provided
  useEffect(() => {
    if (resumeToken) {
      loadApplication(resumeToken);
    }
  }, [resumeToken]);

  const loadApplication = async (token: string) => {
    try {
      const { data, error } = await supabase
        .from("admission_applications")
        .select("*")
        .eq("resume_token", token)
        .single();

      if (error) throw error;

      if (data) {
        setApplicationId(data.id);
        setSavedResumeToken(data.resume_token);
        setCurrentStep(data.current_step || 1);
        
        // Populate form with saved data
        const formData: any = {};
        Object.keys(data).forEach((key) => {
          if (key in formSchema.shape && data[key] !== null) {
            formData[key] = data[key];
          }
        });
        form.reset(formData);
        
        toast({
          title: "Application Loaded",
          description: "Your saved application has been restored.",
        });
      }
    } catch (error) {
      console.error("Error loading application:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not load your application. Please try again.",
      });
    }
  };

  const saveApplication = useCallback(async (showDialog = true) => {
    setIsSaving(true);
    const formData = form.getValues();
    
    try {
      if (applicationId) {
        // Update existing application
        const { error } = await supabase
          .from("admission_applications")
          .update({
            ...formData,
            current_step: currentStep,
          })
          .eq("id", applicationId);

        if (error) throw error;
      } else {
        // Create new application
        const { data, error } = await supabase
          .from("admission_applications")
          .insert({
            ...formData,
            current_step: currentStep,
            status: "draft",
          })
          .select()
          .single();

        if (error) throw error;

        setApplicationId(data.id);
        setSavedResumeToken(data.resume_token);
      }

      if (showDialog) {
        setShowSaveDialog(true);
      }

      toast({
        title: "Progress Saved",
        description: "Your application has been saved.",
      });
    } catch (error) {
      console.error("Error saving application:", error);
      toast({
        variant: "destructive",
        title: "Save Failed",
        description: "Could not save your application. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  }, [applicationId, currentStep, form, toast]);

  const submitApplication = async () => {
    setIsSubmitting(true);
    const formData = form.getValues();

    try {
      if (applicationId) {
        const { data, error } = await supabase
          .from("admission_applications")
          .update({
            ...formData,
            current_step: 7,
            status: "submitted",
          })
          .eq("id", applicationId)
          .select()
          .single();

        if (error) throw error;

        setApplicationNumber(data.application_number);
        setShowSuccessDialog(true);
      } else {
        const { data, error } = await supabase
          .from("admission_applications")
          .insert({
            ...formData,
            current_step: 7,
            status: "submitted",
          })
          .select()
          .single();

        if (error) throw error;

        setApplicationNumber(data.application_number);
        setShowSuccessDialog(true);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "Could not submit your application. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = async (file: File, fieldType: string): Promise<string | null> => {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${fieldType}_${Date.now()}.${fileExt}`;
      const filePath = `applications/${applicationId || "temp"}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("application-documents")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("application-documents")
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: "Could not upload file. Please try again.",
      });
      return null;
    }
  };

  const goToNextStep = async () => {
    // Save progress before moving to next step
    await saveApplication(false);
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const copyResumeLink = () => {
    const link = `${window.location.origin}/apply?token=${savedResumeToken}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Requirements form={form} onFileUpload={handleFileUpload} />;
      case 2:
        return <Step2PersonalDetails form={form} />;
      case 3:
        return <Step3ChristianLife form={form} />;
      case 4:
        return <Step4References form={form} />;
      case 5:
        return <Step5MedicalFinancial form={form} />;
      case 6:
        return <Step6Documents form={form} onFileUpload={handleFileUpload} />;
      case 7:
        return <Step7Agreement form={form} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <FormProgress currentStep={currentStep} totalSteps={STEPS.length} steps={STEPS} />

        <Form {...form}>
          <form onSubmit={(e) => e.preventDefault()}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <Card className="mt-8 sticky bottom-4 z-10">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={goToPreviousStep}
                    disabled={currentStep === 1}
                    className="w-full sm:w-auto"
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => saveApplication(true)}
                      disabled={isSaving}
                      className="flex-1 sm:flex-none"
                    >
                      {isSaving ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4 mr-2" />
                      )}
                      Save Progress
                    </Button>

                    {currentStep === STEPS.length ? (
                      <Button
                        type="button"
                        onClick={submitApplication}
                        disabled={isSubmitting || !form.watch("agrees_to_terms")}
                        className="flex-1 sm:flex-none bg-accent-green hover:bg-accent-green/90"
                      >
                        {isSubmitting ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Send className="h-4 w-4 mr-2" />
                        )}
                        Submit Application
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={goToNextStep}
                        className="flex-1 sm:flex-none"
                      >
                        Next
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>

      {/* Save Progress Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <LinkIcon className="h-5 w-5 text-primary" />
              Application Saved!
            </DialogTitle>
            <DialogDescription>
              Your progress has been saved. Use this link to continue your application later:
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                readOnly
                value={`${window.location.origin}/apply?token=${savedResumeToken}`}
                className="flex-1"
              />
              <Button onClick={copyResumeLink} variant="outline">
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              <strong>Important:</strong> Save this link or bookmark this page to continue your application later.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-accent-green">
              <Check className="h-5 w-5" />
              Application Submitted Successfully!
            </DialogTitle>
            <DialogDescription>
              Thank you for applying to DUSOM. Your application has been received.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {applicationNumber && (
              <div className="p-4 bg-primary/5 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Your Application Number</p>
                <p className="text-2xl font-bold text-primary">{applicationNumber}</p>
              </div>
            )}
            <div className="space-y-2 text-sm">
              <p>✓ A confirmation email will be sent to your registered email address</p>
              <p>✓ Our admissions team will review your application</p>
              <p>✓ You will be contacted for an interview schedule</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
