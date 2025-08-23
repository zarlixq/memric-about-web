'use client';

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

type State = "ok" | "unauthorized";

export default function ConfirmClient() {
  const sp = useSearchParams();
  const router = useRouter();
  const secret = sp.get("memric_secret");

  // Guard: link dışından erişimi engelle
  useEffect(() => {
    if (!secret) router.replace("/"); // ya da yetkisiz ekranı göster
  }, [secret, router]);

  if (!secret) return null;

  // Buraya geldiyse: Supabase zaten onayladı, biz sadece mesaj gösteriyoruz
  return (
    <main className="min-h-screen grid place-items-center p-4">
      <div className="max-w-md w-full border rounded-2xl p-6 text-center">
        <div className="text-3xl mb-2">✅</div>
        <h1 className="text-xl font-semibold mb-2">E-posta doğrulandı</h1>
        <p className="opacity-80 mb-6">
          Hoş geldin! Hesabın başarıyla doğrulandı.
        </p>
        <a
          href="/login"
          className="px-4 py-2 inline-block bg-black text-white rounded-lg"
        >
          Giriş yap
        </a>
      </div>
    </main>
  );
}
