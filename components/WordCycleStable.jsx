"use client";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WordCycleStable({ words = [], interval = 2200 }) {
  const [i, setI] = useState(0);
  const longest = useMemo(
    () => words.reduce((a, b) => (b.length > a.length ? b : a), ""),
    [words]
  );

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [interval, words.length]);

  return (
    <span className="relative inline-block align-baseline whitespace-nowrap h-[1.1em]">
      {/* yer ayırma: en uzun kelime görünmez */}
      <span className="invisible select-none">{longest}</span>

      {/* görünen kelime */}
      <span className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={i}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="inline-block"
          >
            {words[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
