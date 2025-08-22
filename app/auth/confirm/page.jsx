"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function ConfirmEmailPage() {
  const sp = useSearchParams();
  const router = useRouter();

  const token_hash = sp.get("token_hash");
  const type = (sp.get("type") || "signup"); // 'signup', 'email_change', 'recovery', 'magiclink'

  const [state, setState] = useState("loading"); // "loading" | "ok" | "error"
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!token_hash) {
      router.replace("/"); // elle yazıp gireni içeri alma
      return;
    }

    (async () => {
      try {
        const { error } = await supabase.auth.verifyOtp({ token_hash, type });
        if (error) {
          setState("error");
          setMsg(error.message || "Bağlantı geçersiz ya da süresi dolmuş.");
          return;
        }
        setState("ok");
      } catch (e) {
        setState("error");
        setMsg(e?.message || "Bir hata oluştu.");
      }
    })();
  }, [token_hash, type, router]);

  if (state === "loading") {
    return (
      <main className="min-h-screen grid place-items-center">
        <div className="opacity-70">Doğrulanıyor…</div>
      </main>
    );
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
        <button onClick={() => router.push("/login")} className="px-4 py-2 bg-black text-white rounded-lg">
          Giriş yap
        </button>
      </div>
    </main>
  );
}
