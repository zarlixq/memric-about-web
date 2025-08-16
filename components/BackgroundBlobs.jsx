// components/BackgroundBlobs.jsx
"use client";

import { motion } from "framer-motion";

export default function BackgroundBlobs() {
  return (
    // içerikten bir kademe aşağıda, ama InteractiveBackground'ın üstünde kalsın diye z-0
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
      {/* SOL-ÜST */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: -80, y: -80 }}
        animate={{ opacity: 0.35, scale: 1, x: -60, y: -60 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute -top-16 -left-16 w-64 h-64 sm:w-96 sm:h-96 rounded-full
                   bg-[radial-gradient(closest-side,theme(colors.fuchsia.500),transparent)]
                   blur-3xl mix-blend-screen"
      />
      {/* SAĞ-ALT */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: 80, y: 80 }}
        animate={{ opacity: 0.3, scale: 1, x: 60, y: 60 }}
        transition={{ duration: 1.2, delay: 0.15, ease: "easeOut" }}
        className="absolute -bottom-20 -right-20 w-72 h-72 sm:w-[28rem] sm:h-[28rem] rounded-full
                   bg-[radial-gradient(closest-side,theme(colors.pink.500),transparent)]
                   blur-3xl mix-blend-screen"
      />
      {/* ORTA-HALO (çok hafif) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 0.18, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.25, ease: "easeOut" }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[28rem] h-[28rem] sm:w-[36rem] sm:h-[36rem] rounded-full
                   bg-[radial-gradient(closest-side,theme(colors.violet.500),transparent)]
                   blur-[100px] mix-blend-screen"
      />
    </div>
  );
}
