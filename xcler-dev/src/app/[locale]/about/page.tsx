import { Metadata } from "next";
import { About } from "@/components/sections/About";

export const metadata: Metadata = {
  title: "About Us | XCLER — Meet Our Team",
  description:
    "Meet the team behind XCLER. A small, dedicated team of developers and automation experts building exceptional digital products for businesses in Germany and EU.",
};

export default function AboutPage() {
  return <About />;
}
