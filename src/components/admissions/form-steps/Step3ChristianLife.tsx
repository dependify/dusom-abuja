import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cross, Church, HelpCircle } from "lucide-react";

interface Step3Props {
  form: UseFormReturn<any>;
}

export function Step3ChristianLife({ form }: Step3Props) {
  const needsCounseling = form.watch("needs_counseling");
  const hasCriminalRecord = form.watch("has_criminal_record");

  return (
    <div className="space-y-8">
      {/* Salvation Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Cross className="h-5 w-5 text-primary" />
            Salvation & Baptism
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="date_of_salvation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Salvation *</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date_of_water_baptism"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Water Baptism *</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="salvation_location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Where Did You Get Saved? *</FormLabel>
                  <FormControl>
                    <Input placeholder="Church or location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="baptism_location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Where Did You Do Your Water Baptism? *</FormLabel>
                  <FormControl>
                    <Input placeholder="Church or location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Church Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Church className="h-5 w-5 text-primary" />
            Church Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="present_church"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Present Church *</FormLabel>
                  <FormControl>
                    <Input placeholder="Name of your church" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pastor_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pastor's/Minister's Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="church_address_line1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Church Address *</FormLabel>
                  <FormControl>
                    <Input placeholder="Street address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="church_city"
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
                name="church_state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State *</FormLabel>
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
                name="church_postal_code"
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
                name="church_country"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="church_phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Church Phone *</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+234..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="church_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Church Email *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="church@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="church_involvement_duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How long have you been involved in this Church? *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 5 years" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="church_involvement_details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What Involvement have you had in your Church? *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your roles, ministries, and activities..."
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

      {/* Additional Questions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            Additional Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <FormField
            control={form.control}
            name="why_dusom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Why have you chosen to attend DUSOM? *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Share your reasons for choosing DUSOM..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="needs_counseling"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Do you have any character challenges or in any situation that may require help or counseling? *
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(value === "true")}
                    value={field.value?.toString()}
                    className="flex gap-6 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="counseling_yes" />
                      <Label htmlFor="counseling_yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="counseling_no" />
                      <Label htmlFor="counseling_no">No</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {needsCounseling && (
            <FormField
              control={form.control}
              name="counseling_details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>If yes, please explain</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please provide details..."
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="has_criminal_record"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Do you have any criminal record? *</FormLabel>
                <FormDescription>
                  This is to enable us to know where necessary to assist you and leverage on your experience to minister to inmates.
                </FormDescription>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(value === "true")}
                    value={field.value?.toString()}
                    className="flex gap-6 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="criminal_yes" />
                      <Label htmlFor="criminal_yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="criminal_no" />
                      <Label htmlFor="criminal_no">No</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {hasCriminalRecord && (
            <FormField
              control={form.control}
              name="criminal_record_details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>If yes, please explain</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please provide details..."
                      className="min-h-[80px]"
                      {...field}
                    />
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
