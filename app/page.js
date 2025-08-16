"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import PhoneMockup from "@/components/PhoneMockup";
import UserCount from "@/components/UserCount";
import InteractiveBackground from "@/components/InteractiveBackground";
import AudioToggle from "@/components/AudioToggle";
// ESKİ WordCycle yerine stabil sürümü kullanıyoruz
import WordCycleStable from "@/components/WordCycleStable";
// Pembe blur arkaplanı ayrı komponent
import BackgroundBlobs from "@/components/BackgroundBlobs";

// Swiper (wrap slider)
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

/* Wrap slider */
function WrapFeature() {
  return (
    <div className="flex-1 flex justify-center w-full max-w-xs sm:max-w-md">
      <Swiper
        modules={[Pagination]}
        spaceBetween={16}
        slidesPerView={1}
        pagination={{ clickable: true }}
        className="w-full"
      >
        <SwiperSlide>
          <PhoneMockup imageSrc="/images/wrapintro.jpeg" />
        </SwiperSlide>
        <SwiperSlide>
          <PhoneMockup imageSrc="/images/warpscore.jpeg" />
        </SwiperSlide>
        <SwiperSlide>
          <PhoneMockup imageSrc="/images/gunesburcu.jpeg" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default function Home() {
  const features = useMemo(
    () => [
      {
        title: "Kişiselleştirilmiş Profil",
        text:
          "Memric’te profiliniz sadece bir kullanıcı adı değil; sizi en iyi şekilde temsil eden bir alan. Kişisel bilgilerinizi, ilgi alanlarınızı ve favorilerinizi ekleyerek diğer kullanıcıların sizi tanımasını kolaylaştırabilirsiniz. Profil sayfanız, uygulamadaki tüm etkileşimlerinizin merkezidir ve diğer özelliklerle etkileşimli çalışır.",
        image: "/images/profilscreen.jpeg",
        reverse: false,
      },
      {
        title: "Günlük Sorular",
        text:
          "Her gün karşınıza çıkan özel sorular, hem kendinizi keşfetmenizi hem de farklı bakış açılarıyla düşünmenizi sağlar. Bu sorular, toplulukta yeni sohbetlerin başlangıç noktasıdır ve yanıtlarınız profilinizle entegre şekilde saklanır.",
        image: "/images/daily-question.png",
        reverse: true,
      },
      {
        title: "Tematik Sohbetler",
        text:
          "Ortak ilgi alanlarına sahip kişilerle eşleşip 24 saat süreli özel sohbet odalarında buluşabilirsiniz. Sohbetler, seçtiğiniz temaya uygun sorular ve içeriklerle desteklenir, böylece iletişim daha verimli ve odaklı olur.",
        image: "/images/thematic-chat.png",
        reverse: false,
      },
      {
        title: "Gezegen Hikayeleri (Wrap Sistemi)",
        text:
          "Memric’in wrap sistemi, astroloji ve kişisel gelişimi harmanlayan interaktif bir hikâye akışıdır. 7 aşamadan oluşur: giriş ve 6 farklı gezegen yorumu. Her gezegen, kişiliğinizin farklı bir yönünü keşfetmenizi sağlar. Story bar yapısıyla ilerleme durumunuzu takip edebilir, istediğiniz aşamada durup devam edebilirsiniz.",
        reverse: true,
        isWrap: true,
      },
    ],
    []
  );

  return (
    <main className="relative bg-[#0b0b0f] text-white overflow-hidden">
      {/* İnteraktif uzay arkaplanı + müzik toggle */}
      <InteractiveBackground />
      <AudioToggle />

      {/* Pembe blur arkaplan efektleri (mobilde daha küçük) */}
      <BackgroundBlobs />

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[75vh] sm:min-h-[85vh] text-center px-4 pt-[env(safe-area-inset-top)]">
        {/* Marjinal giriş: soru */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-xs sm:text-sm tracking-wider uppercase text-pink-300/80 mb-2 sm:mb-3"
        >
          Bugün kiminle gerçekten bağ kuracaksın?
        </motion.p>

        {/* Başlık + stabil kelime animasyonu */}
        <motion.h1
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-[28px] leading-tight sm:text-5xl font-bold mb-3 sm:mb-4"
        >
          Gelecek{" "}
          {/* mobilde alt satır, sm ve üstünde aynı satır → layout shift yok */}
          <span className="block sm:inline">
            <WordCycleStable
              words={["bir soru ile", "cesur bir sohbetle", "düşünerek", "seninle"]}
              interval={2200}
            />
          </span>{" "}
          başlar.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.9 }}
          className="max-w-xl sm:max-w-2xl text-base sm:text-lg mb-6 sm:mb-8 text-gray-300"
        >
          Memric’te cevap ver, farklı hayatlarla kesiş. Düşün, konuş, ilerle.
        </motion.p>

        {/* Sayaç */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.9 }}
          className="mb-6 sm:mb-10"
        >
          <UserCount />
        </motion.div>

        {/* Sade CTA'lar */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto max-w-xs sm:max-w-none">
          <a
            href="#features"
            className="w-full sm:w-auto text-center bg-pink-500 text-black font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition"
          >
            Hemen Katıl
          </a>
          <a
            href="#about"
            className="w-full sm:w-auto text-center bg-transparent border border-pink-400 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-pink-500 hover:text-black transition"
          >
            Daha Fazla Bilgi
          </a>
        </div>
      </section>

      {/* Nedir Bu Memric? */}
      <section
        id="about"
        className="px-4 sm:px-8 py-16 sm:py-20 max-w-6xl mx-auto text-center md:text-left relative z-10"
      >
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="text-2xl sm:text-3xl font-bold mb-5 sm:mb-6 text-center text-pink-400"
        >
          Nedir Bu Memric?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="text-base sm:text-lg max-w-3xl mx-auto text-gray-300"
        >
          Memric, sosyal bağlantılar ile kişisel gelişimi birleştiren yenilikçi bir platformdur.
          Sadece sohbet etmek değil; anlamlı sorularla düşünmek, yeni insanlarla tanışmak ve
          kendini geliştirmek için tasarlandı. İster günlük sorularla kendini keşfet, ister tematik sohbetler ile farklı bakış açıları kazan.
        </motion.p>
      </section>

      {/* Öne Çıkan Özellikler */}
      <section id="features" className="relative z-10 bg-[#0e0e13]/40">
        {features.map((f, i) => (
          <section
            key={i}
            className={`px-4 sm:px-8 py-16 sm:py-20 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 sm:gap-12 ${
              f.reverse ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Görsel / Slider */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              className="flex-1 flex justify-center"
            >
              {f.isWrap ? (
                <WrapFeature />
              ) : (
                <div className="w-full max-w-[15rem] sm:max-w-[20rem]">
                  <PhoneMockup imageSrc={f.image} />
                </div>
              )}
            </motion.div>

            {/* Açıklama */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="flex-1"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-pink-400 mb-3 sm:mb-4">
                {f.title}
              </h3>
              <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
                {f.text}
              </p>
            </motion.div>
          </section>
        ))}
      </section>

      {/* Alt CTA */}
      <section className="flex flex-col items-center justify-center py-16 sm:py-20 text-center px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-2xl sm:text-4xl font-bold mb-5 sm:mb-6 text-pink-400"
        >
          Yolculuğa Hazır mısın?
        </motion.h2>
        <a
          href="#features"
          className="bg-pink-500 text-black font-semibold px-7 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg hover:scale-105 transition"
        >
          🚀 Başlat
        </a>
      </section>
    </main>
  );
}
