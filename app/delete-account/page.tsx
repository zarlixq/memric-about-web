"use client";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

// Hesap silme nedenleri
type ReasonKey =
  | "privacy"
  | "bugs"
  | "usability"
  | "notifications"
  | "newaccount"
  | "notuseful"
  | "other";

const REASONS: { key: ReasonKey; label: string }[] = [
  { key: "privacy", label: "Gizlilik / güvenlik endişesi" },
  { key: "bugs", label: "Hatalar / performans sorunları" },
  { key: "usability", label: "Kullanım zorluğu / aradığımı bulamadım" },
  { key: "notifications", label: "Çok fazla bildirim" },
  { key: "newaccount", label: "Yeni hesap açmak istiyorum" },
  { key: "notuseful", label: "Uygulamayı artık kullanmıyorum" },
  { key: "other", label: "Diğer (aşağıya yaz)" },
];

export default function DeleteAccountPage() {
  // Geri bildirim ve silme formu durumları
  const [selected, setSelected] = useState<ReasonKey[]>([]);
  const [otherText, setOtherText] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Giriş formu durumları
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Kullanıcı oturum durumu için `undefined` (yükleniyor), `null` (giriş yapmadı), string (e-posta)
  const [email, setEmail] = useState<string | null | undefined>(undefined);

  const supabase = createClientComponentClient();
  const router = useRouter();

  // Sayfa yüklendiğinde oturum durumunu kontrol et
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setEmail(session?.user?.email || null);
    });
  }, [supabase.auth]);

  const toggle = (k: ReasonKey) => {
    setSelected((prev) =>
      prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k]
    );
  };

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });

    if (error) {
      setLoginError("Geçersiz e-posta veya şifre.");
    } else {
      // Giriş başarılı, sayfayı yenileyerek oturum durumunu güncelle
      router.refresh();
      // E-postayı ayarla, bu durum silme formunu gösterecek
      const { data: { user } } = await supabase.auth.getUser();
      setEmail(user?.email || null);
    }
    setLoginLoading(false);
  };

  const onDelete = async () => {
    setError(null);
    if (!confirm) {
      return setError("Lütfen işlemi anladığınızı onaylayın.");
    }
    if (selected.length === 0) {
      return setError("Lütfen en az bir neden seçin.");
    }

    setLoading(true);

    try {
      const res = await fetch("/api/account/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reasons: selected, otherText }),
      });
      if (!res.ok) {
        throw new Error(await res.text());
      }
      setDone(true);
    } catch (e: any) {
      setError(e?.message || "İşlem başarısız oldu");
    } finally {
      setLoading(false);
    }
  };

  // Yükleniyor durumu
  if (email === undefined) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-lg text-gray-700">Oturum kontrol ediliyor...</p>
      </div>
    );
  }

  // Kullanıcı giriş yapmamışsa, giriş formunu göster
  if (email === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-16">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-4">Hesabını Sil</h1>
          <p className="text-gray-600 mb-6">
            Hesabını silme işlemine devam etmek için lütfen giriş yap.
          </p>
          <form onSubmit={onLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">E-posta</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
                className="mt-1 w-full rounded-xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Şifre</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                className="mt-1 w-full rounded-xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {loginError && <div className="text-sm text-red-600">{loginError}</div>}
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium disabled:opacity-60"
            >
              {loginLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Silme işlemi tamamlandıysa, başarılı mesajı göster
  if (done) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-16">
        <div className="max-w-xl w-full bg-white rounded-2xl shadow p-8">
          <h1 className="text-2xl font-semibold mb-3">Hesabınız silindi</h1>
          <p className="mb-4 text-gray-700">
            Kişisel bilgileriniz anonimleştirildi ve hesabınız kapatıldı.
            Sohbet geçmişleri karşı tarafta “Silinmiş hesap” olarak görünebilir.
          </p>
          <a className="inline-block mt-2 text-blue-600 underline" href="/">
            Ana sayfaya dön
          </a>
        </div>
      </div>
    );
  }

  // Kullanıcı giriş yapmışsa, silme formunu göster
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-16">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Hesabımı Sil</h1>
          <p className="text-gray-600 mt-2">
            Bu işlem geri alınamaz. Kimliğiniz ve kişisel verileriniz derhal
            anonimleştirilecek, mesajlarınız diğer kullanıcılara “Silinmiş
            hesap” olarak görünecektir.
          </p>
        </div>

        {email && (
          <div className="mb-4 text-sm text-gray-500">
            Giriş yapılan hesap:{" "}
            <span className="font-medium text-gray-800">{email}</span>
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">
            Neden silmek istiyorsunuz? (Birden fazla seçebilirsiniz)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {REASONS.map((r) => (
              <label
                key={r.key}
                className={`border rounded-xl p-3 cursor-pointer flex items-start gap-3 ${
                  selected.includes(r.key)
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={selected.includes(r.key)}
                  onChange={() => toggle(r.key)}
                />
                <span className="text-sm">{r.label}</span>
              </label>
            ))}
          </div>
          <textarea
            placeholder="İsterseniz kısa bir açıklama bırakın (opsiyonel)"
            className="mt-4 w-full rounded-xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            value={otherText}
            onChange={(e) => setOtherText(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={confirm}
              onChange={(e) => setConfirm(e.target.checked)}
            />
            <span className="text-sm text-gray-700">
              Hesabımı kalıcı olarak silmeyi ve kişisel bilgilerimin
              anonimleştirilmesini kabul ediyorum.
            </span>
          </label>
        </div>

        {error && <div className="mb-4 text-sm text-red-600">{error}</div>}

        <div className="flex items-center gap-3">
          <button
            onClick={onDelete}
            disabled={loading}
            className="px-5 py-2.5 rounded-xl bg-red-600 text-white font-medium disabled:opacity-60"
          >
            {loading ? "Siliniyor…" : "Hesabımı Sil"}
          </button>
          <a href="/" className="text-gray-600 hover:text-gray-800">
            Vazgeç
          </a>
        </div>

        <p className="mt-6 text-xs text-gray-500">
          Not: Güvenlik amaçlı IP ve cihaz bilgisi sınırlı ölçüde kaydedilebilir.
        </p>
      </div>
    </div>
  );
}
