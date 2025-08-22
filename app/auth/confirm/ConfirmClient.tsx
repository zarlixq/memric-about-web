"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type VerifyType = "signup" | "email_change" | "recovery" | "magiclink";
type State = "loading" | "ok" | "error";

export default function ConfirmClient() {
  const sp = useSearchParams();
  const router = useRouter();

  // Supabase bazen `token_hash`, bazen `token` gönderir; ikisini de destekle
  const tokenHash = sp.get("token_hash") ?? sp.get("token");
  const type = (sp.get("type") as VerifyType) || "signup";

  const [state, setState] = useState<State>("loading");
  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    if (!tokenHash) {
      router.replace("/");
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const { error } = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type,
        });
        if (cancelled) return;

        if (error) {
          setState("error");
          setMsg(error.message || "Bağlantı geçersiz ya da süresi dolmuş.");
          return;
        }

        setState("ok");
        // İstersen 2 sn sonra login'e gönder:
        // setTimeout(() => router.push("/login"), 2000);
      } catch (e: any) {
        if (cancelled) return;
        setState("error");
        setMsg(e?.message || "Bir hata oluştu.");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [tokenHash, type, router]);

  if (state === "loading") return null; // Fallback'i Suspense gösteriyor

  if (state === "error") {
    return (
      <main className="min-h-screen grid place-items-center p-4">
        <div className="max-w-md w-full border rounded-2xl p-6 text-center">
          <h1 className="text-xl font-semibold mb-2">Doğrulama başarısız</h1>
          <p className="opacity-80 mb-4">{msg}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen grid place-items-center p-4">
      <div className="max-w-md w-full border rounded-2xl p-6 text-center">
        <div className="text-3xl mb-2">✅</div>
        <h1 className="text-xl font-semibold mb-2">E-posta doğrulandı</h1>
        <p className="opacity-80 mb-6">Hoş geldin! Hesabın başarıyla doğrulandı.</p>
        <button
          onClick={() => router.push("/login")}
          className="px-4 py-2 bg-black text-white rounded-lg"
        >
          Giriş yap
        </button>
      </div>
    </main>
  );
}
