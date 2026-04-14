// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, service, budget, message } = body;

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
    let leads: any[] = [];
    if (fs.existsSync(leadsFile)) {
      const data = fs.readFileSync(leadsFile, "utf-8");
      leads = JSON.parse(data);
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
      createdAt: new Date().toISOString(),
      status: "new",
    };

    leads.push(newLead);

    // Save
    fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2));

    // Send email notification via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Xcler notifications <notifications@xcler.dev>",
          to: ["hello@xcler.dev"],
          subject: `New contact inquiry from ${name}`,
          reply_to: email,
          html: `
            <h2>New contact inquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company || "-"}</p>
            <p><strong>Service:</strong> ${service}</p>
            <p><strong>Budget:</strong> ${budget || "-"}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `,
        }),
      });

      if (!resendResponse.ok) {
        const resendError = await resendResponse.text();
        console.error("Resend error:", resendError);
      }
    }

    // TODO: Send WhatsApp notification (add later)

    return NextResponse.json(
      { success: true, message: "Lead captured successfully" },
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