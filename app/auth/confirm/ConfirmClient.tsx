"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

// Supabase istemcisini sadece bir kez burada oluşturuyoruz
// Bu, "Multiple GoTrueClient" hatasını önlemek için önemlidir.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type VerifyType = "signup" | "email_change" | "recovery" | "magiclink";
type State = "loading" | "ok" | "error";

export default function ConfirmClient() {
  const sp = useSearchParams();
  const router = useRouter();

  const tokenHash = sp.get("token_hash") ?? sp.get("token");
  const type = (sp.get("type") as VerifyType) || "signup";

  const [state, setState] = useState<State>("loading");
  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    // Adım 1: useEffect'in çalıştığını kontrol et.
    console.log("useEffect çalıştı.");

    // URL parametreleri yüklenmediyse bekle, erken yönlendirmeyi önle.
    if (!sp.size) {
      console.log("URL parametreleri henüz yüklenmedi, bekleniyor...");
      return;
    }

    // Adım 2: URL parametrelerinin okunup okunmadığını kontrol et.
    console.log("URL'den okunan tokenHash değeri:", tokenHash);
    console.log("URL'den okunan type değeri:", type);
    console.log("Tam URL parametreleri:", sp.toString());

    if (!tokenHash) {
      // Adım 3: Eğer token yoksa ana sayfaya yönlendir.
      console.log("TokenHash bulunamadı, ana sayfaya yönlendiriliyor.");
      router.replace("/");
      return;
    }

    // Adım 4: Token okunduysa Supabase doğrulamasını başlat.
    console.log("TokenHash başarıyla okundu. Supabase doğrulama başlatılıyor...");

    let cancelled = false;
    (async () => {
      try {
        const { error } = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type,
        });

        if (cancelled) return;

        if (error) {
          // Adım 5: Doğrulama hatası varsa konsola yaz.
          console.error("Supabase doğrulama hatası:", error.message);
          setState("error");
          setMsg(error.message || "Bağlantı geçersiz ya da süresi dolmuş.");
          return;
        }

        // Adım 6: Doğrulama başarılı.
        console.log("Doğrulama başarılı. Kullanıcı giriş yapabilir.");
        setState("ok");
      } catch (e: any) {
        if (cancelled) return;
        // Adım 7: Beklenmedik bir JavaScript hatası varsa konsola yaz.
        console.error("Beklenmedik bir hata oluştu:", e);
        setState("error");
        setMsg(e?.message || "Bir hata oluştu.");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [tokenHash, type, router, sp]);

  if (state === "loading") {
    return null; // Fallback'i Suspense gösteriyor
  }

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