"use client";
import { motion } from "framer-motion";
import PhoneMockup from "@/components/PhoneMockup";

export default function Home() {
  const features = [
    {
      title: "Kişiselleştirilmiş Profil",
      text: "Memric’te profiliniz sadece bir kullanıcı adı değil; sizi en iyi şekilde temsil eden bir alan. Kişisel bilgilerinizi, ilgi alanlarınızı ve favorilerinizi ekleyerek diğer kullanıcıların sizi tanımasını kolaylaştırabilirsiniz. Profil sayfanız, uygulamadaki tüm etkileşimlerinizin merkezidir ve diğer özelliklerle etkileşimli çalışır.",
      image: "/profile.png",
      reverse: false
    },
    {
      title: "Günlük Sorular",
      text: "Her gün karşınıza çıkan özel sorular, hem kendinizi keşfetmenizi hem de farklı bakış açılarıyla düşünmenizi sağlar. Bu sorular, toplulukta yeni sohbetlerin başlangıç noktasıdır ve yanıtlarınız profilinizle entegre şekilde saklanır.",
      image: "/daily-question.png",
      reverse: true
    },
    {
      title: "Tematik Sohbetler",
      text: "Ortak ilgi alanlarına sahip kişilerle eşleşip 24 saat süreli özel sohbet odalarında buluşabilirsiniz. Sohbetler, seçtiğiniz temaya uygun sorular ve içeriklerle desteklenir, böylece iletişim daha verimli ve odaklı olur.",
      image: "/thematic-chat.png",
      reverse: false
    },
    {
      title: "Gezegen Hikayeleri (Wrap Sistemi)",
      text: "Memric’in wrap sistemi, astroloji ve kişisel gelişimi harmanlayan interaktif bir hikâye akışıdır. 7 aşamadan oluşur: giriş ve 6 farklı gezegen yorumu. Her gezegen, kişiliğinizin farklı bir yönünü keşfetmenizi sağlar. Story bar yapısıyla ilerleme durumunuzu takip edebilir, istediğiniz aşamada durup devam edebilirsiniz.",
      image: "/wrap-system.png",
      reverse: true
    }
  ];

  return (
    <main className="relative bg-[#1A1A1A] text-white overflow-hidden">
      
      {/* Blur arka plan efektleri */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute top-40 -right-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center min-h-screen text-center px-4 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-bold mb-4 text-pink-400"
        >
          Geleceğin Sosyal Deneyimi, Memric’te Başlıyor 🚀
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="max-w-2xl text-lg mb-8 text-gray-300"
        >
          Kendini keşfet, başkalarıyla anlamlı bağlantılar kur ve kişisel gelişim yolculuğunu tek bir uygulamada yaşa.
        </motion.p>
        <div className="space-x-4">
          <a
            href="#features"
            className="bg-pink-500 text-black font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition"
          >
            Hemen Katıl
          </a>
          <a
            href="#about"
            className="bg-transparent border border-pink-400 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-pink-500 hover:text-black transition"
          >
            Daha Fazla Bilgi
          </a>
        </div>
      </section>

      {/* Nedir Bu Memric? */}
      <section
        id="about"
        className="px-8 py-20 max-w-6xl mx-auto text-center md:text-left relative z-10"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold mb-6 text-center text-pink-400"
        >
          Nedir Bu Memric?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg max-w-3xl mx-auto text-gray-300"
        >
          Memric, sosyal bağlantılar ile kişisel gelişimi birleştiren yenilikçi bir platformdur. 
          Sadece sohbet etmek değil; anlamlı sorularla düşünmek, yeni insanlarla tanışmak ve 
          kendini geliştirmek için tasarlandı. İster günlük sorularla kendini keşfet, ister tematik sohbetler ile farklı bakış açıları kazan.
        </motion.p>
      </section>

      {/* Öne Çıkan Özellikler - Detaylı */}
      <section id="features" className="bg-[#111] relative z-10">
        {features.map((f, i) => (
          <section
            key={i}
            className={`px-8 py-20 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 ${
              f.reverse ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Telefon Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1 flex justify-center"
            >
              <PhoneMockup imageSrc={f.image} />
            </motion.div>

            {/* Açıklama */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1"
            >
              <h2 className="text-3xl font-bold text-pink-400 mb-4">{f.title}</h2>
              <p className="text-gray-300 leading-relaxed">{f.text}</p>
            </motion.div>
          </section>
        ))}
      </section>

      {/* CTA */}
      <section className="flex flex-col items-center justify-center py-20 text-center px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold mb-6 text-pink-400"
        >
          Sen de Memric’e Katıl ve Yolculuğuna Başla
        </motion.h2>
        <motion.a
          href="#"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-pink-500 text-black font-semibold px-8 py-4 rounded-full shadow-lg transition"
        >
          🚀 Hemen Başla
        </motion.a>
      </section>
    </main>
  );
}
