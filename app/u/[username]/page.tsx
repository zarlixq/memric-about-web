"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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

  const toggle = (id: string) => setExpanded((p) => ({ ...p, [id]: !p[id] }));

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`/api/profile/${encodeURIComponent(String(slug))}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((json) => {
        setData(json);
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
      {/* ⚡️ Hafif animasyonlu gradient arka plan (CSS) */}
      <div className="absolute inset-0 -z-10 bg-[#0b0b0f]" id="bg-anim" />

      {/* Hero (statik) */}
      <section className="w-full py-14 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-fuchsia-500 to-violet-500 bg-clip-text text-transparent">
          Memric
        </h1>
        <div className="mt-6 px-6 py-2 rounded-full border border-white/10 bg-white text-black font-bold text-lg shadow">
          {user?.username ?? slug}
        </div>
      </section>

      {/* Kartlar */}
      <section className="max-w-xl mx-auto px-4 pb-14 space-y-6">
        {expanded.hasOwnProperty("personal") && (
          <div>
            <PersonalCard
              expanded={expanded["personal"]}
              onToggle={toggle}
              school={user?.school}
              zodiac_sign={user?.zodiac_sign}
              show_zodiac={user?.show_zodiac}
            />
          </div>
        )}

        {expanded.hasOwnProperty("character") && (
          <div>
            <CharacterCard
              expanded={expanded["character"]}
              onToggle={toggle}
              hobbies={user?.hobbies}
              red_lines={user?.red_lines}
              phobias={user?.phobias}
            />
          </div>
        )}

        {expanded.hasOwnProperty("culture") && (
          <div>
            <CultureCard
              expanded={expanded["culture"]}
              onToggle={toggle}
              countries_visited={user?.countries_visited}
              languages_known={user?.languages_known}
            />
          </div>
        )}

        {expanded.hasOwnProperty("music") && (
          <div>
            <MusicCard
              expanded={expanded["music"]}
              onToggle={toggle}
              currently_listening_songs={currently_listening_songs}
              favorite_songs={favorite_songs}
              listened_artists={listened_artists}
            />
          </div>
        )}

        {expanded.hasOwnProperty("films") && (
          <div>
            <FilmsCard
              expanded={expanded["films"]}
              onToggle={toggle}
              favorite_movies={favorite_movies}
              favorite_series={favorite_series}
              favorite_actors={favorite_actors}
            />
          </div>
        )}

        <div className="pt-6 flex justify-center">
          <a
            href="https://memric.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white font-semibold shadow hover:opacity-90 transition"
          >
            ✨ Nedir bu Memric?
          </a>
        </div>
      </section>

      {/* CSS animasyon tanımları */}
      <style jsx>{`
        #bg-anim {
          /* iki radial layer; blur yok → düşük maliyet */
          background:
            radial-gradient(40vmin 30vmin at 10% 0%, rgba(217,70,239,.18), transparent 60%),
            radial-gradient(40vmin 30vmin at 90% 100%, rgba(139,92,246,.16), transparent 60%),
            #0b0b0f;
          animation: shiftA 26s ease-in-out infinite alternate;
          will-change: background-position;
        }
        @keyframes shiftA {
          0%   { background-position: 10% 0%, 90% 100%, 0 0; }
          100% { background-position: 15% 5%, 85% 95%, 0 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          #bg-anim { animation: none; }
        }
      `}</style>
    </main>
  );
}
