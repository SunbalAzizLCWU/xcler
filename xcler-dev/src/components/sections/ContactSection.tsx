"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const budgetRanges = [
  "€150 – €500",
  "€500 – €2,000",
  "€2,000 – €5,000",
  "€5,000 – €10,000",
  "€10,000+",
];

const serviceOptions = [
  "Website Development",
  "App Development",
  "WordPress / Shopify",
  "Workflow Automation",
  "AI Chatbot / Agent",
  "Other",
];

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // For now, we'll use a simple API route
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          company: "",
          service: "",
          budget: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="section-padding bg-cream dark:bg-richblack" id="contact">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left */}
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-4">
              <div className="line-decoration" />
              <span className="font-mono text-xs tracking-[0.3em] text-richblack/40 dark:text-cream/40 uppercase">
                Start a Project
              </span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-richblack dark:text-white">
              Let&apos;s build
              <br />
              <span className="text-terracotta">something together.</span>
            </h2>
            <p className="mt-4 text-lg text-richblack/70 dark:text-gray-200 max-w-md">
              Fill out the form. We&apos;ll get back to you within 24 hours
              via WhatsApp or email. No sales pitch — just a real
              conversation about your project.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone/10 dark:bg-stone-dark/10">
                  <svg
                    className="h-5 w-5 text-terracotta"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-richblack/60 dark:text-gray-300">
                    Email
                  </p>
                  <a
                    href="mailto:hello@xcler.dev"
                    className="font-medium text-richblack dark:text-white hover:text-terracotta transition-colors"
                  >
                    hello@xcler.dev
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone/10 dark:bg-stone-dark/10">
                  <svg
                    className="h-5 w-5 text-terracotta"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-richblack/60 dark:text-gray-300">
                    WhatsApp
                  </p>
                  <a
                    href="https://wa.me/923154823517"
                    className="font-medium text-richblack dark:text-white hover:text-terracotta transition-colors"
                  >
                    +92 315 4823517
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone/10 dark:bg-stone-dark/10">
                  <svg
                    className="h-5 w-5 text-terracotta"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-richblack/60 dark:text-gray-300">
                    Location
                  </p>
                  <p className="font-medium text-richblack dark:text-white">Serving Germany & EU</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right: Form */}
          <AnimatedSection delay={0.2}>
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex h-full items-center justify-center rounded-2xl border border-sage/20 bg-sage/5 p-12 text-center"
              >
                <div>
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-sage/20">
                    <svg
                      className="h-8 w-8 text-sage"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-richblack dark:text-cream">
                    Message sent!
                  </h3>
                    <p className="mt-2 text-richblack/65 dark:text-cream/75">
                    We&apos;ll get back to you within 24 hours. Check your
                    WhatsApp or email.
                  </p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2 text-richblack dark:text-cream"
                  >
                    Your Name <span className="text-terracotta">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-stone/20 dark:border-stone-dark/20 bg-transparent px-4 py-3 font-body text-sm outline-none transition-all focus:border-terracotta focus:ring-1 focus:ring-terracotta/20 placeholder:text-richblack/30 dark:placeholder:text-cream/30"
                    placeholder="John Müller"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2 text-richblack dark:text-cream"
                  >
                    Email <span className="text-terracotta">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-stone/20 dark:border-stone-dark/20 bg-transparent px-4 py-3 font-body text-sm outline-none transition-all focus:border-terracotta focus:ring-1 focus:ring-terracotta/20 placeholder:text-richblack/30 dark:placeholder:text-cream/30"
                    placeholder="john@company.de"
                  />
                </div>

                {/* Company */}
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium mb-2 text-richblack dark:text-cream"
                  >
                    Company / Website
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-stone/20 dark:border-stone-dark/20 bg-transparent px-4 py-3 font-body text-sm outline-none transition-all focus:border-terracotta focus:ring-1 focus:ring-terracotta/20 placeholder:text-richblack/30 dark:placeholder:text-cream/30"
                    placeholder="Your company name or website"
                  />
                </div>

                {/* Service */}
                <div>
                  <label
                    htmlFor="service"
                    className="block text-sm font-medium mb-2 text-richblack dark:text-cream"
                  >
                    What do you need?{" "}
                    <span className="text-terracotta">*</span>
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-stone/20 dark:border-stone-dark/20 bg-transparent px-4 py-3 font-body text-sm outline-none transition-all focus:border-terracotta focus:ring-1 focus:ring-terracotta/20 text-richblack dark:text-cream"
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {serviceOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-sm font-medium mb-3 text-richblack dark:text-cream">
                    Budget Range
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {budgetRanges.map((range) => (
                      <button
                        key={range}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            budget: range,
                          }))
                        }
                        className={`rounded-full border px-4 py-2 font-mono text-xs transition-all ${
                          formData.budget === range
                            ? "border-terracotta bg-terracotta text-white"
                            : "border-stone/20 dark:border-stone-dark/20 hover:border-terracotta"
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2 text-richblack dark:text-cream"
                  >
                    Tell us about your project{" "}
                    <span className="text-terracotta">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-stone/20 dark:border-stone-dark/20 bg-transparent px-4 py-3 font-body text-sm outline-none transition-all focus:border-terracotta focus:ring-1 focus:ring-terracotta/20 resize-none placeholder:text-richblack/30 dark:placeholder:text-cream/30"
                    placeholder="What are you building? What's the timeline? Any specific requirements?"
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-xl bg-terracotta py-4 font-heading font-medium text-white transition-all hover:bg-terracotta-dark disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="h-4 w-4 animate-spin"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Message →"
                  )}
                </motion.button>

                <p className="text-center text-xs text-richblack/40 dark:text-cream/60">
                  We respond within 24 hours. No spam. No cold calls.
                </p>
              </form>
            )}
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}