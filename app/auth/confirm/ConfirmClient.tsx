'use client';
import { useSearchParams } from "next/navigation";

export default function ConfirmClient() {
  const sp = useSearchParams();
  const secret = sp.get("memric_secret");

  if (!secret) {
    return (
      <main className="min-h-screen grid place-items-center p-4">
        <div className="max-w-md w-full border rounded-2xl p-6 text-center">
          <h1 className="text-xl font-semibold mb-2">Yetkisiz erişim</h1>
          <p className="opacity-80">Bu sayfaya yalnızca doğrulama e-postasındaki bağlantıyla erişebilirsin.</p>
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
