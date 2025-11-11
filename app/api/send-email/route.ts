import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email to you (sam@voltaminelectric.com)
    const adminEmailResponse = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "mohsenamini1081@gmail.com",
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; background: linear-gradient(135deg, #f3f4f6 0%, #ffffff 100%); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%); border-radius: 16px 16px 0 0; padding: 40px 20px; text-align: center; box-shadow: 0 10px 30px rgba(59, 130, 246, 0.2);">
                <div style="font-size: 32px; margin-bottom: 10px;">⚡</div>
                <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">New Contact Form Submission</h1>
                <p style="margin: 8px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px;">VOLTAMIN ELECTRIC</p>
              </div>

              <!-- Content Card -->
              <div style="background: #ffffff; border-radius: 0 0 16px 16px; padding: 40px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);">
                <!-- Contact Info Grid -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
                  <div style="background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%); padding: 20px; border-radius: 12px; border-left: 4px solid #3B82F6;">
                    <p style="margin: 0; color: #666; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">👤 Name</p>
                    <p style="margin: 8px 0 0 0; color: #1f2937; font-size: 16px; font-weight: 700;">${name}</p>
                  </div>
                  <div style="background: linear-gradient(135deg, #F3E8FF 0%, #E9D5FF 100%); padding: 20px; border-radius: 12px; border-left: 4px solid #A855F7;">
                    <p style="margin: 0; color: #666; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">📧 Email</p>
                    <p style="margin: 8px 0 0 0; color: #1f2937; font-size: 16px; font-weight: 700;"><a href="mailto:${email}" style="color: #3B82F6; text-decoration: none;">${email}</a></p>
                  </div>
                  ${
                    phone
                      ? `<div style="background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%); padding: 20px; border-radius: 12px; border-left: 4px solid #F59E0B;">
                           <p style="margin: 0; color: #666; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">📱 Phone</p>
                           <p style="margin: 8px 0 0 0; color: #1f2937; font-size: 16px; font-weight: 700;">${phone}</p>
                         </div>`
                      : ""
                  }
                  <div style="background: linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%); padding: 20px; border-radius: 12px; border-left: 4px solid #0EA5E9;">
                    <p style="margin: 0; color: #666; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">📅 Date</p>
                    <p style="margin: 8px 0 0 0; color: #1f2937; font-size: 16px; font-weight: 700;">${new Date().toLocaleDateString()}</p>
                  </div>
                </div>

                <!-- Message Section -->
                <div style="margin-bottom: 30px;">
                  <h2 style="margin: 0 0 15px 0; color: #1f2937; font-size: 18px; font-weight: 700;">📝 Message</h2>
                  <div style="background: linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%); padding: 24px; border-radius: 12px; border: 1px solid #E5E7EB; white-space: pre-wrap; line-height: 1.6; color: #374151; font-size: 15px;">
                    ${message}
                  </div>
                </div>

                <!-- Action Button -->
                <div style="text-align: center; margin-bottom: 30px;">
                  <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%); color: #ffffff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3); transition: transform 0.2s;">
                    Reply to ${name}
                  </a>
                </div>

                <!-- Footer -->
                <div style="border-top: 1px solid #E5E7EB; padding-top: 20px; text-align: center;">
                  <p style="margin: 0; color: #666; font-size: 13px; line-height: 1.6;">
                    <strong style="color: #1f2937;">Quick Info:</strong><br>
                    💬 WhatsApp: <a href="https://wa.me/18186992255" style="color: #3B82F6; text-decoration: none;">+1-818-699-2255</a><br>
                    🌐 Website: <a href="https://voltaminelectric.com" style="color: #3B82F6; text-decoration: none;">voltaminelectric.com</a>
                  </p>
                </div>
              </div>

              <!-- Bottom Badge -->
              <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
                <p style="margin: 0;">Automated message from VOLTAMIN ELECTRIC contact form • Do not reply to this email</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (adminEmailResponse.error) {
      console.error("Error sending admin email:", adminEmailResponse.error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 500 }
      );
    }

    // Confirmation email to user
    try {
      await resend.emails.send({
        from: "VOLTAMIN ELECTRIC <mohsenamini1081@gmail.com>",
        to: email,
        subject: "We received your message!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #3B82F6;">Thank You for Contacting VOLTAMIN ELECTRIC!</h2>
            <p>Hi ${name},</p>
            <p>We have received your message and will get back to you as soon as possible.</p>
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Your Message:</strong></p>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
            <p>Our team will review your inquiry and contact you shortly.</p>
            <p>
              <strong>Contact Information:</strong><br>
              📧 Email: sam@voltaminelectric.com<br>
              📱 Phone: +1-818-699-2255<br>
              💬 WhatsApp: +1-818-699-2255
            </p>
            <p style="color: #666; font-size: 12px; margin-top: 20px;">
              Best regards,<br>
              <strong>Saeid Amini - VOLTAMIN ELECTRIC</strong><br>
              Professional Electrical Specialist
            </p>
          </div>
        `,
      });
    } catch (confirmationError) {
      // Log confirmation email error but don't fail the submission
      console.error("Error sending confirmation email:", confirmationError);
    }

    // Log the successful submission
    console.log("Email submitted successfully:", { name, email, phone });

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message:
          "Your message has been sent successfully! We will contact you soon.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Failed to process your request. Please try again later." },
      { status: 500 }
    );
  }
}
