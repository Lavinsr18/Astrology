import { motion } from "framer-motion";
import StarBackground from "../components/ui/StarBackground";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen pt-28 pb-32 relative">
      <StarBackground />

      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent blur-[140px] -z-10" />

      <div className="container mx-auto px-6 max-w-5xl">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-white/60">
            Last updated: January 19, 2026
          </p>
        </motion.div>

        {/* CONTENT CARD */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card bg-black/40 border border-white/10 rounded-3xl p-8 md:p-12 space-y-10 text-white/80 leading-relaxed"
        >

          <Section title="Introduction">
            AstroCharm. All rights reserved. operates this store and website,
            including all related information, content, features, tools,
            products and services (the “Services”) to provide you with a curated
            shopping experience. This Privacy Policy explains how we collect,
            use, and disclose your personal information.
          </Section>

          <Section title="Personal Information We Collect">
            We may collect personal information including:
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Contact details (name, address, email, phone)</li>
              <li>Financial and payment information</li>
              <li>Account and transaction information</li>
              <li>Communications with us</li>
              <li>Device and usage information</li>
            </ul>
          </Section>

          <Section title="Sources of Information">
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Directly from you</li>
              <li>Automatically through the Services</li>
              <li>From service providers</li>
              <li>From partners or third parties</li>
            </ul>
          </Section>

          <Section title="How We Use Your Information">
            We use personal information to:
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Provide and improve our Services</li>
              <li>Process payments and fulfill orders</li>
              <li>Send marketing and promotional communication</li>
              <li>Prevent fraud and enhance security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </Section>

          <Section title="How We Disclose Information">
            We may share your information with:
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Shopify and service providers</li>
              <li>Marketing and business partners</li>
              <li>Affiliates within our corporate group</li>
              <li>Legal authorities when required</li>
            </ul>
          </Section>

          <Section title="Relationship with Shopify">
            Our Services are hosted by Shopify, which processes personal
            information to provide and improve the Services. You may learn more
            at <span className="text-primary">https://privacy.shopify.com</span>.
          </Section>

          <Section title="Children’s Data">
            Our Services are not intended for children under the age of majority,
            and we do not knowingly collect such data.
          </Section>

          <Section title="Security & Retention">
            While we take reasonable security measures, no system is completely
            secure. Data retention depends on legal and operational needs.
          </Section>

          <Section title="Your Rights">
            Depending on your location, you may have rights to:
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Access your personal data</li>
              <li>Request correction or deletion</li>
              <li>Data portability</li>
              <li>Opt-out of marketing communication</li>
            </ul>
          </Section>

          <Section title="International Transfers">
            Your data may be transferred and processed outside your country,
            using legally approved safeguards.
          </Section>

          <Section title="Changes to This Policy">
            We may update this Privacy Policy periodically. Changes will be
            posted on this page with an updated date.
          </Section>

          <Section title="Contact Us">
            📧 Email: <b>khedkarpritis@gmail.com</b>  
            <br />
            📍 Address: Narayanpur, Khadim Residence, Kolkata, WB – 700136, IN
          </Section>

        </motion.div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-white mb-3">
        {title}
      </h2>
      <div className="text-sm md:text-base">{children}</div>
    </div>
  );
}
