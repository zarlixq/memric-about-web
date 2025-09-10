export default function EulaPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Kullanım Koşulları (EULA)</h1>

      <p className="mb-4">
        Bu Son Kullanıcı Lisans Anlaşması ("EULA"), sizin ("Kullanıcı") ile
        Memric ("Uygulama") arasında yapılmıştır. Uygulamayı indirerek, yükleyerek
        veya kullanarak bu şartları kabul etmiş olursunuz.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Lisans</h2>
      <p className="mb-4">
        Size sadece kişisel ve ticari olmayan amaçlarla, devredilemez ve münhasır
        olmayan sınırlı bir lisans verilmektedir.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Kullanım Kısıtlamaları</h2>
      <ul className="list-disc list-inside mb-4 space-y-2">
        <li>Uygulamanın kaynak kodunu kopyalayamaz, değiştiremez, tersine mühendislik yapamazsınız.</li>
        <li>Uygulama yasa dışı, kötüye kullanım amaçlı veya dolandırıcılık için kullanılamaz.</li>
        <li>İzinsiz dağıtım yapılamaz.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Erişim ve Uygunluk</h2>
      <p className="mb-4">
        Kullanıcı en az 13 yaşında olduğunu beyan eder. Uygulama yalnızca desteklenen cihazlarda ve işletim sistemlerinde kullanılabilir.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Üçüncü Taraf Servisler</h2>
      <p className="mb-4">
        Uygulama, üçüncü taraf hizmetlerden (ör. Supabase, astroloji API’leri) faydalanabilir.
        Bu hizmetlerdeki kesinti veya sorunlardan Memric sorumlu değildir.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Fesih</h2>
      <p className="mb-4">
        Kullanıcı bu EULA şartlarını ihlal ederse, Memric hesabı derhal askıya alma
        veya sonlandırma hakkını saklı tutar.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Sorumluluk Reddi</h2>
      <p className="mb-4">
        Uygulama "olduğu gibi" sunulmaktadır. Memric, hatalar, kesintiler veya veri kayıplarından
        sorumlu tutulamaz. Kullanıcı, uygulamayı kendi riskinde kullanmayı kabul eder.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Gizlilik</h2>
      <p className="mb-4">
        Kullanıcı bilgileri Gizlilik Politikası kapsamında işlenir. Daha fazla bilgi için
        <a href="/privacy" className="text-purple-600 underline"> Gizlilik Politikası</a> sayfasını inceleyebilirsiniz.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">8. Değişiklikler</h2>
      <p className="mb-4">
        Memric, bu EULA’yı zaman zaman güncelleyebilir. Değişiklikler web sitesinde yayımlandığı anda geçerlilik kazanır.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">9. Uygulanacak Hukuk</h2>
      <p className="mb-4">
        Bu anlaşma, Türkiye Cumhuriyeti yasalarına tabi olacaktır. Uyuşmazlık halinde İstanbul mahkemeleri yetkilidir.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">10. İletişim</h2>
      <p>
        Herhangi bir sorunuz için bize
        <a href="mailto:support@memric.app" className="text-purple-600 underline"> support@memric.app</a>
        adresinden ulaşabilirsiniz.
      </p>
    </main>
  );
}
