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

    // TODO: Send email notification via Resend (add later)
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