"use client";

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-gray-800 leading-relaxed">
      <h1 className="text-3xl font-bold mb-6">Gizlilik Politikası</h1>
      <p className="mb-4">Yürürlük tarihi: 21.08.2025</p>

      <p className="mb-6">
        Memric’e hoş geldiniz. Bu Gizlilik Politikası, uygulamamız aracılığıyla topladığımız kişisel verileri nasıl işlediğimizi, koruduğumuzu ve kullanıcıların kendi verileri üzerindeki haklarını nasıl kullanabileceklerini açıklar.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">1. Toplanan Bilgiler</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Hesap bilgileri: e-posta adresi, kullanıcı adı, şifre.</li>
        <li>Doğum bilgileri: doğum tarihi, doğum saati, doğum yeri.</li>
        <li>Profil bilgileri: isteğe bağlı hobiler, müzik, film ve kültür tercihleri.</li>
        <li>Kullanım bilgileri: uygulama içi gezinti, favoriler, raporlanan hatalar.</li>
        <li>Cihaz bilgileri: IP adresi, cihaz türü, işletim sistemi, bağlantı bilgileri.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">2. Bilgilerin Kullanımı</h2>
      <p className="mb-4">
        Toplanan bilgiler şu amaçlarla kullanılır:
      </p>
      <ul className="list-disc list-inside space-y-2">
        <li>Kullanıcı hesabını oluşturmak ve giriş işlemlerini sağlamak.</li>
        <li>Astrolojik analizler ve kişiselleştirilmiş içerikler üretmek.</li>
        <li>Uygulamanın performansını iyileştirmek, hataları gidermek.</li>
        <li>Kullanıcıya destek sağlamak (<a href="mailto:support@memric.app" className="text-blue-600 underline">support@memric.app</a>).</li>
        <li>Yasal yükümlülüklere uymak.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">3. Veri Paylaşımı</h2>
      <p className="mb-4">
        Memric kullanıcı verilerini üçüncü taraflarla satmaz, kiralamaz. Veriler yalnızca:
      </p>
      <ul className="list-disc list-inside space-y-2">
        <li>Servis sağlayıcılarla (ör. barındırma altyapısı: Supabase, analiz servisleri).</li>
        <li>Yasal makamlarla (mevzuata uymak gerektiğinde) paylaşılabilir.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">4. Veri Güvenliği</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Tüm veriler şifrelenmiş bağlantılar (HTTPS, TLS) ile iletilir.</li>
        <li>Parolalar güvenli algoritmalarla saklanır (hash & salt).</li>
        <li>Yetkisiz erişimi önlemek için düzenli denetimler yapılır.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">5. Kullanıcı Kontrolleri</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Profillerini düzenleyebilir veya silebilir.</li>
        <li>Hesap kapatma talebinde bulunabilir (<a href="mailto:support@memric.app" className="text-blue-600 underline">support@memric.app</a>).</li>
        <li>Kaydedilen verilerinin silinmesini isteyebilir.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">6. Çerezler ve İzleme</h2>
      <p className="mb-4">
        Memric, uygulama içi tercihleri hatırlamak ve kullanım verilerini analiz etmek için sınırlı ölçüde çerez benzeri teknolojiler kullanabilir.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">7. Çocukların Gizliliği</h2>
      <p className="mb-4">
        Memric yalnızca 13 yaş ve üzeri kullanıcılar içindir. Çocuklardan bilerek veri toplanmaz. Eğer bir çocuğun verileri yanlışlıkla toplanmışsa, veli tarafından başvuru yapıldığında derhal silinir.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">8. Değişiklikler</h2>
      <p className="mb-4">
        Gizlilik Politikası zaman zaman güncellenebilir. Güncellemeler bu sayfa üzerinden yayınlanır ve yürürlük tarihi revize edilir.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">9. İletişim</h2>
      <p>
        Her türlü soru ve talebiniz için:{" "}
        <a href="mailto:support@memric.app" className="text-blue-600 underline">
          support@memric.app
        </a>
      </p>
    </div>
  );
}
