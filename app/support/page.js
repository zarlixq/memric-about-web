"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function SupportPage() {
  const [type, setType] = useState("feedback");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);

    const { error } = await supabase.from("feedbacks").insert([
      {
        type,
        message,
      },
    ]);

    setLoading(false);

    if (!error) {
      setSuccess(true);
      setMessage("");
    } else {
      alert("Bir hata oluştu: " + error.message);
    }
  };

  return (
    <main className="min-h-screen bg-[#0b0b0f] text-white flex flex-col items-center justify-center px-4 py-16">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-3xl sm:text-4xl font-bold text-purple-400 mb-6"
      >
        Destek & Geri Bildirim
      </motion.h1>

      <p className="text-gray-300 mb-8 text-center max-w-xl">
        Bir sorunla mı karşılaştın, yoksa fikirlerini mi paylaşmak istiyorsun?
        Buradan bize yazabilirsin.  
        Ayrıca <a href="mailto:support@memric.app" className="text-pink-400 underline">support@memric.app</a> adresinden de ulaşabilirsin.
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-[#15151c] p-6 rounded-2xl shadow-lg border border-purple-800/30"
      >
        <label className="block text-sm font-semibold mb-2 text-purple-300">
          Tür
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-3 rounded-lg bg-[#0e0e13] border border-purple-700 focus:outline-none focus:ring-2 focus:ring-pink-500 mb-4"
        >
          <option value="feedback">💡 Geri Bildirim</option>
          <option value="bug">🐞 Hata Bildirimi</option>
          <option value="support">📩 Destek Talebi</option>
        </select>

        <label className="block text-sm font-semibold mb-2 text-purple-300">
          Mesajınız
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Bize düşüncelerini veya yaşadığın sorunu yaz..."
          rows={5}
          className="w-full p-3 rounded-lg bg-[#0e0e13] border border-purple-700 focus:outline-none focus:ring-2 focus:ring-pink-500 mb-4 resize-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-full font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-black hover:scale-105 transition disabled:opacity-50"
        >
          {loading ? "Gönderiliyor..." : "Gönder"}
        </button>

        {success && (
          <p className="mt-4 text-green-400 text-center">
            ✅ Geri bildirimin için teşekkürler! En kısa sürede inceleyeceğiz.
          </p>
        )}
      </form>
    </main>
  );
}
