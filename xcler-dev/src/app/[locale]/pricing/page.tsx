import { Metadata } from "next";
import { Pricing } from "@/components/sections/Pricing";

export const metadata: Metadata = {
  title: "Pricing | XCLER — Transparent Web Development Pricing",
  description:
    "Transparent pricing for web development, app development, WordPress, Shopify, automation, and AI services. Projects start from €150. No hidden fees.",
};

export default function PricingPage() {
  return <Pricing />;
}