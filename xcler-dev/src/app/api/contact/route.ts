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

/** Team inboxes that must receive every new lead. */
const TEAM_NOTIFICATION_TO = [
  "notifications@xcler.dev",
  "musharraf@xcler.dev",
  "hello@xcler.dev",
  "musharrafaziz@outlook.com",
] as const;

// Signal brand — high-contrast email palette (WCAG-friendly on light body)
const C = {
  ink: "#07080c",
  charcoal: "#12141a",
  cream: "#f2f4f7",
  creamMuted: "#d8dce3",
  text: "#0c0e12",
  textSecondary: "#2a2f3a",
  border: "#d5dae3",
  panel: "#eef1f5",
  terracotta: "#e64516",
  sage: "#0f9f5c",
  white: "#ffffff",
} as const;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Vercel/serverless filesystems are read-only — never fail a successful email on write. */
function persistLead(lead: ContactLead) {
  try {
    const leadsDir = path.join(process.cwd(), "data");
    const leadsFile = path.join(leadsDir, "leads.json");

    if (!fs.existsSync(leadsDir)) {
      fs.mkdirSync(leadsDir, { recursive: true });
    }

    let leads: ContactLead[] = [];
    if (fs.existsSync(leadsFile)) {
      const data = fs.readFileSync(leadsFile, "utf-8");
      leads = JSON.parse(data) as ContactLead[];
    }

    leads.push(lead);
    fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2));
    return true;
  } catch (error) {
    console.error("Lead file persistence skipped (expected on serverless):", error);
    return false;
  }
}

function buildCustomerConfirmationHtml({
  safeName,
  safeService,
  safeBudget,
  safeCompany,
  safeMessage,
  logoSrc,
  siteUrl,
  blogUrl,
  workUrl,
  contactUrl,
  whatsappUrl,
}: {
  safeName: string;
  safeService: string;
  safeBudget: string;
  safeCompany: string;
  safeMessage: string;
  logoSrc: string;
  siteUrl: string;
  blogUrl: string;
  workUrl: string;
  contactUrl: string;
  whatsappUrl: string;
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <title>We received your message — XCLER</title>
</head>
<body style="margin:0;padding:0;background:${C.panel};font-family:Arial,Helvetica,sans-serif;color:${C.text};-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:28px 12px;background:${C.panel};">
    <tr>
      <td align="center">
        <table role="presentation" width="640" cellspacing="0" cellpadding="0" style="max-width:640px;width:100%;background:${C.white};border:1px solid ${C.border};">
          <!-- Header -->
          <tr>
            <td style="padding:28px 32px;background:${C.ink};">
              <img src="${logoSrc}" alt="XCLER" width="180" style="width:180px;max-width:55%;height:auto;display:block;" />
              <p style="margin:18px 0 0 0;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:${C.creamMuted};font-family:Georgia,serif;">
                AI automation · Chatbots · Workflows
              </p>
            </td>
          </tr>
          <!-- Accent bar -->
          <tr>
            <td style="height:4px;background:linear-gradient(90deg,${C.sage},${C.terracotta});font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:36px 32px 28px 32px;background:${C.white};">
              <h1 style="margin:0 0 14px 0;font-size:28px;line-height:1.25;font-weight:700;color:${C.ink};">
                Thanks, ${safeName} — we got your message.
              </h1>
              <p style="margin:0 0 16px 0;font-size:16px;line-height:1.7;color:${C.textSecondary};">
                Your inquiry reached the XCLER team. We review every request personally and will reply with clear next steps within <strong style="color:${C.ink};">24 hours</strong>.
              </p>
              <p style="margin:0 0 28px 0;font-size:16px;line-height:1.7;color:${C.textSecondary};">
                No spam, no generic decks — just a practical response tailored to what you submitted.
              </p>

              <!-- Summary card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 28px 0;background:${C.panel};border:1px solid ${C.border};">
                <tr>
                  <td style="padding:20px 22px;">
                    <p style="margin:0 0 14px 0;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;font-weight:700;color:${C.ink};">
                      Your submission
                    </p>
                    <p style="margin:0 0 10px 0;font-size:15px;line-height:1.55;color:${C.text};">
                      <strong style="color:${C.ink};">Service:</strong> ${safeService}
                    </p>
                    <p style="margin:0 0 10px 0;font-size:15px;line-height:1.55;color:${C.text};">
                      <strong style="color:${C.ink};">Budget:</strong> ${safeBudget}
                    </p>
                    <p style="margin:0 0 10px 0;font-size:15px;line-height:1.55;color:${C.text};">
                      <strong style="color:${C.ink};">Company:</strong> ${safeCompany}
                    </p>
                    <p style="margin:0 0 6px 0;font-size:15px;line-height:1.55;color:${C.text};">
                      <strong style="color:${C.ink};">Message:</strong>
                    </p>
                    <p style="margin:0;font-size:15px;line-height:1.65;color:${C.textSecondary};white-space:pre-wrap;">${safeMessage}</p>
                  </td>
                </tr>
              </table>

              <!-- CTAs -->
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 0 8px 0;">
                <tr>
                  <td style="padding:0 10px 12px 0;">
                    <a href="${whatsappUrl}" style="display:inline-block;background:${C.sage};color:${C.ink};text-decoration:none;padding:14px 22px;font-size:14px;font-weight:700;border:1px solid ${C.sage};">
                      WhatsApp us
                    </a>
                  </td>
                  <td style="padding:0 10px 12px 0;">
                    <a href="${workUrl}" style="display:inline-block;background:${C.terracotta};color:${C.ink};text-decoration:none;padding:14px 22px;font-size:14px;font-weight:700;border:1px solid ${C.terracotta};">
                      View our work
                    </a>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding:0 0 4px 0;">
                    <a href="${blogUrl}" style="display:inline-block;background:${C.white};color:${C.ink};text-decoration:none;padding:13px 20px;font-size:14px;font-weight:700;border:2px solid ${C.ink};">
                      Read insights
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:22px 0 0 0;font-size:14px;line-height:1.65;color:${C.textSecondary};">
                Prefer email? Reply to this message or write us at
                <a href="mailto:hello@xcler.dev" style="color:${C.ink};font-weight:700;text-decoration:underline;">hello@xcler.dev</a>.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:22px 32px;background:${C.charcoal};border-top:1px solid ${C.ink};">
              <p style="margin:0 0 8px 0;font-size:13px;line-height:1.5;color:${C.cream};font-weight:700;">
                XCLER — AI automation for chatbots, agents &amp; workflows
              </p>
              <p style="margin:0 0 10px 0;font-size:12px;line-height:1.55;color:${C.creamMuted};">
                Berlin · DACH · Benelux · Remote US
              </p>
              <p style="margin:0;font-size:12px;line-height:1.55;">
                <a href="${siteUrl}" style="color:${C.cream};text-decoration:underline;">xcler.dev</a>
                &nbsp;·&nbsp;
                <a href="${contactUrl}" style="color:${C.cream};text-decoration:underline;">Contact</a>
              </p>
            </td>
          </tr>
        </table>
        <p style="margin:16px 0 0 0;font-size:11px;line-height:1.5;color:#5a6170;max-width:640px;">
          You received this email because you submitted the contact form on xcler.dev. If this wasn’t you, you can ignore this message.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildTeamNotificationHtml({
  safeName,
  safeEmail,
  safeCompany,
  safeService,
  safeBudget,
  safeMessage,
  safeFormSource,
  safePageUrl,
}: {
  safeName: string;
  safeEmail: string;
  safeCompany: string;
  safeService: string;
  safeBudget: string;
  safeMessage: string;
  safeFormSource: string;
  safePageUrl: string;
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" /><title>New XCLER lead</title></head>
<body style="margin:0;padding:24px;background:${C.panel};font-family:Arial,Helvetica,sans-serif;color:${C.text};">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:0 auto;background:${C.white};border:1px solid ${C.border};">
    <tr>
      <td style="padding:20px 24px;background:${C.ink};">
        <p style="margin:0;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:${C.creamMuted};">New lead</p>
        <h1 style="margin:8px 0 0 0;font-size:22px;color:${C.cream};">Contact inquiry from ${safeName}</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:24px;">
        <p style="margin:0 0 10px 0;font-size:15px;color:${C.text};"><strong>Name:</strong> ${safeName}</p>
        <p style="margin:0 0 10px 0;font-size:15px;color:${C.text};"><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color:${C.ink};">${safeEmail}</a></p>
        <p style="margin:0 0 10px 0;font-size:15px;color:${C.text};"><strong>Company:</strong> ${safeCompany}</p>
        <p style="margin:0 0 10px 0;font-size:15px;color:${C.text};"><strong>Service:</strong> ${safeService}</p>
        <p style="margin:0 0 10px 0;font-size:15px;color:${C.text};"><strong>Budget:</strong> ${safeBudget}</p>
        <p style="margin:0 0 10px 0;font-size:15px;color:${C.text};"><strong>Form source:</strong> ${safeFormSource}</p>
        <p style="margin:0 0 16px 0;font-size:15px;color:${C.text};"><strong>Page URL:</strong> ${safePageUrl}</p>
        <p style="margin:0 0 6px 0;font-size:15px;color:${C.ink};"><strong>Message</strong></p>
        <p style="margin:0;padding:14px;background:${C.panel};border:1px solid ${C.border};font-size:15px;line-height:1.6;color:${C.textSecondary};white-space:pre-wrap;">${safeMessage}</p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, service, budget, message, formSource, pageUrl } = body;

    if (!name || !email || !service || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newLead: ContactLead = {
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
      notificationEmailId: null,
      customerEmailId: null,
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

    const logoUrl = `${assetBaseUrl}/logo-email.png`;
    const blogUrl = `${assetBaseUrl}/blog`;
    const workUrl = `${assetBaseUrl}/work`;
    const contactUrl = `${assetBaseUrl}/contact`;
    const whatsappUrl = "https://wa.me/923154823517";

    const customerEmailAttachments: Array<{
      filename: string;
      content: string;
      content_type: string;
      content_id: string;
    }> = [];

    let customerLogoSrc = logoUrl;

    try {
      const logoPath = path.join(process.cwd(), "public", "logo-email.png");
      const logoBase64 = fs.readFileSync(logoPath).toString("base64");
      customerEmailAttachments.push({
        filename: "logo-email.png",
        content: logoBase64,
        content_type: "image/png",
        content_id: "xcler-logo",
      });
      customerLogoSrc = "cid:xcler-logo";
    } catch (attachmentError) {
      console.error("Customer email inline logo setup failed:", attachmentError);
    }

    const safeName = escapeHtml(String(name));
    const safeEmail = escapeHtml(String(email));
    const safeCompany = escapeHtml(String(company || "-"));
    const safeService = escapeHtml(String(service));
    const safeBudget = escapeHtml(String(budget || "-"));
    const safeMessage = escapeHtml(String(message));
    const safeFormSource = escapeHtml(String(formSource || "unknown"));
    const safePageUrl = escapeHtml(String(pageUrl || "unknown"));

    const resendApiKey = process.env.RESEND_API_KEY?.replace(/^RESEND_API_KEY=/i, "").trim();
    if (!resendApiKey) {
      console.error("Missing RESEND_API_KEY in server environment.");
      newLead.emailStatus = "failed";
      newLead.emailError = "Missing RESEND_API_KEY";
      persistLead(newLead);
      return NextResponse.json({ error: "Email service is not configured" }, { status: 500 });
    }

    const notificationResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "XCLER Leads <notifications@xcler.dev>",
        to: [...TEAM_NOTIFICATION_TO],
        subject: `New lead: ${name} — ${service}`,
        reply_to: email,
        html: buildTeamNotificationHtml({
          safeName,
          safeEmail,
          safeCompany,
          safeService,
          safeBudget,
          safeMessage,
          safeFormSource,
          safePageUrl,
        }),
      }),
    });

    if (!notificationResponse.ok) {
      const notificationError = await notificationResponse.text();
      console.error("Resend notification email error:", notificationError);
      newLead.emailStatus = "failed";
      newLead.emailError = notificationError;
      persistLead(newLead);
      return NextResponse.json({ error: "Failed to deliver notification email" }, { status: 502 });
    }

    const notificationData = (await notificationResponse.json()) as { id?: string };
    if (!notificationData?.id) {
      newLead.emailStatus = "failed";
      newLead.emailError = "Missing notification email id in Resend response";
      persistLead(newLead);
      return NextResponse.json({ error: "Email provider response was invalid" }, { status: 502 });
    }

    const customerHtml = buildCustomerConfirmationHtml({
      safeName,
      safeService,
      safeBudget,
      safeCompany,
      safeMessage,
      logoSrc: customerLogoSrc,
      siteUrl: assetBaseUrl,
      blogUrl,
      workUrl,
      contactUrl,
      whatsappUrl,
    });

    const customerPayload: Record<string, unknown> = {
      // Use verified notifications sender; reply goes to hello@
      from: "XCLER <notifications@xcler.dev>",
      to: [email],
      subject: `Thanks ${name} — we received your XCLER inquiry`,
      reply_to: "hello@xcler.dev",
      html: customerHtml,
    };

    if (customerEmailAttachments.length > 0) {
      customerPayload.attachments = customerEmailAttachments;
    }

    const customerResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerPayload),
    });

    let customerEmailId: string | null = null;
    let customerEmailError = "";

    if (!customerResponse.ok) {
      customerEmailError = await customerResponse.text();
      console.error("Resend customer email error:", customerEmailError);
      newLead.emailStatus = "notification_sent";
      newLead.notificationEmailId = notificationData.id;
      newLead.customerEmailId = null;
      newLead.emailError = customerEmailError;
      persistLead(newLead);
      return NextResponse.json(
        {
          error: "Team notified, but customer confirmation email failed. Please retry or email hello@xcler.dev.",
          emailId: notificationData.id,
        },
        { status: 502 }
      );
    }

    const customerData = (await customerResponse.json()) as { id?: string };
    if (!customerData?.id) {
      customerEmailError = "Missing customer email id in Resend response";
      console.error(customerEmailError);
      newLead.emailStatus = "notification_sent";
      newLead.notificationEmailId = notificationData.id;
      newLead.emailError = customerEmailError;
      persistLead(newLead);
      return NextResponse.json(
        {
          error: "Team notified, but customer confirmation email failed. Please retry.",
          emailId: notificationData.id,
        },
        { status: 502 }
      );
    }

    customerEmailId = customerData.id;
    newLead.emailStatus = "sent";
    newLead.notificationEmailId = notificationData.id;
    newLead.customerEmailId = customerEmailId;
    newLead.emailError = "";
    persistLead(newLead);

    return NextResponse.json(
      {
        success: true,
        message: "Lead captured successfully",
        emailId: notificationData.id,
        customerEmailId,
        customerEmailDelivered: true,
        teamNotified: TEAM_NOTIFICATION_TO,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
