import { motion } from "framer-motion";

export default function Spinner({ size = 50 }: { size?: number }) {
  return (
    <motion.div
      style={{
        width: size,
        height: size,
        border: "6px solid #d7e6deff",
        borderTop: "6px solid #7c3aed",
        borderRadius: "50%",
      }}
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        duration: 1,
        ease: "linear",
      }}
    />
  );
}
