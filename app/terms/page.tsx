"use client";

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-gray-800 leading-relaxed">
      <h1 className="text-3xl font-bold mb-6">Kullanım Koşulları</h1>
      <p className="mb-4">Yürürlük tarihi: 21.08.2025</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">1. Hizmetin Tanımı</h2>
      <p className="mb-4">
        Memric, kullanıcıların doğum bilgileri ve tercihleri üzerinden kişisel içerikler ve astrolojik analizler sunan sosyal bir keşif uygulamasıdır. Uygulama bir “arkadaşlık/dating” platformu değildir.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">2. Hesap Oluşturma</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Uygulamayı kullanmak için 13 yaşından büyük olmanız gerekir.</li>
        <li>Hesap oluştururken doğru ve güncel bilgiler vermek zorundasınız.</li>
        <li>Hesap bilgilerinizin güvenliğinden siz sorumlusunuz.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">3. Kullanıcı Davranışları</h2>
      <p className="mb-4">Kullanıcılar şunları yapamaz:</p>
      <ul className="list-disc list-inside space-y-2">
        <li>Yasa dışı, saldırgan, taciz edici veya uygunsuz içerikler paylaşmak,</li>
        <li>Başkalarının haklarını (telif, marka, gizlilik) ihlal etmek,</li>
        <li>Uygulamanın güvenliğini tehlikeye atacak eylemlerde bulunmak.</li>
      </ul>
      <p className="mb-4">
        Bu kuralları ihlal eden kullanıcıların hesapları uyarı olmaksızın askıya alınabilir veya silinebilir.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">4. Verilerin Kullanımı</h2>
      <p className="mb-4">
        Kişisel verileriniz Gizlilik Politikamız uyarınca işlenir. Detaylar için{" "}
        <a href="/privacy" className="text-blue-600 underline">Gizlilik Politikası</a>{" "} sayfamıza bakabilirsiniz.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">5. Hizmetin Değiştirilmesi</h2>
      <p className="mb-4">
        Memric, uygulamanın özelliklerini değiştirme, geçici olarak durdurma veya tamamen sonlandırma hakkını saklı tutar.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">6. Sorumluluk Reddi</h2>
      <p className="mb-4">
        Memric, sağlanan içeriklerin doğruluğu veya sonuçları hakkında garanti vermez. Uygulama “olduğu gibi” sunulmaktadır. Kullanıcı, hizmeti kendi sorumluluğunda kullanır.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">7. İletişim</h2>
      <p>
        Her türlü soru için bizimle iletişime geçebilirsiniz:{" "}
        <a href="mailto:support@memric.app" className="text-blue-600 underline">
          support@memric.app
        </a>
      </p>
    </div>
  );
}
