import { motion } from "framer-motion";
import StarBackground from "../components/ui/StarBackground";

export default function Terms() {
  return (
    <div className="min-h-screen pt-28 pb-24 relative overflow-hidden">
      <StarBackground />

      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent blur-[160px] -z-10" />

      <div className="max-w-4xl mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-display font-bold text-white mb-6"
        >
          Terms & Conditions
        </motion.h1>

        <p className="text-sm text-white/60 mb-10">
          Last updated: January 21, 2026
        </p>

        <div className="space-y-8 text-white/80 text-sm leading-relaxed">

          <Section title="1. Introduction">
            Welcome to <b>Astrocharm</b>. By accessing or using our website and
            services, you agree to be bound by these Terms & Conditions. If you
            do not agree, please do not use our services.
          </Section>

          <Section title="2. Eligibility">
            You must be at least 18 years old or have parental permission to
            use this website. By using Astrocharm, you confirm that the
            information you provide is accurate and complete.
          </Section>

          <Section title="3. Products & Services">
            Astrocharm offers spiritual, gemstone, and astrology-related
            products. All products are handcrafted and natural in nature.
            Minor variations in color, texture, or bead shape are normal and
            not considered defects.
          </Section>

          <Section title="4. Orders & Payments">
            <ul className="list-disc pl-5 space-y-2">
              <li>All prices are listed in INR and inclusive of applicable taxes.</li>
              <li>Orders are confirmed only after successful payment.</li>
              <li>Cash on Delivery (COD) may be available for selected locations.</li>
            </ul>
          </Section>

          <Section title="5. Shipping & Delivery">
            Delivery timelines are estimates and may vary due to courier,
            weather, or operational delays. Astrocharm is not responsible for
            delays beyond its control.
          </Section>

          <Section title="6. Returns & Refunds">
            Returns and refunds are governed by our Refund Policy. Please
            review the Refund Policy page carefully before placing an order.
          </Section>

          <Section title="7. Cancellations">
            Orders can be cancelled within 12 hours of placement. Orders that
            have already been shipped cannot be cancelled.
          </Section>

          <Section title="8. Disclaimer">
            Astrocharm products are not medical devices or guaranteed-result
            items. Results of spiritual or gemstone products may vary from
            person to person.
          </Section>

          <Section title="9. Intellectual Property">
            All content on this website including text, images, logos, and
            designs are the property of Astrocharm and may not be copied or
            reused without permission.
          </Section>

          <Section title="10. Limitation of Liability">
            Astrocharm shall not be liable for any indirect, incidental, or
            consequential damages arising from the use of our products or
            services.
          </Section>

          <Section title="11. Governing Law">
            These Terms shall be governed and interpreted in accordance with
            the laws of India. Any disputes shall be subject to the jurisdiction
            of Indian courts.
          </Section>

          <Section title="12. Changes to Terms">
            We reserve the right to update these Terms & Conditions at any time.
            Changes will be effective immediately upon posting on this page.
          </Section>

          <Section title="13. Contact Us">
            For any questions regarding these Terms & Conditions, contact us at:
            <br />
            <b>Email:</b> astrocharmpvtltd@gmail.com
          </Section>

        </div>
      </div>
    </div>
  );
}

/* ===== Reusable Section Component ===== */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-2">
        {title}
      </h2>
      <div>{children}</div>
    </div>
  );
}
