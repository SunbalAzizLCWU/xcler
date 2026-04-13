import { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us | Start Your Project with XCLER",
  description:
    "Get in touch with XCLER for web development, app development, WordPress, Shopify, workflow automation, and AI chatbot services. Projects start from €150.",
};

export default function ContactPage() {
  return (
    <div className="pt-20">
      <ContactSection />
    </div>
  );
}