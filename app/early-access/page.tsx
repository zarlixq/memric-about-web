"use client";

import { useEffect, useMemo, useState } from "react";
import { MotionConfig, motion } from "framer-motion";
import Link from "next/link";

// AYARLAR — bunları düzenle
const LAUNCH_ISO = "2025-09-30T12:00:00+03:00"; // resmi çıkış tarihi (İstanbul)
const DEFAULT_MANIFEST = {
  packageName: "app.memric",
  latest: {
    versionName: "1.0.0",
    versionCode: 100,
    apkUrl: "/downloads/memric-v1.0.0.apk",
    sha256: "put-real-sha256-here",
    notes: [
      "İlk erken erişim build’i",
      "Günlük sorular + tematik sohbet",
      "Temel bildirim ve kayıt akışı",
    ],
    size: "38.4 MB",
  },
};

function useCountdown(targetISO: string) {
  const target = useMemo(() => new Date(targetISO).getTime(), [targetISO]);
  const [now, setNow] = useState<number>(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const left = Math.max(target - now, 0);
  const d = Math.floor(left / (24 * 60 * 60 * 1000));
  const h = Math.floor((left % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const m = Math.floor((left % (60 * 60 * 1000)) / (60 * 1000));
  const s = Math.floor((left % (60 * 1000)) / 1000);
  return { d, h, m, s, done: left === 0 };
}

export default function EarlyAccessPage() {
  const [manifest, setManifest] = useState(DEFAULT_MANIFEST);
  const { d, h, m, s } = useCountdown(LAUNCH_ISO);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    fetch("/manifest.json")
      .then((r) => (r.ok ? r.json() : DEFAULT_MANIFEST))
      .then((j) => setManifest(j))
      .catch(() => setManifest(DEFAULT_MANIFEST));
  }, []);
  useEffect(() => {
    setIsAndroid(/Android/i.test(navigator.userAgent || ""));
  }, []);

  const { versionName, versionCode, apkUrl, sha256, notes, size } = manifest.latest;

  return (
    <MotionConfig reducedMotion="never">
      <main className="min-h-dvh bg-[#0b0b0f] text-white">
        <div className="mx-auto max-w-4xl px-6 py-10">
          {/* HERO */}
          <section className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: -24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mt-2 text-3xl sm:text-5xl font-bold"
            >
              Memric çok yakında sizlerle 🚀
            </motion.h1>


            {/* Countdown */}
            <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-zinc-800 bg-black/40 px-4 py-3">
              <span className="text-sm text-zinc-400">Resmi çıkışa kalan</span>
              <div className="font-mono text-lg">
                <span className="tabular-nums">{d}g</span>{" "}
                <span className="tabular-nums">{h}s</span>{" "}
                <span className="tabular-nums">{m}d</span>{" "}
                <span className="tabular-nums">{s}sn</span>
              </div>
            </div>
          </section>

          <section className="mt-10 rounded-2xl border border-zinc-800 bg-black/40 p-8 text-center">
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              iOS ve Android mağazalarında yayınlandığında hemen indirip deneyebileceksiniz.
            </p>
            <p className="text-gray-400 italic">
              Mağaza bağlantıları çok yakında burada yer alacak.
            </p>
          </section>

          {/* CTA bar */}
          <section className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-black/40 p-5">
            <div className="text-sm text-zinc-300">
              Soruların mı var? <span className="text-zinc-200">support@memric.app</span>
            </div>
            <div className="flex gap-3">
              <Link href="/" className="rounded-full border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-800">Ana sayfa</Link>
            </div>
          </section>
        </div>
      </main>
    </MotionConfig>
  );
}
