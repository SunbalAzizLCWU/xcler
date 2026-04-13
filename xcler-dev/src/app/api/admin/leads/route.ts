// src/app/api/admin/leads/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const leadsFile = path.join(process.cwd(), "data", "leads.json");

    if (!fs.existsSync(leadsFile)) {
      return NextResponse.json({ leads: [] });
    }

    const data = fs.readFileSync(leadsFile, "utf-8");
    const leads = JSON.parse(data);

    return NextResponse.json({ leads });
  } catch (error) {
    return NextResponse.json({ leads: [] });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, status } = await request.json();
    const leadsFile = path.join(process.cwd(), "data", "leads.json");

    if (!fs.existsSync(leadsFile)) {
      return NextResponse.json({ error: "No leads found" }, { status: 404 });
    }

    const data = fs.readFileSync(leadsFile, "utf-8");
    const leads = JSON.parse(data);

    const leadIndex = leads.findIndex((l: any) => l.id === id);
    if (leadIndex === -1) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    leads[leadIndex].status = status;
    fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const leadsFile = path.join(process.cwd(), "data", "leads.json");

    if (!fs.existsSync(leadsFile)) {
      return NextResponse.json({ error: "No leads found" }, { status: 404 });
    }

    const data = fs.readFileSync(leadsFile, "utf-8");
    let leads = JSON.parse(data);

    leads = leads.filter((l: any) => l.id !== id);
    fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}