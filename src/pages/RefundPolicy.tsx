import { motion } from "framer-motion";
import StarBackground from "../components/ui/StarBackground";

export default function RefundPolicy() {
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
            Refund Policy
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
            At <b>AstroCharm</b>, we specialize in premium spiritual and gemstone
            bracelets. Due to the personal, handcrafted, and spiritual nature of
            our products, we follow a strict but fair return and refund policy.
          </Section>

          <Section title="Returns Eligibility">
            Returns are accepted <b>only</b> in the following cases:
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Product received is damaged, defective, or incorrect</li>
              <li>Issue is reported within <b>48 hours</b> of delivery</li>
              <li>Product is unused, unworn, and in original packaging</li>
            </ul>
            <p className="mt-3 text-white/70">
              Any return request not meeting the above conditions will not be accepted.
            </p>
          </Section>

          <Section title="Non-Returnable & Non-Refundable Items">
            The following items are not eligible for return or refund:
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Used, worn, or altered bracelets</li>
              <li>Customized or made-to-order products</li>
              <li>Products purchased during offers or discounts</li>
              <li>Minor variations in color, texture, or bead shape</li>
              <li>Requests raised after 48 hours of delivery</li>
            </ul>
          </Section>

          <Section title="How to Request a Return">
            To initiate a return request, email us at:
            <p className="mt-2 text-primary font-medium">
              astrocharmpvtltd@gmail.com
            </p>

            <p className="mt-4">
              Please include the following within 48 hours of receiving your order:
            </p>

            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Order ID</li>
              <li>Clear photos or videos of the product</li>
              <li>Reason for return</li>
            </ul>

            <p className="mt-3 text-white/70">
              Requests without valid proof may be declined.
            </p>
          </Section>

          <Section title="Refund Process">
            <ul className="list-disc pl-6 space-y-2">
              <li>Approved refunds are processed within 7–10 business days</li>
              <li>Refunds are credited to the original payment method only</li>
              <li>Shipping and COD charges are non-refundable</li>
            </ul>
          </Section>

          <Section title="Replacement Policy">
            In approved cases, AstroCharm may offer:
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Replacement (subject to availability), or</li>
              <li>Refund, at our discretion</li>
            </ul>
          </Section>

          <Section title="Order Cancellation">
            <ul className="list-disc pl-6 space-y-2">
              <li>Orders can be cancelled within <b>12 hours</b> of placing the order</li>
              <li>Orders already processed or shipped cannot be cancelled</li>
            </ul>
          </Section>

          <Section title="Exchange Policy">
            Currently, we do not offer exchanges.
            <br />
            If eligible, please return the product and place a new order.
          </Section>

          <Section title="Disclaimer">
            <ul className="list-disc pl-6 space-y-2">
              <li>AstroCharm products are not medical or guaranteed-result items</li>
              <li>Spiritual and gemstone results may vary person to person</li>
              <li>Natural stone variations are part of authenticity, not defects</li>
            </ul>
          </Section>

          <Section title="Contact Us">
            📧 Email: <b>astrocharmpvtltd@gmail.com</b>
            <br />
            🌐 Website:{" "}
            <span className="text-primary">
              https://astrocharm.co.in
            </span>
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
