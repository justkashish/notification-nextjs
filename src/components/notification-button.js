"use client"

import { motion } from "framer-motion"

export default function NotificationButton({ onClick, isAnimating }) {
  return (
    <motion.button
      className="w-full max-w-sm py-3 px-4 rounded-md bg-transparent text-white font-normal border border-[#4A2A82] hover:bg-[#2A1A52] transition-colors"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: isAnimating ? [1, 1.03, 1] : 1,
        boxShadow: isAnimating
          ? ["0 0 0 0 rgba(74, 42, 130, 0)", "0 0 0 4px rgba(74, 42, 130, 0.3)", "0 0 0 0 rgba(74, 42, 130, 0)"]
          : "0 0 0 0 rgba(74, 42, 130, 0)",
      }}
      transition={{
        delay: 0.5,
        scale: { duration: 0.3 },
        boxShadow: { duration: 0.8 },
      }}
    >
      Send Notification
    </motion.button>
  )
}

