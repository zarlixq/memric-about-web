"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ConfirmEmailPage() {
  const sp = useSearchParams();
  const router = useRouter();

  const token_hash = sp.get("token_hash");
  // signup / email_change / recovery … Supabase linkine göre type gelir
  const type = (sp.get("type") || "signup") as
    | "signup"
    | "email_change"
    | "recovery"
    | "magiclink";

  const [state, setState] = useState<"loading" | "ok" | "error">("loading");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    // Parametre yoksa gösterme → ana sayfaya at
    if (!token_hash) {
      router.replace("/"); // veya /login
      return;
    }

    (async () => {
      try {
        const { data, error } = await supabase.auth.verifyOtp({
          token_hash,
          type, // 'signup' genelde doğrulama için yeterli
        });

        if (error) {
          setState("error");
          setMessage(error.message || "Bağlantı geçersiz ya da süresi dolmuş.");
          return;
        }

        setState("ok");
      } catch (e: any) {
        setState("error");
        setMessage(e?.message || "Bir hata oluştu.");
      }
    })();
  }, [token_hash, type, router]);

  if (state === "loading") {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-sm opacity-70">Doğrulanıyor…</div>
        </div>
      </main>
    );
  }

  if (state === "error") {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full p-6 rounded-2xl shadow border">
          <h1 className="text-xl font-semibold mb-2">Doğrulama başarısız</h1>
          <p className="text-sm opacity-80 mb-4">
            {message || "Bağlantı geçersiz ya da süresi dolmuş olabilir."}
          </p>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 rounded-lg border"
              onClick={() => router.push("/login")}
            >
              Girişe dön
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-black text-white"
              onClick={() => router.push("/register")}
            >
              Yeni bağlantı al
            </button>
          </div>
        </div>
      </main>
    );
  }

  // state === "ok"
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full p-6 rounded-2xl shadow border text-center">
        <div className="text-3xl mb-2">✅</div>
        <h1 className="text-xl font-semibold mb-2">E-posta doğrulandı</h1>
        <p className="text-sm opacity-80 mb-6">
          Hoş geldin! Hesabın başarıyla doğrulandı.
        </p>
        <button
          className="px-4 py-2 rounded-lg bg-black text-white"
          onClick={() => router.push("/login")}
        >
          Giriş yap
        </button>
      </div>
    </main>
  );
}

// (opsiyon) Arama motorları indekslemesin:
export const metadata = {
  robots: { index: false, follow: false },
};
