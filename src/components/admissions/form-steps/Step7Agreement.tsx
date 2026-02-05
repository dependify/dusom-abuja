import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, BookOpen, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Step7Props {
  form: UseFormReturn<any>;
}

export function Step7Agreement({ form }: Step7Props) {
  return (
    <div className="space-y-8">
      {/* Disclaimer */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Disclaimer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="agrees_to_policy"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-normal leading-relaxed">
                  It is DUSOM Policy that students should abstain from the use of alcohol, drugs, tobacco, and other vices during their time at the school, and thereafter. Will you abide by this policy? *
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(value === "true")}
                    value={field.value?.toString()}
                    className="flex gap-6 mt-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="policy_yes" />
                      <Label htmlFor="policy_yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="policy_no" />
                      <Label htmlFor="policy_no">No</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Study Focus */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Study Focus
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span>Raising Firemen. Like missiles to compel the obedience of their generation</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span>Providing skilled labor for the end-time harvest</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span>Training men to gather their destinies and effectively fulfill God's purpose</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span>Providing help for God's servants to run their God-given assignment with excellence and integrity</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Enrollment Agreement */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Enrollment Agreement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert className="border-primary/20 bg-primary/5">
            <AlertDescription className="text-sm leading-relaxed">
              I have answered all questions in this application form accurately and to the best of my knowledge. I have read through, fully understand & agree to the above conditions of enrollment. I agree that if I breach these requirements, the school has the right to suspend me or terminate this agreement without notice. I agree to unreservedly carry out my studies and duties by this agreement at all times to the best of my ability. I have also read through, fully understand & agree to the Bible School Privacy Policy.
            </AlertDescription>
          </Alert>

          <FormField
            control={form.control}
            name="agrees_to_terms"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">
                  Do you understand and agree to the terms listed above? *
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(value === "true")}
                    value={field.value?.toString()}
                    className="mt-4"
                  >
                    <div className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer">
                      <RadioGroupItem value="true" id="terms_yes" className="mt-1" />
                      <Label htmlFor="terms_yes" className="flex-1 cursor-pointer">
                        <span className="font-medium">Yes, I understand and agree to the terms listed above.</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Success Message Preview */}
      <Alert className="border-accent-green/30 bg-accent-green/5">
        <CheckCircle className="h-4 w-4 text-accent-green" />
        <AlertDescription className="text-foreground">
          <strong>Almost there!</strong> After submitting, you'll receive a confirmation email with your application number and next steps for your interview.
        </AlertDescription>
      </Alert>
    </div>
  );
}
