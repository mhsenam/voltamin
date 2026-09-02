import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/config/site.config";

// Constructed per request — building the client at module scope throws
// during `next build` whenever RESEND_API_KEY is absent from the environment.
const getResend = () => {
  const apiKey = process.env.RESEND_API_KEY;
  return apiKey ? new Resend(apiKey) : null;
};

export const dynamic = "force-dynamic";

const { business } = siteConfig;

const NAVY = "#0D1728";
const GOLD = "#E9A621";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const row = (label: string, value: string) => `
  <tr>
    <td style="padding:10px 0;border-bottom:1px solid #E6EAF0;width:130px;font:600 11px/1.4 Helvetica,Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#6B7A90;vertical-align:top;">${label}</td>
    <td style="padding:10px 0;border-bottom:1px solid #E6EAF0;font:400 14px/1.5 Helvetica,Arial,sans-serif;color:${NAVY};">${value}</td>
  </tr>`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name = "",
      email = "",
      phone = "",
      city = "",
      service = "",
      message = "",
    } = body ?? {};

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please fill in your name, email, and project details." },
        { status: 400 }
      );
    }

    const resend = getResend();
    if (!resend) {
      console.error("RESEND_API_KEY is not configured.");
      return NextResponse.json(
        {
          error: `Email is not configured right now. Please call ${business.phone}.`,
        },
        { status: 503 }
      );
    }

    const safe = {
      name: escapeHtml(String(name)),
      email: escapeHtml(String(email)),
      phone: escapeHtml(String(phone)),
      city: escapeHtml(String(city)),
      service: escapeHtml(String(service)),
      message: escapeHtml(String(message)),
    };

    const adminEmail = await resend.emails.send({
      from: `${business.name} <noreply@voltaminelectric.com>`,
      to: business.email,
      replyTo: safe.email,
      subject: `New estimate request — ${safe.name}${
        safe.service ? ` (${safe.service})` : ""
      }`,
      html: `
        <div style="margin:0;padding:24px;background:#F2F5F9;">
          <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:6px;overflow:hidden;border:1px solid #E6EAF0;">
            <div style="background:${NAVY};padding:28px 32px;">
              <p style="margin:0;font:700 13px/1 Helvetica,Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#ffffff;">Voltamin Electric</p>
              <p style="margin:8px 0 0;font:600 20px/1.3 Helvetica,Arial,sans-serif;color:${GOLD};">New estimate request</p>
            </div>

            <div style="padding:28px 32px;">
              <table style="width:100%;border-collapse:collapse;">
                ${row("Name", safe.name)}
                ${row(
                  "Email",
                  `<a href="mailto:${safe.email}" style="color:${NAVY};">${safe.email}</a>`
                )}
                ${safe.phone ? row("Phone", `<a href="tel:${safe.phone}" style="color:${NAVY};">${safe.phone}</a>`) : ""}
                ${safe.service ? row("Service", safe.service) : ""}
                ${safe.city ? row("City", safe.city) : ""}
                ${row("Received", new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" }))}
              </table>

              <p style="margin:26px 0 8px;font:600 11px/1.4 Helvetica,Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#6B7A90;">Project details</p>
              <div style="padding:16px;background:#F2F5F9;border-left:3px solid ${GOLD};font:400 14px/1.6 Helvetica,Arial,sans-serif;color:${NAVY};white-space:pre-wrap;">${safe.message}</div>

              <a href="mailto:${safe.email}" style="display:inline-block;margin-top:24px;padding:12px 24px;background:${GOLD};color:${NAVY};border-radius:5px;text-decoration:none;font:700 14px/1 Helvetica,Arial,sans-serif;">Reply to ${safe.name}</a>
            </div>

            <div style="padding:18px 32px;border-top:1px solid #E6EAF0;font:400 12px/1.6 Helvetica,Arial,sans-serif;color:#6B7A90;">
              Sent from the contact form at voltaminelectric.com
            </div>
          </div>
        </div>
      `,
    });

    if (adminEmail.error) {
      console.error("Error sending admin email:", adminEmail.error);
      return NextResponse.json(
        { error: "Could not send your message. Please call instead." },
        { status: 500 }
      );
    }

    // Confirmation to the customer — failure here should not fail the request
    try {
      await resend.emails.send({
        from: `${business.name} <${business.email}>`,
        to: safe.email,
        subject: "I received your request — Voltamin Electric",
        html: `
          <div style="margin:0;padding:24px;background:#F2F5F9;">
            <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:6px;overflow:hidden;border:1px solid #E6EAF0;">
              <div style="background:${NAVY};padding:26px 30px;">
                <p style="margin:0;font:700 13px/1 Helvetica,Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#ffffff;">Voltamin Electric</p>
              </div>
              <div style="padding:28px 30px;font:400 15px/1.65 Helvetica,Arial,sans-serif;color:${NAVY};">
                <p style="margin:0 0 14px;">Hi ${safe.name},</p>
                <p style="margin:0 0 14px;">Thanks for reaching out. I have received your request and will get back to you shortly to arrange your free, no-obligation service call.</p>
                <p style="margin:0 0 8px;font:600 11px/1.4 Helvetica,Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#6B7A90;">What you sent</p>
                <div style="padding:14px;background:#F2F5F9;border-left:3px solid ${GOLD};white-space:pre-wrap;font-size:14px;">${safe.message}</div>
                <p style="margin:22px 0 4px;">If it is urgent, call or text me directly:</p>
                <p style="margin:0;font:700 17px/1.3 Helvetica,Arial,sans-serif;"><a href="tel:${business.phoneRaw}" style="color:${NAVY};text-decoration:none;">${business.phone}</a></p>
                <p style="margin:22px 0 0;font-size:14px;color:#6B7A90;">
                  ${business.owner} — ${business.name}<br/>
                  ${business.licenseClass} Licensed &amp; Insured · CSLB #${business.license}
                </p>
              </div>
            </div>
          </div>
        `,
      });
    } catch (confirmationError) {
      console.error("Error sending confirmation email:", confirmationError);
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Thanks — your request is in. I will be in touch shortly to arrange your free service call.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or call." },
      { status: 500 }
    );
  }
}
