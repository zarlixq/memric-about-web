"use client";

import React from "react";

export default function ChildSafetyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-gray-800 leading-relaxed">
      <h1 className="text-3xl font-bold mb-6">Çocuk Güvenliği Politikası</h1>

      <p className="mb-4">
        <strong>Memric</strong> olarak, çocukların güvenliğini en üst düzeyde
        korumak bizim önceliğimizdir. Uygulamamızda çocukların güvenli, saygılı
        ve sağlıklı bir dijital deneyim yaşamalarını sağlamak amacıyla aşağıdaki
        prensiplere bağlıyız:
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        1. Çocukların Güvenliği Önceliğimizdir
      </h2>
      <p className="mb-4">
        Çocuklara yönelik cinsel istismar, sömürü veya uygunsuz davranışlara
        karşı <strong>sıfır tolerans politikası</strong> uygularız. Bu tür
        içerik veya davranışlar tespit edildiğinde derhal kaldırılır ve yetkili
        makamlara bildirilir.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        2. Güvenli İletişim ve Etkileşim
      </h2>
      <p className="mb-4">
        Kullanıcılar arasında güvenli iletişimi desteklemek için moderasyon ve
        raporlama mekanizmaları uygularız. Uygulama üzerinden gelen tüm ihlaller
        titizlikle incelenir ve hızlı şekilde yanıtlanır.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Raporlama ve Bildirim</h2>
      <p className="mb-4">
        Kullanıcılar, çocuk güvenliği ile ilgili herhangi bir ihlali doğrudan
        uygulama içinden veya{" "}
        <a
          href="mailto:support@memric.app"
          className="text-blue-600 underline"
        >
          support@memric.app
        </a>{" "}
        adresi üzerinden bize bildirebilir. Alınan her bildirim şeffaf şekilde
        değerlendirilir ve gerektiğinde yerel yasalara uygun biçimde{" "}
        <strong>ilgili mercilere rapor edilir</strong>.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        4. Eğitim ve Farkındalık
      </h2>
      <p className="mb-4">
        Ebeveynleri ve kullanıcıları bilinçlendirmek için rehber içerikler
        sunmayı hedefliyoruz. Çocukların dijital ortamda daha güvenli
        hareket etmelerine destek olacak bilgilendirmeler sağlayacağız.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Yasal Uyum</h2>
      <p className="mb-4">
        Uygulamamız, yürürlükteki tüm ulusal ve uluslararası çocuk güvenliği
        yasalarına uygundur. <strong>Çocukların çevrimiçi güvenliği</strong>{" "}
        konusundaki yasal düzenlemelere bağlı kalarak sürekli iyileştirmeler
        yaparız.
      </p>

      <p className="mt-8 text-sm text-gray-600">
        📌 Bu politika, çocukların korunması ve güvenli bir dijital deneyim
        sağlamak için sürekli gözden geçirilir ve gerektiğinde güncellenir.
        Herhangi bir sorunuz veya endişeniz olduğunda bizimle iletişime
        geçebilirsiniz:{" "}
        <a
          href="mailto:support@memric.app"
          className="text-blue-600 underline"
        >
          support@memric.app
        </a>
      </p>
    </div>
  );
}
