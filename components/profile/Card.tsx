"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

type CardProps = {
  id: string;
  title: string;
  icon: string;
  expanded: boolean;
  onToggle: (id: string) => void;
  children: ReactNode;
};

export default function Card({
  id,
  title,
  icon,
  expanded,
  onToggle,
  children,
}: CardProps) {
  return (
    <div className="rounded-2xl bg-neutral-900/70 border border-white/10 shadow-lg overflow-hidden transition-colors">
      {/* Header */}
      <button
        onClick={() => onToggle(id)}
        className="w-full flex items-center justify-between px-5 py-4"
        aria-expanded={expanded}
        aria-controls={`${id}-panel`}
      >
        <span className="flex items-center gap-2 font-semibold text-neutral-200">
          <span className="text-xl">{icon}</span>
          {title}
        </span>
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="text-purple-400 text-xl leading-none select-none"
        >
          ▼
        </motion.span>
      </button>

      {/* İçerik */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id={`${id}-panel`}
            key={`${id}-content`}
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="px-5 pb-5 text-sm text-neutral-300 space-y-3"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
