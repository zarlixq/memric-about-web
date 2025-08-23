'use client';

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type State = "loading" | "ok" | "error" | "unauthorized";

export default function ConfirmClient() {
  const sp = useSearchParams();
  const secret = sp.get("memric_secret");
  const [state, setState] = useState<State>("loading");
  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    if (!secret) {
      setState("unauthorized");
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const { data, error } = await supabase.auth.getUser();

        if (cancelled) return;

        if (error) {
          setState("error");
          setMsg(error.message || "Kullanıcı alınamadı.");
          return;
        }

        const user = data?.user;
        const confirmedAt = (user as any)?.email_confirmed_at;

        if (confirmedAt) {
          setState("ok");
        } else {
          setState("error");
          setMsg("E-posta doğrulanmamış veya link geçersiz.");
        }
      } catch (e: any) {
        if (cancelled) return;
        setState("error");
        setMsg(e?.message || "Bir hata oluştu.");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [secret]);

  if (state === "loading") return null;

  if (state === "unauthorized") {
    return (
      <main className="min-h-screen grid place-items-center p-4">
        <div className="max-w-md w-full border rounded-2xl p-6 text-center">
          <h1 className="text-xl font-semibold mb-2">Yetkisiz erişim</h1>
          <p className="opacity-80">
            Bu sayfaya yalnızca doğrulama e-postasındaki bağlantıyla erişebilirsin.
          </p>
        </div>
      </main>
    );
  }

  if (state === "error") {
    return (
      <main className="min-h-screen grid place-items-center p-4">
        <div className="max-w-md w-full border rounded-2xl p-6 text-center">
          <h1 className="text-xl font-semibold mb-2">Doğrulama başarısız</h1>
          <p className="opacity-80">{msg}</p>
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
      </div>
    </main>
  );
}
