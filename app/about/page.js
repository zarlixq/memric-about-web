"use client";
import { motion } from "framer-motion";

export default function About() {
  return (
    <main className="bg-gradient-to-br from-purple-600 to-pink-500 text-white min-h-screen px-8 py-20">
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold mb-8"
      >
        Hakkımızda
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="max-w-3xl"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        fermentum, elit ac viverra feugiat, nisl est luctus nisi, sit amet
        tincidunt sem orci sed arcu. Nullam feugiat, metus ac elementum
        pulvinar, libero augue laoreet metus, sed commodo turpis ligula nec
        erat.
      </motion.p>
    </main>
  );
}
