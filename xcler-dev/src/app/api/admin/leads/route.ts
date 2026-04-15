// src/app/api/admin/leads/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type LeadStatus = "new" | "contacted" | "closed" | string;

type LeadRecord = {
  id: string;
  status: LeadStatus;
  [key: string]: unknown;
};

export async function GET() {
  try {
    const leadsFile = path.join(process.cwd(), "data", "leads.json");

    if (!fs.existsSync(leadsFile)) {
      return NextResponse.json({ leads: [] });
    }

    const data = fs.readFileSync(leadsFile, "utf-8");
    const leads = JSON.parse(data) as LeadRecord[];

    return NextResponse.json({ leads });
  } catch {
    return NextResponse.json({ leads: [] });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, status } = (await request.json()) as { id?: string; status?: LeadStatus };
    const leadsFile = path.join(process.cwd(), "data", "leads.json");

    if (!id || !status) {
      return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
    }

    if (!fs.existsSync(leadsFile)) {
      return NextResponse.json({ error: "No leads found" }, { status: 404 });
    }

    const data = fs.readFileSync(leadsFile, "utf-8");
    const leads = JSON.parse(data) as LeadRecord[];

    const leadIndex = leads.findIndex((l) => l.id === id);
    if (leadIndex === -1) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    leads[leadIndex].status = status;
    fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = (await request.json()) as { id?: string };
    const leadsFile = path.join(process.cwd(), "data", "leads.json");

    if (!fs.existsSync(leadsFile)) {
      return NextResponse.json({ error: "No leads found" }, { status: 404 });
    }

    const data = fs.readFileSync(leadsFile, "utf-8");
    let leads = JSON.parse(data) as LeadRecord[];

    leads = leads.filter((l) => l.id !== id);
    fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}