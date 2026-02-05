import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUpload } from "../FileUpload";
import { GraduationCap, Clock, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Step1Props {
  form: UseFormReturn<any>;
  onFileUpload: (file: File, field: string) => Promise<string | null>;
}

export function Step1Requirements({ form, onFileUpload }: Step1Props) {
  return (
    <div className="space-y-8">
      {/* Requirements Alert */}
      <Alert className="border-primary/20 bg-primary/5">
        <AlertCircle className="h-4 w-4 text-primary" />
        <AlertDescription className="text-foreground">
          <strong className="block mb-2">Application Requirements:</strong>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Applicant must be at least 18 years of age</li>
            <li>Applicant must attach at least O' level certificate (minimum)</li>
            <li>Pastor's recommendation letter (if you are not a Dunamis member)</li>
            <li>Photocopies of foundation and maturity class certificates (Dunamis member)</li>
          </ul>
        </AlertDescription>
      </Alert>

      {/* Passport Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            Passport Photograph
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="passport_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Your Passport *</FormLabel>
                <FormControl>
                  <FileUpload
                    value={field.value}
                    onChange={(url) => field.onChange(url)}
                    onUpload={(file) => onFileUpload(file, "passport")}
                    accept="image/*"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Study Preference */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Study Preference
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="study_preference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Study *</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="grid gap-4 mt-2"
                  >
                    <div className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer">
                      <RadioGroupItem value="full_time" id="full_time" />
                      <Label htmlFor="full_time" className="flex-1 cursor-pointer">
                        <span className="font-medium">Full Time</span>
                        <span className="block text-sm text-muted-foreground mt-1">
                          Monday - Friday (8:00am - 4:00pm)
                        </span>
                      </Label>
                    </div>
                    <div className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer">
                      <RadioGroupItem value="part_time" id="part_time" />
                      <Label htmlFor="part_time" className="flex-1 cursor-pointer">
                        <span className="font-medium">Part Time</span>
                        <span className="block text-sm text-muted-foreground mt-1">
                          Thursday & Friday (4:00pm - 8:00pm), Saturday (8:00am - 4:00pm)
                        </span>
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

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="First name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="middle_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Middle Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Middle name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your.email@example.com" {...field} />
                </FormControl>
                <FormDescription>
                  We'll send your application confirmation and resume link to this email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="address_line1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 1 *</FormLabel>
                  <FormControl>
                    <Input placeholder="Street address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address_line2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 2</FormLabel>
                  <FormControl>
                    <Input placeholder="Apartment, suite, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City *</FormLabel>
                    <FormControl>
                      <Input placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State / Province *</FormLabel>
                    <FormControl>
                      <Input placeholder="State" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="postal_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Postal code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country *</FormLabel>
                    <FormControl>
                      <Input placeholder="Country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
