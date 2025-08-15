"use client";
import { useEffect, useRef, useState } from "react";

export default function AudioToggle() {
  const [on, setOn] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Hazır değilse element oluştur
    if (!audioRef.current) {
      const el = document.createElement("audio");
      el.src = "/audio/space.mp3"; // → public/audio/space.mp3 koy
      el.loop = true;
      el.volume = 0.18;
      audioRef.current = el;
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const toggle = async () => {
    if (!audioRef.current) return;
    if (on) {
      audioRef.current.pause();
      setOn(false);
    } else {
      try {
        await audioRef.current.play(); // user gesture gerekli
        setOn(true);
      } catch {
        // autoplay engeli
        setOn(false);
      }
    }
  };

  return (
    <button
      onClick={toggle}
      className={`fixed right-4 bottom-4 z-50 rounded-full border border-white/20 px-4 py-2 text-sm backdrop-blur-xl bg-white/10 hover:bg-white/15 transition ${
        on ? "text-pink-300" : "text-gray-300"
      }`}
      title={on ? "Müziği durdur" : "Müziği başlat"}
    >
      {on ? "🔊 Uzay müziği açık" : "🔈 Uzay müziği"}
    </button>
  );
}
