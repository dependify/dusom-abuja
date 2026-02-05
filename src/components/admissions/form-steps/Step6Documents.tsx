import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUp, FileText, Info } from "lucide-react";
import { FileUpload } from "../FileUpload";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Step6Props {
  form: UseFormReturn<any>;
  onFileUpload: (file: File, field: string) => Promise<string | null>;
}

export function Step6Documents({ form, onFileUpload }: Step6Props) {
  const isDunamisMember = form.watch("is_dunamis_member");

  return (
    <div className="space-y-8">
      {/* Certificates Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileUp className="h-5 w-5 text-primary" />
            Certificates & Documents
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert className="border-primary/20 bg-primary/5">
            <Info className="h-4 w-4 text-primary" />
            <AlertDescription>
              Please attach your certificates. You can attach up to 3 certificates. Remember to bring your original copies during your interview.
            </AlertDescription>
          </Alert>

          <FormField
            control={form.control}
            name="certificates_urls"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Your Certificates *</FormLabel>
                <FormControl>
                  <FileUpload
                    value={field.value?.[0]}
                    onChange={(url) => {
                      const current = field.value || [];
                      if (url) {
                        field.onChange([...current, url]);
                      }
                    }}
                    onUpload={(file) => onFileUpload(file, "certificates")}
                    accept=".pdf,image/*"
                    multiple
                  />
                </FormControl>
                {field.value && field.value.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {field.value.map((url: string, index: number) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FileText className="h-4 w-4" />
                        <span>Certificate {index + 1} uploaded</span>
                        <button
                          type="button"
                          onClick={() => {
                            const newUrls = field.value.filter((_: string, i: number) => i !== index);
                            field.onChange(newUrls);
                          }}
                          className="text-destructive hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <FormDescription>
                  Supported formats: PDF, JPEG, PNG (Max 10MB each, up to 3 files)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Dunamis Membership */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Dunamis Membership</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <FormField
            control={form.control}
            name="is_dunamis_member"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Are you a member of Dunamis International Gospel Centre? *</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(value === "true")}
                    value={field.value?.toString()}
                    className="flex gap-6 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="member_yes" />
                      <Label htmlFor="member_yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="member_no" />
                      <Label htmlFor="member_no">No</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isDunamisMember && (
            <FormField
              control={form.control}
              name="foundation_maturity_certificates_urls"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Foundation and Maturity Class Certificates *</FormLabel>
                  <FormControl>
                    <FileUpload
                      value={field.value?.[0]}
                      onChange={(url) => {
                        const current = field.value || [];
                        if (url) {
                          field.onChange([...current, url]);
                        }
                      }}
                      onUpload={(file) => onFileUpload(file, "foundation_maturity")}
                      accept=".pdf,image/*"
                      multiple
                    />
                  </FormControl>
                  {field.value && field.value.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {field.value.map((url: string, index: number) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <FileText className="h-4 w-4" />
                          <span>Certificate {index + 1} uploaded</span>
                          <button
                            type="button"
                            onClick={() => {
                              const newUrls = field.value.filter((_: string, i: number) => i !== index);
                              field.onChange(newUrls);
                            }}
                            className="text-destructive hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <FormDescription>
                    Please attach copy of Foundation Class Certificate and Maturity Class Certificate (up to 2 files)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {isDunamisMember === false && (
            <FormField
              control={form.control}
              name="pastor_recommendation_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pastor's Recommendation Letter *</FormLabel>
                  <FormControl>
                    <FileUpload
                      value={field.value}
                      onChange={(url) => field.onChange(url)}
                      onUpload={(file) => onFileUpload(file, "recommendation")}
                      accept=".pdf,image/*"
                    />
                  </FormControl>
                  <FormDescription>
                    Your Pastor's recommendation letter should be in scanned, picture, or PDF format. Please bring the original copy for your interview.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </CardContent>
      </Card>

      {/* Testimony */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Salvation & Christian Life Testimony
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="testimony"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Testimony *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Give a 300-word summary of your Christian Life experience including your conversion and your involvement in Church Service..."
                    className="min-h-[200px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Maximum 300 words. Include your conversion experience and church involvement.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
}
