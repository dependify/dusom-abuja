import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Info, DollarSign } from "lucide-react";

interface Step5Props {
  form: UseFormReturn<any>;
}

export function Step5MedicalFinancial({ form }: Step5Props) {
  const hasPhysicalCondition = form.watch("has_physical_condition");
  const hasLearningDifficulties = form.watch("has_learning_difficulties");
  const onMedication = form.watch("on_medication");
  const hospitalizedRecently = form.watch("hospitalized_recently");
  const hasFinancialCommitments = form.watch("has_financial_commitments");
  const hasDependents = form.watch("has_dependents");

  return (
    <div className="space-y-8">
      {/* Medical Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            Medical Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <FormField
            control={form.control}
            name="has_physical_condition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Do you have any physical condition that may hinder your participation at DUSOM? *</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(value === "true")}
                    value={field.value?.toString()}
                    className="flex gap-6 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="physical_yes" />
                      <Label htmlFor="physical_yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="physical_no" />
                      <Label htmlFor="physical_no">No</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {hasPhysicalCondition && (
            <FormField
              control={form.control}
              name="physical_condition_details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Please provide details:</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your condition..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="has_learning_difficulties"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Do you have any learning difficulties? *</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(value === "true")}
                    value={field.value?.toString()}
                    className="flex gap-6 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="learning_yes" />
                      <Label htmlFor="learning_yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="learning_no" />
                      <Label htmlFor="learning_no">No</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {hasLearningDifficulties && (
            <FormField
              control={form.control}
              name="learning_difficulties_details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Please provide details:</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your learning difficulties..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="on_medication"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Are you currently on any medication or presently under a doctor's care?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(value === "true")}
                    value={field.value?.toString()}
                    className="flex gap-6 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="medication_yes" />
                      <Label htmlFor="medication_yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="medication_no" />
                      <Label htmlFor="medication_no">No</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {onMedication && (
            <FormField
              control={form.control}
              name="medication_details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Please provide details:</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your medication or care..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="hospitalized_recently"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Have you been hospitalized within the last 12 months?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(value === "true")}
                    value={field.value?.toString()}
                    className="flex gap-6 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="hospital_yes" />
                      <Label htmlFor="hospital_yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="hospital_no" />
                      <Label htmlFor="hospital_no">No</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {hospitalizedRecently && (
            <FormField
              control={form.control}
              name="hospitalization_details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Please provide details:</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your hospitalization..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </CardContent>
      </Card>

      {/* General Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            General Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <FormField
            control={form.control}
            name="how_heard_about_dusom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How did you hear about Dunamis School of Ministry? *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Church announcement, friend, social media..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="why_chosen_dusom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Why have you chosen the Dunamis School of Ministry? *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Share your reasons..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Financial Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Financial Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <FormField
            control={form.control}
            name="has_financial_commitments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Will you have any current financial commitments that will be a distraction to your studies? *
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(value === "true")}
                    value={field.value?.toString()}
                    className="flex gap-6 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="financial_yes" />
                      <Label htmlFor="financial_yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="financial_no" />
                      <Label htmlFor="financial_no">No</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {hasFinancialCommitments && (
            <FormField
              control={form.control}
              name="financial_commitments_details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Please give details:</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your financial commitments..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="has_dependents"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Is anyone financially dependent on you? *</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(value === "true")}
                    value={field.value?.toString()}
                    className="flex gap-6 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="dependents_yes" />
                      <Label htmlFor="dependents_yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="dependents_no" />
                      <Label htmlFor="dependents_no">No</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {hasDependents && (
            <FormField
              control={form.control}
              name="dependents_details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Please give details:</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your dependents..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
