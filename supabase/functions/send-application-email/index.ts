import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  type: "submission" | "status_change";
  applicationId: string;
  newStatus?: string;
}

const getSubmissionEmail = (
  applicantName: string,
  applicationNumber: string
) => ({
  subject: "🎉 Application Received - DUSOM Abuja",
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #1594C8 0%, #004883 100%); padding: 40px 30px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">DUSOM Abuja</h1>
                  <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0; font-size: 14px;">Dunamis School of Ministry</p>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  <h2 style="color: #004883; margin: 0 0 20px; font-size: 24px;">Application Received! 🔥</h2>
                  
                  <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                    Dear <strong>${applicantName}</strong>,
                  </p>
                  
                  <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                    Thank you for submitting your application to the Dunamis School of Ministry. We are excited that you are taking this step in your spiritual journey!
                  </p>
                  
                  <div style="background-color: #f8f9fa; border-left: 4px solid #D4A017; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
                    <p style="color: #666666; margin: 0 0 8px; font-size: 14px;">Your Application Number:</p>
                    <p style="color: #004883; margin: 0; font-size: 24px; font-weight: bold; font-family: monospace;">${applicationNumber}</p>
                  </div>
                  
                  <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                    <strong>What happens next?</strong>
                  </p>
                  
                  <ul style="color: #333333; font-size: 16px; line-height: 1.8; margin: 0 0 20px; padding-left: 20px;">
                    <li>Our admissions team will review your application</li>
                    <li>You may be contacted for an interview</li>
                    <li>You'll receive notification of your admission status via email</li>
                  </ul>
                  
                  <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                    Please keep this email for your records. If you have any questions, feel free to contact us.
                  </p>
                  
                  <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 30px 0 0;">
                    God bless you,<br>
                    <strong>DUSOM Admissions Team</strong>
                  </p>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #004883; padding: 30px; text-align: center;">
                  <p style="color: rgba(255, 255, 255, 0.8); margin: 0; font-size: 14px;">
                    Dunamis School of Ministry, Abuja<br>
                    Airport Road, Area 1, Abuja, Nigeria
                  </p>
                  <p style="color: rgba(255, 255, 255, 0.6); margin: 15px 0 0; font-size: 12px;">
                    © ${new Date().getFullYear()} DUSOM Abuja. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `,
});

const getStatusChangeEmail = (
  applicantName: string,
  applicationNumber: string,
  newStatus: string
) => {
  const statusMessages: Record<string, { title: string; message: string; color: string }> = {
    under_review: {
      title: "Application Under Review",
      message: "Your application is now being reviewed by our admissions team. We will contact you if we need any additional information.",
      color: "#1594C8",
    },
    accepted: {
      title: "Congratulations! You've Been Accepted! 🎉",
      message: "We are thrilled to inform you that your application to the Dunamis School of Ministry has been ACCEPTED! Welcome to the family of firebrands. You will receive further instructions about enrollment and orientation soon.",
      color: "#4CB96D",
    },
    rejected: {
      title: "Application Update",
      message: "After careful review, we regret to inform you that we are unable to offer you admission at this time. We encourage you to continue growing in your faith and consider reapplying in the future.",
      color: "#E74C3C",
    },
  };

  const status = statusMessages[newStatus] || statusMessages.under_review;

  return {
    subject: `${status.title} - DUSOM Abuja`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #1594C8 0%, #004883 100%); padding: 40px 30px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">DUSOM Abuja</h1>
                    <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0; font-size: 14px;">Dunamis School of Ministry</p>
                  </td>
                </tr>
                
                <!-- Status Badge -->
                <tr>
                  <td style="padding: 30px 30px 0; text-align: center;">
                    <div style="display: inline-block; background-color: ${status.color}; color: #ffffff; padding: 12px 24px; border-radius: 30px; font-weight: bold; font-size: 16px;">
                      ${status.title}
                    </div>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 30px;">
                    <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                      Dear <strong>${applicantName}</strong>,
                    </p>
                    
                    <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                      ${status.message}
                    </p>
                    
                    <div style="background-color: #f8f9fa; padding: 15px 20px; margin: 20px 0; border-radius: 8px; text-align: center;">
                      <p style="color: #666666; margin: 0 0 5px; font-size: 12px;">Application Number</p>
                      <p style="color: #004883; margin: 0; font-size: 18px; font-weight: bold; font-family: monospace;">${applicationNumber}</p>
                    </div>
                    
                    <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 30px 0 0;">
                      God bless you,<br>
                      <strong>DUSOM Admissions Team</strong>
                    </p>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background-color: #004883; padding: 30px; text-align: center;">
                    <p style="color: rgba(255, 255, 255, 0.8); margin: 0; font-size: 14px;">
                      Dunamis School of Ministry, Abuja<br>
                      Airport Road, Area 1, Abuja, Nigeria
                    </p>
                    <p style="color: rgba(255, 255, 255, 0.6); margin: 15px 0 0; font-size: 12px;">
                      © ${new Date().getFullYear()} DUSOM Abuja. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  };
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, applicationId, newStatus }: EmailRequest = await req.json();

    // Validate required fields
    if (!type || !applicationId) {
      throw new Error("Missing required fields: type and applicationId");
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch application details
    const { data: application, error: fetchError } = await supabase
      .from("admission_applications")
      .select("*")
      .eq("id", applicationId)
      .single();

    if (fetchError || !application) {
      throw new Error(`Application not found: ${fetchError?.message}`);
    }

    // Check if we have an email to send to
    if (!application.email) {
      throw new Error("Application has no email address");
    }

    const applicantName = [application.first_name, application.last_name]
      .filter(Boolean)
      .join(" ") || "Applicant";
    
    const applicationNumber = application.application_number || "PENDING";

    let emailContent;
    if (type === "submission") {
      emailContent = getSubmissionEmail(applicantName, applicationNumber);
    } else if (type === "status_change" && newStatus) {
      emailContent = getStatusChangeEmail(applicantName, applicationNumber, newStatus);
    } else {
      throw new Error("Invalid email type or missing newStatus for status_change");
    }

    // Send email
    const emailResponse = await resend.emails.send({
      from: "DUSOM Admissions <noreply@dusomabuja.org>",
      to: [application.email],
      subject: emailContent.subject,
      html: emailContent.html,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-application-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
