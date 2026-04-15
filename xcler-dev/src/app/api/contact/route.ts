// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type ContactLead = {
  id: string;
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  formSource: string;
  pageUrl: string;
  createdAt: string;
  status: string;
  emailStatus: string;
  notificationEmailId: string | null;
  customerEmailId: string | null;
  emailError: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, service, budget, message, formSource, pageUrl } = body;

    // Validate
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Store lead in a JSON file (simple, free, works)
    const leadsDir = path.join(process.cwd(), "data");
    const leadsFile = path.join(leadsDir, "leads.json");

    // Create data directory if it doesn't exist
    if (!fs.existsSync(leadsDir)) {
      fs.mkdirSync(leadsDir, { recursive: true });
    }

    // Read existing leads
    let leads: ContactLead[] = [];
    if (fs.existsSync(leadsFile)) {
      const data = fs.readFileSync(leadsFile, "utf-8");
      leads = JSON.parse(data) as ContactLead[];
    }

    // Add new lead
    const newLead = {
      id: Date.now().toString(),
      name,
      email,
      company: company || "",
      service,
      budget: budget || "",
      message,
      formSource: formSource || "unknown",
      pageUrl: pageUrl || "unknown",
      createdAt: new Date().toISOString(),
      status: "new",
      emailStatus: "pending",
      notificationEmailId: null as string | null,
      customerEmailId: null as string | null,
      emailError: "",
    };

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://xcler.dev";
    let assetBaseUrl = siteUrl;

    try {
      if (pageUrl) {
        assetBaseUrl = new URL(String(pageUrl)).origin;
      } else {
        assetBaseUrl = new URL(request.url).origin;
      }
    } catch {
      assetBaseUrl = siteUrl;
    }

    const logoUrl = `${assetBaseUrl}/logo.png`;
    const ogImageUrl = `${assetBaseUrl}/og-image.webp`;
    const blogUrl = `${assetBaseUrl}/blog`;
    const workUrl = `${assetBaseUrl}/work`;
    const whatsappUrl = "https://wa.me/923154823517";

    const customerEmailAttachments: Array<{
      filename: string;
      content: string;
      content_type: string;
      content_id: string;
    }> = [];

    let customerLogoSrc = logoUrl;
    let customerHeroSrc = ogImageUrl;

    try {
      const logoPath = path.join(process.cwd(), "public", "logo-email.png");
      const ogPath = path.join(process.cwd(), "public", "og-image.webp");
      const logoBase64 = fs.readFileSync(logoPath).toString("base64");
      const ogBase64 = fs.readFileSync(ogPath).toString("base64");

      customerEmailAttachments.push(
        {
          filename: "logo-email.png",
          content: logoBase64,
          content_type: "image/png",
          content_id: "xcler-logo",
        },
        {
          filename: "og-image.webp",
          content: ogBase64,
          content_type: "image/webp",
          content_id: "xcler-og-image",
        }
      );

      customerLogoSrc = "cid:xcler-logo";
      customerHeroSrc = "cid:xcler-og-image";
    } catch (attachmentError) {
      console.error("Customer email inline image setup failed:", attachmentError);
    }

    const safeName = escapeHtml(String(name));
    const safeEmail = escapeHtml(String(email));
    const safeCompany = escapeHtml(String(company || "-"));
    const safeService = escapeHtml(String(service));
    const safeBudget = escapeHtml(String(budget || "-"));
    const safeMessage = escapeHtml(String(message));
    const safeFormSource = escapeHtml(String(formSource || "unknown"));
    const safePageUrl = escapeHtml(String(pageUrl || "unknown"));

    // Send email notification via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error("Missing RESEND_API_KEY in server environment.");
      newLead.emailStatus = "failed";
      newLead.emailError = "Missing RESEND_API_KEY";
      leads.push(newLead);
      fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2));
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 500 }
      );
    }

    const notificationResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Xcler notifications <notifications@xcler.dev>",
        to: ["notifications@xcler.dev"],
        subject: `New contact inquiry from ${name}`,
        reply_to: email,
        html: `
          <h2>New contact inquiry</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Company:</strong> ${safeCompany}</p>
          <p><strong>Service:</strong> ${safeService}</p>
          <p><strong>Budget:</strong> ${safeBudget}</p>
          <p><strong>Form source:</strong> ${safeFormSource}</p>
          <p><strong>Page URL:</strong> ${safePageUrl}</p>
          <p><strong>Message:</strong></p>
          <p>${safeMessage}</p>
        `,
      }),
    });

    if (!notificationResponse.ok) {
      const notificationError = await notificationResponse.text();
      console.error("Resend notification email error:", notificationError);
      newLead.emailStatus = "failed";
      newLead.emailError = notificationError;
      leads.push(newLead);
      fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2));
      return NextResponse.json(
        { error: "Failed to deliver notification email" },
        { status: 502 }
      );
    }

    const notificationData = (await notificationResponse.json()) as { id?: string };
    if (!notificationData?.id) {
      newLead.emailStatus = "failed";
      newLead.emailError = "Missing notification email id in Resend response";
      leads.push(newLead);
      fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2));
      return NextResponse.json(
        { error: "Email provider response was invalid" },
        { status: 502 }
      );
    }

    const customerHtml = `
      <div style="margin:0;padding:0;background:#f5f3ef;font-family:Arial,sans-serif;color:#1e1e1e;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:24px 0;">
          <tr>
            <td align="center">
              <table role="presentation" width="640" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #ece7df;">
                <tr>
                  <td style="padding:24px 28px;background:#faf8f4;border-bottom:1px solid #ece7df;">
                    <img src="${customerLogoSrc}" alt="XCLER" style="width:220px;max-width:100%;height:auto;display:block;" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src="${customerHeroSrc}" alt="XCLER" style="width:100%;height:auto;display:block;" />
                  </td>
                </tr>
                <tr>
                  <td style="padding:28px;">
                    <h2 style="margin:0 0 12px 0;font-size:28px;line-height:1.2;color:#111111;">You are in good hands, ${safeName}.</h2>
                    <p style="margin:0 0 16px 0;font-size:16px;line-height:1.65;color:#4a4a4a;">
                      Thank you for reaching out to XCLER. We received your inquiry successfully and our team is already reviewing your details.
                    </p>
                    <p style="margin:0 0 22px 0;font-size:16px;line-height:1.65;color:#4a4a4a;">
                      Expect a focused, practical reply within <strong>24 hours</strong> with clear next steps tailored to your goals.
                    </p>
                    <div style="margin:0 0 24px 0;padding:16px;border-radius:12px;background:#f8f6f2;border:1px solid #ece7df;">
                      <p style="margin:0 0 8px 0;font-size:14px;color:#6b5f52;"><strong>Your submitted details</strong></p>
                      <p style="margin:0 0 6px 0;font-size:14px;color:#3f3f3f;"><strong>Service:</strong> ${safeService}</p>
                      <p style="margin:0 0 6px 0;font-size:14px;color:#3f3f3f;"><strong>Budget:</strong> ${safeBudget}</p>
                      <p style="margin:0 0 6px 0;font-size:14px;color:#3f3f3f;"><strong>Company:</strong> ${safeCompany}</p>
                    </div>
                    <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 0 12px 0;">
                      <tr>
                        <td style="padding-right:10px;padding-bottom:10px;">
                          <a href="${blogUrl}" style="display:inline-block;background:#c7663c;color:#ffffff;text-decoration:none;padding:13px 20px;border-radius:999px;font-size:14px;font-weight:700;">Explore Winning AI Insights</a>
                        </td>
                        <td style="padding-right:10px;padding-bottom:10px;">
                          <a href="${workUrl}" style="display:inline-block;background:#ffffff;color:#c7663c;border:1px solid #c7663c;text-decoration:none;padding:12px 18px;border-radius:999px;font-size:14px;font-weight:700;">See Our Projects</a>
                        </td>
                        <td style="padding-bottom:10px;">
                          <a href="${whatsappUrl}" style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;padding:13px 18px;border-radius:999px;font-size:14px;font-weight:700;">WhatsApp Us Now</a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin:4px 0 0 0;font-size:13px;line-height:1.6;color:#6b6b6b;">Need an urgent response? Tap the WhatsApp button and our team will assist you directly.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    `;

    const customerResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Xcler notifications <notifications@xcler.dev>",
        to: [email],
        subject: "Your XCLER inquiry is in motion",
        html: customerHtml,
        attachments: customerEmailAttachments,
      }),
    });

    if (!customerResponse.ok) {
      const customerError = await customerResponse.text();
      console.error("Resend customer email error:", customerError);
      newLead.emailStatus = "failed";
      newLead.notificationEmailId = notificationData.id;
      newLead.emailError = customerError;
      leads.push(newLead);
      fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2));
      return NextResponse.json(
        { error: "Failed to deliver customer confirmation email" },
        { status: 502 }
      );
    }

    const customerData = (await customerResponse.json()) as { id?: string };
    if (!customerData?.id) {
      newLead.emailStatus = "failed";
      newLead.notificationEmailId = notificationData.id;
      newLead.emailError = "Missing customer email id in Resend response";
      leads.push(newLead);
      fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2));
      return NextResponse.json(
        { error: "Customer email response was invalid" },
        { status: 502 }
      );
    }

    newLead.emailStatus = "sent";
    newLead.notificationEmailId = notificationData.id;
    newLead.customerEmailId = customerData.id;
    leads.push(newLead);

    // Save final lead with delivery metadata
    fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2));

    // TODO: Send WhatsApp notification (add later)

    return NextResponse.json(
      {
        success: true,
        message: "Lead captured successfully",
        emailId: notificationData.id,
        customerEmailId: customerData.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}