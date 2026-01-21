import { motion, AnimatePresence } from "framer-motion";

export default function AdminToast({
  show,
  type,
  message,
}: {
  show: boolean;
  type: "success" | "error";
  message: string;
}) {
  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20 }}
        className={`fixed bottom-6 right-6 z-[9999]
          px-6 py-4 rounded-xl shadow-xl text-white
          ${type === "success" ? "bg-green-600" : "bg-red-600"}
        `}
      >
        {message}
      </motion.div>
    </AnimatePresence>
  );
}
