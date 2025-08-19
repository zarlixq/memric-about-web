"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

// Kartlar
import PersonalCard from "@/components/profile/cards/PersonalCard";
import CharacterCard from "@/components/profile/cards/CharacterCard";
import CultureCard from "@/components/profile/cards/CultureCard";
import MusicCard from "@/components/profile/cards/MusicCard";
import FilmsCard from "@/components/profile/cards/FilmsCard";

export default function PublicProfilePage() {
  const { username } = useParams<{ username: string }>();
  const slug = Array.isArray(username) ? username[0] : username;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  // Kart toggle
  const toggle = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // API Fetch
  useEffect(() => {
    if (!slug) return;
    setLoading(true);

    fetch(`/api/profile/${encodeURIComponent(String(slug))}`, {
      cache: "no-store",
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((json) => {
        setData(json);

        // var olan kartları kapalı başlat
        const present: Record<string, boolean> = {};
        if (json.user?.school || (json.user?.zodiac_sign && json.user?.show_zodiac)) present["personal"] = false;
        if ((json.user?.hobbies?.length ?? 0) > 0 || (json.user?.red_lines?.length ?? 0) > 0 || (json.user?.phobias?.length ?? 0) > 0) present["character"] = false;
        if ((json.user?.countries_visited?.length ?? 0) > 0 || (json.user?.languages_known?.length ?? 0) > 0) present["culture"] = false;
        if ((json.favorite_songs?.length ?? 0) > 0 || (json.listened_artists?.length ?? 0) > 0 || (json.currently_listening_songs?.length ?? 0) > 0) present["music"] = false;
        if ((json.favorite_movies?.length ?? 0) > 0 || (json.favorite_series?.length ?? 0) > 0 || (json.favorite_actors?.length ?? 0) > 0) present["films"] = false;

        setExpanded(present);
      })
      .catch(() => setData({ error: "Bağlantı hatası" }))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0b0b0f] text-white grid place-items-center">
        <p className="text-neutral-300">⏳ Profil yükleniyor…</p>
      </main>
    );
  }

  if (!data || data?.error) {
    return (
      <main className="min-h-screen bg-[#0b0b0f] text-white grid place-items-center">
        <p className="text-sm md:text-base text-red-400">
          {data?.error ?? "Kullanıcı bulunamadı."}
        </p>
      </main>
    );
  }

  const {
    user,
    favorite_songs,
    listened_artists,
    currently_listening_songs,
    favorite_movies,
    favorite_series,
    favorite_actors,
  } = data;

  return (
    <main className="relative min-h-screen bg-[#0b0b0f] text-white overflow-hidden">
      {/* 🌌 Arka plan blur */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-200px] left-[-200px] w-[400px] h-[400px] bg-fuchsia-600/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-200px] right-[-200px] w-[400px] h-[400px] bg-violet-600/30 rounded-full blur-[120px]" />
      </div>

      {/* Hero (inline, animasyonlu) */}
      <section className="relative w-full py-16 flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Arka plan animasyonları */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-fuchsia-500/30 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-violet-500/30 rounded-full blur-3xl"
        />

        {/* Başlık */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-fuchsia-500 to-violet-500 bg-clip-text text-transparent drop-shadow-md z-10"
        >
          Memric
        </motion.h1>

        {/* Kullanıcı adı kapsülü */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-6 px-6 py-2 rounded-full border-2 border-white bg-white text-black font-bold text-lg shadow-lg z-10"
        >
          {user?.username ?? slug}
        </motion.div>
      </section>

      {/* Kartlar */}
<section className="relative max-w-xl mx-auto px-4 py-12">
  {/* glow'lar – içerik ARKASINDA ama section'ın içinde */}
  <div className="pointer-events-none absolute inset-0 z-0 overflow-visible">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.55, scale: [1, 1.04, 1] }}
      transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
      className="absolute left-1/2 -translate-x-1/2 -top-24 w-[900px] h-[900px] bg-fuchsia-600/20 rounded-full blur-[160px]"
    />
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.45, scale: [1, 1.06, 1] }}
      transition={{ duration: 14, repeat: Infinity, repeatType: "mirror", delay: 0.8 }}
      className="absolute left-1/2 -translate-x-1/2 top-[260px] w-[720px] h-[720px] bg-violet-600/20 rounded-full blur-[160px]"
    />
    {/* en alta ekstra parıltı */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.35, scale: [1, 1.05, 1] }}
      transition={{ duration: 16, repeat: Infinity, repeatType: "mirror", delay: 1.4 }}
      className="absolute left-1/2 -translate-x-1/2 -bottom-72 w-[820px] h-[820px] bg-fuchsia-600/15 rounded-full blur-[180px]"
    />
  </div>

  {/* içerik – glowların ÜSTÜNDE */}
  <div className="relative z-10 space-y-6">
    {expanded.hasOwnProperty("personal") && (
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}>
        <PersonalCard
          expanded={expanded["personal"]}
          onToggle={toggle}
          school={user?.school}
          zodiac_sign={user?.zodiac_sign}
          show_zodiac={user?.show_zodiac}
        />
      </motion.div>
    )}

    {expanded.hasOwnProperty("character") && (
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: 0.1 }}>
        <CharacterCard
          expanded={expanded["character"]}
          onToggle={toggle}
          hobbies={user?.hobbies}
          red_lines={user?.red_lines}
          phobias={user?.phobias}
        />
      </motion.div>
    )}

    {expanded.hasOwnProperty("culture") && (
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: 0.2 }}>
        <CultureCard
          expanded={expanded["culture"]}
          onToggle={toggle}
          countries_visited={user?.countries_visited}
          languages_known={user?.languages_known}
        />
      </motion.div>
    )}

    {expanded.hasOwnProperty("music") && (
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: 0.3 }}>
        <MusicCard
          expanded={expanded["music"]}
          onToggle={toggle}
          currently_listening_songs={currently_listening_songs}
          favorite_songs={favorite_songs}
          listened_artists={listened_artists}
        />
      </motion.div>
    )}

    {expanded.hasOwnProperty("films") && (
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: 0.4 }}>
        <FilmsCard
          expanded={expanded["films"]}
          onToggle={toggle}
          favorite_movies={favorite_movies}
          favorite_series={favorite_series}
          favorite_actors={favorite_actors}
        />
      </motion.div>
    )}

    {/* En alttaki buton */}
    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: 0.5 }} className="pt-6 flex justify-center">
      <a
        href="https://memric.app"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white font-semibold shadow-lg hover:scale-105 transform transition-all duration-200"
      >
        ✨ Nedir bu Memric?
      </a>
    </motion.div>
  </div>
</section>


    </main>
  );
}
