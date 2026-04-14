"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function ContactForm() {
  const tForm = useTranslations("ContactForm");
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
  const [submittedName, setSubmittedName] = useState("");

  const budgetRanges = [
    tForm("budgetOptions.option1"),
    tForm("budgetOptions.option2"),
    tForm("budgetOptions.option3"),
    tForm("budgetOptions.option4"),
    tForm("budgetOptions.option5"),
  ];

  const serviceOptions = [
    tForm("serviceOptions.option1"),
    tForm("serviceOptions.option2"),
    tForm("serviceOptions.option3"),
    tForm("serviceOptions.option4"),
    tForm("serviceOptions.option5"),
    tForm("serviceOptions.option6"),
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Message sent successfully.");
        setSubmittedName(formData.name);
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          company: "",
          service: "",
          budget: "",
          message: "",
        });
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Something went wrong. Please try again.");
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

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex h-full min-h-[420px] items-center justify-center rounded-2xl border border-sage/20 bg-sage/5 p-12 text-center"
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
          <h3 className="font-heading text-2xl font-bold text-white">
            {tForm("successTitle")}
          </h3>
          <p className="mt-2 text-cream/75">
            {tForm("successMessage", { name: submittedName })}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-stone-dark/25 bg-richblack/70 p-6 md:p-8">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium mb-2 text-cream"
        >
          {tForm("nameLabel")} <span className="text-terracotta">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-xl border border-stone-dark/35 bg-transparent px-4 py-3 font-body text-sm text-cream outline-none transition-all focus:border-terracotta focus:ring-1 focus:ring-terracotta/20 placeholder:text-cream/35"
          placeholder={tForm("namePlaceholder")}
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium mb-2 text-cream"
        >
          {tForm("emailLabel")} <span className="text-terracotta">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-xl border border-stone-dark/35 bg-transparent px-4 py-3 font-body text-sm text-cream outline-none transition-all focus:border-terracotta focus:ring-1 focus:ring-terracotta/20 placeholder:text-cream/35"
          placeholder={tForm("emailPlaceholder")}
        />
      </div>

      <div>
        <label
          htmlFor="company"
          className="block text-sm font-medium mb-2 text-cream"
        >
          {tForm("companyLabel")}
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full rounded-xl border border-stone-dark/35 bg-transparent px-4 py-3 font-body text-sm text-cream outline-none transition-all focus:border-terracotta focus:ring-1 focus:ring-terracotta/20 placeholder:text-cream/35"
          placeholder={tForm("companyPlaceholder")}
        />
      </div>

      <div>
        <label
          htmlFor="service"
          className="block text-sm font-medium mb-2 text-cream"
        >
          {tForm("serviceLabel")} <span className="text-terracotta">*</span>
        </label>
        <select
          id="service"
          name="service"
          required
          value={formData.service}
          onChange={handleChange}
          className="w-full rounded-xl border border-stone-dark/35 bg-transparent px-4 py-3 font-body text-sm outline-none transition-all focus:border-terracotta focus:ring-1 focus:ring-terracotta/20 text-cream"
        >
          <option value="" disabled>
            {tForm("servicePlaceholder")}
          </option>
          {serviceOptions.map((option) => (
            <option key={option} value={option} className="text-richblack">
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-3 text-cream">
          {tForm("budgetLabel")}
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
                  : "border-stone-dark/35 text-cream hover:border-terracotta"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium mb-2 text-cream"
        >
          {tForm("messageLabel")} <span className="text-terracotta">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="w-full rounded-xl border border-stone-dark/35 bg-transparent px-4 py-3 font-body text-sm text-cream outline-none transition-all focus:border-terracotta focus:ring-1 focus:ring-terracotta/20 resize-none placeholder:text-cream/35"
          placeholder={tForm("messagePlaceholder")}
        />
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full rounded-xl bg-terracotta py-4 font-heading font-medium text-white transition-all hover:bg-terracotta-dark disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
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
            {tForm("sending")}
          </span>
        ) : (
          tForm("button")
        )}
      </motion.button>

      <p className="text-center text-xs text-cream/60">{tForm("footer")}</p>
    </form>
  );
}
