"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type State = "loading" | "ok" | "error";

export default function ConfirmClient() {
  const sp = useSearchParams();
  const router = useRouter();

  const token_hash = sp.get("token_hash");
  const type = (sp.get("type") as "signup" | "email_change" | "recovery" | "magiclink") || "signup";

  const [state, setState] = useState<State>("loading");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!token_hash) {
      router.replace("/");
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const { error } = await supabase.auth.verifyOtp({ token_hash, type });
        if (cancelled) return;

        if (error) {
          setState("error");
          setMsg(error.message || "Bağlantı geçersiz ya da süresi dolmuş.");
          return;
        }
        setState("ok");
      } catch (e: any) {
        if (cancelled) return;
        setState("error");
        setMsg(e?.message || "Bir hata oluştu.");
      }
    })();

    return () => { cancelled = true; };
  }, [token_hash, type, router]);

  if (state === "loading") {
    return null; // fallback'i server'daki Suspense gösteriyor
  }

  if (state === "error") {
    return (
      <main className="min-h-screen grid place-items-center p-4">
        <div className="max-w-md w-full border rounded-2xl p-6 text-center">
          <h1 className="text-xl font-semibold mb-2">Doğrulama başarısız</h1>
          <p className="opacity-80 mb-4">{msg}</p>
          <div className="flex gap-2 justify-center">
            <button onClick={() => router.push("/login")} className="px-4 py-2 border rounded-lg">
              Girişe dön
            </button>
            <button onClick={() => router.push("/register")} className="px-4 py-2 bg-black text-white rounded-lg">
              Yeni bağlantı al
            </button>
          </div>
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
