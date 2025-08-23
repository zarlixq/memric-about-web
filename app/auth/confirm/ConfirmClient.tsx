'use client';

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

  const code = sp.get("code"); // email confirm link → ?code=...
  const tokenHash = sp.get("token_hash") ?? sp.get("token"); // OTP link → ?token_hash=...
  const rawType = sp.get("type") as VerifyType | null;
  const type: VerifyType =
    (["signup","email_change","recovery","magiclink"].includes(String(rawType))
      ? (rawType as VerifyType)
      : "signup");

  const [state, setState] = useState<State>("loading");
  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    if (!sp.size) return; // paramlar gelmeden çalışmasın
    let cancelled = false;

    (async () => {
      try {
        let error = null;

        if (tokenHash) {
          // token_hash akışı
          const { error: e } = await supabase.auth.verifyOtp({
            type,
            token_hash: tokenHash,
          });
          error = e;
        } else if (code) {
          // code akışı (signup confirm linkleri)
          // @ts-ignore: supabase-js docs'ta mevcut ama tip tanımında eksik
          const { error: e } = await supabase.auth.verifyOtp({
            type,
            token: code,
          });
          error = e;
        } else {
          error = { message: "Gerekli parametre bulunamadı." };
        }

        if (cancelled) return;

        if (error) {
          setState("error");
          setMsg(error.message || "Bağlantı geçersiz ya da süresi dolmuş.");
        } else {
          setState("ok");
        }
      } catch (e: any) {
        if (cancelled) return;
        setState("error");
        setMsg(e?.message || "Bir hata oluştu.");
      }
    })();

    return () => { cancelled = true; };
  }, [sp, code, tokenHash, type]);

  if (state === "loading") return null;

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
        <p className="opacity-80 mb-6">
          Hoş geldin! Hesabın başarıyla doğrulandı.
        </p>
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
