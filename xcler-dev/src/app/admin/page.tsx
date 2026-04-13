// src/app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/leads")
      .then((res) => res.json())
      .then((data) => setLeads(data.leads || []))
      .catch(() => {});
  }, []);

  const newLeads = leads.filter((l) => l.status === "new").length;

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold">Dashboard</h1>
      <p className="mt-2 text-richblack/50 dark:text-cream/50">
        Welcome back, Musharraf. Here&apos;s your overview.
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-stone/10 dark:border-stone-dark/10 p-6">
          <p className="text-sm text-richblack/40 dark:text-cream/40">
            Total Leads
          </p>
          <p className="mt-2 font-heading text-3xl font-bold">
            {leads.length}
          </p>
        </div>
        <div className="rounded-xl border border-stone/10 dark:border-stone-dark/10 p-6">
          <p className="text-sm text-richblack/40 dark:text-cream/40">
            New Leads
          </p>
          <p className="mt-2 font-heading text-3xl font-bold text-terracotta">
            {newLeads}
          </p>
        </div>
        <div className="rounded-xl border border-stone/10 dark:border-stone-dark/10 p-6">
          <p className="text-sm text-richblack/40 dark:text-cream/40">
            Projects
          </p>
          <p className="mt-2 font-heading text-3xl font-bold">4</p>
        </div>
        <div className="rounded-xl border border-stone/10 dark:border-stone-dark/10 p-6">
          <p className="text-sm text-richblack/40 dark:text-cream/40">
            Blog Posts
          </p>
          <p className="mt-2 font-heading text-3xl font-bold">0</p>
        </div>
      </div>

      {/* Recent Leads */}
      <div className="mt-10">
        <h2 className="font-heading text-xl font-semibold mb-4">
          Recent Leads
        </h2>
        {leads.length === 0 ? (
          <p className="text-richblack/40 dark:text-cream/40 text-sm">
            No leads yet. Your first lead will appear here.
          </p>
        ) : (
          <div className="space-y-3">
            {leads
              .slice(-5)
              .reverse()
              .map((lead: any) => (
                <div
                  key={lead.id}
                  className="rounded-xl border border-stone/10 dark:border-stone-dark/10 p-4 flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{lead.name}</p>
                    <p className="text-sm text-richblack/50 dark:text-cream/50">
                      {lead.service} • {lead.budget || "No budget specified"}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs ${
                        lead.status === "new"
                          ? "bg-terracotta/10 text-terracotta"
                          : "bg-sage/10 text-sage"
                      }`}
                    >
                      {lead.status}
                    </span>
                    <p className="text-xs text-richblack/30 dark:text-cream/30 mt-1">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}