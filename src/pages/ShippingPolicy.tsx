import { motion } from "framer-motion";
import StarBackground from "../components/ui/StarBackground";

export default function ShippingPolicy() {
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
            Shipping Policy
          </h1>
          <p className="text-white/60">
            Last updated: 21-01-2026
          </p>
        </motion.div>

        {/* CONTENT */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card bg-black/40 border border-white/10 rounded-3xl p-8 md:p-12 space-y-10 text-white/80 leading-relaxed"
        >

          <Section title="Overview">
            At <b>AstroCharm</b>, we aim to deliver your spiritual and gemstone
            bracelets safely and on time. Please read our shipping policy
            carefully before placing an order.
          </Section>

          <Section title="1. Order Processing Time">
            <ul className="list-disc pl-6 space-y-2">
              <li>All orders are processed within <b>1–3 business days</b></li>
              <li>
                During high demand or festive periods, processing times may be
                slightly extended
              </li>
            </ul>
          </Section>

          <Section title="2. Shipping Coverage">
            <ul className="list-disc pl-6 space-y-2">
              <li>We currently ship <b>across India only</b></li>
              <li>International shipping is not available at this time</li>
            </ul>
          </Section>

          <Section title="3. Estimated Delivery Time">
            Once dispatched, delivery typically takes:
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><b>Metro Cities:</b> 3–5 business days</li>
              <li><b>Non-Metro / Rural Areas:</b> 5–8 business days</li>
            </ul>
            <p className="mt-3 text-white/70">
              Delivery timelines may vary due to courier operations, weather
              conditions, or other external factors.
            </p>
          </Section>

          <Section title="4. Shipping Charges">
            <ul className="list-disc pl-6 space-y-2">
              <li>Shipping charges (if applicable) are shown at checkout</li>
              <li>Any additional charges such as COD fees are displayed before payment</li>
            </ul>
          </Section>

          <Section title="5. Order Tracking">
            <ul className="list-disc pl-6 space-y-2">
              <li>Tracking link is shared via email or SMS after dispatch</li>
              <li>Tracking details may take up to 24 hours to update</li>
            </ul>
          </Section>

          <Section title="6. Delays in Delivery">
            Astrocharm is not responsible for delays caused by:
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Courier partner issues</li>
              <li>Natural calamities or government restrictions</li>
              <li>Incorrect or incomplete address provided by the customer</li>
            </ul>
          </Section>

          <Section title="7. Incorrect Address or Failed Delivery">
            <ul className="list-disc pl-6 space-y-2">
              <li>Please ensure shipping address and contact details are accurate</li>
              <li>
                Orders returned due to incorrect address or failed delivery
                attempts may not be eligible for reshipping or refund
              </li>
            </ul>
          </Section>

          <Section title="8. Damaged or Missing Packages">
            If your order arrives damaged or appears tampered with:
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Contact us within <b>48 hours</b> of delivery</li>
              <li>Share clear photos or videos of the package and product</li>
            </ul>

            <p className="mt-3 text-primary font-medium">
              📧 astrocharmpvtltd@gmail.com
            </p>

            <p className="text-white/70 mt-2">
              Claims raised after 48 hours may not be accepted.
            </p>
          </Section>

          <Section title="9. Cash on Delivery (COD)">
            <ul className="list-disc pl-6 space-y-2">
              <li>COD availability depends on your location</li>
              <li>Additional COD charges may apply and are shown at checkout</li>
            </ul>
          </Section>

          <Section title="10. Contact Us">
            For shipping-related queries:
            <br />
            📧 <b>astrocharmpvtltd@gmail.com</b>
            <br />
            🌐 <span className="text-primary">https://astrocharm.co.in</span>
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
