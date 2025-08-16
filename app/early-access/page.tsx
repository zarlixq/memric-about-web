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
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-pink-300/80 text-xs tracking-wider uppercase"
            >
              Erken Erişim Programı
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: -24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mt-2 text-3xl sm:text-5xl font-bold"
            >
              Memric Android APK — indir, dene, geri bildirim ver
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="mt-3 text-gray-300 max-w-2xl mx-auto"
            >
              Şimdi katılan ilk <span className="text-pink-400 font-semibold">500</span> kullanıcıya,
              premium model çıktığında <span className="text-pink-400 font-semibold">ücretsiz Premium</span> hediye 🎁
            </motion.p>

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

          {/* APK CARD */}
          <section className="mt-10 rounded-2xl border border-zinc-800 bg-black/40 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="text-xl font-semibold">memric-{versionName}.apk</div>
                <div className="text-sm text-zinc-400">
                  Sürüm: {versionName} (code {versionCode}) • Boyut: {size || "—"}
                </div>
                <div className="mt-1 text-[11px] text-zinc-500 break-all">
                  SHA-256: <span className="font-mono">{sha256}</span>
                </div>
              </div>

              {isAndroid ? (
                <a
                  href={apkUrl}
                  download
                  className="inline-flex items-center justify-center rounded-full bg-pink-500 px-6 py-2.5 font-medium text-black hover:scale-[1.02] transition"
                >
                  APK’yi indir
                </a>
              ) : (
                <a
                  href={apkUrl}
                  className="inline-flex items-center justify-center rounded-full border border-pink-400 px-6 py-2.5 font-medium hover:bg-pink-500 hover:text-black transition"
                >
                  Dosyayı aç
                </a>
              )}
            </div>

            <ol className="mt-5 space-y-2 text-sm text-zinc-300">
              <li>1) APK’yı indir.</li>
              <li>2) İndirilenler’den aç; “Bilinmeyen kaynaklara izin ver” gerekirse ayarla.</li>
              <li>3) Yükle → Memric’i başlat.</li>
            </ol>

            <details className="mt-5 rounded-lg border border-zinc-800 p-3">
              <summary className="cursor-pointer text-sm text-zinc-200">Sürüm Notları</summary>
              <ul className="mt-2 list-disc pl-6 text-sm text-zinc-400">
                {notes?.map((n: string, i: number) => <li key={i}>{n}</li>)}
              </ul>
            </details>
          </section>

          {/* AVANTAJLAR */}
          <section className="mt-10 grid gap-4 sm:grid-cols-3">
            <Perk title="Hızlı erişim" desc="Mağazayı beklemeden dene." />
            <Perk title="Geri bildirim gücü" desc="Önerilerin ürünü şekillendirir." />
            <Perk title="İlk 500’e Premium" desc="Model çıktığında ücretsiz Premium." />
          </section>

          {/* CTA bar */}
          <section className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-black/40 p-5">
            <div className="text-sm text-zinc-300">
              Sorun mu var? <span className="text-zinc-200">support@memric.app</span>
            </div>
            <div className="flex gap-3">
              <Link href="/" className="rounded-full border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-800">Ana sayfa</Link>
              <a href={apkUrl} className="rounded-full bg-pink-500 px-4 py-2 text-sm font-medium text-black">APK’yi indir</a>
            </div>
          </section>
        </div>
      </main>
    </MotionConfig>
  );
}

function Perk({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-black/40 p-4">
      <div className="font-medium">{title}</div>
      <div className="mt-1 text-sm text-zinc-400">{desc}</div>
    </div>
  );
}
