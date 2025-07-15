import { motion } from "framer-motion";

export default function AnimatedButton({ children, ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 0.9 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
