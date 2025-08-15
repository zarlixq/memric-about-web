"use client";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import CountUp from "react-countup";

export default function UserCount() {
  const [count, setCount] = useState(null);
  const [mounted, setMounted] = useState(false); // SSR/hydration için
  const prev = useRef(0); // önceki değerden yeni değere akıcı geçiş

  useEffect(() => {
    setMounted(true);
    const fetchCount = async () => {
      const { count: c, error } = await supabase
        .from("users")
        .select("*", { count: "exact", head: true });

      if (!error && typeof c === "number") {
        prev.current = count ?? 0; // ilk animasyon 0->c
        setCount(c);
      }
    };

    fetchCount();

    // Realtime: her insert/update/delete'te tekrar say
    const channel = supabase
      .channel("realtime-users")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "users" },
        fetchCount
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [count]);

  return (
    <div className="text-center">
      <h3 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-pink-400 drop-shadow-lg">
        {!mounted || count === null ? (
          "..."
        ) : (
          <CountUp start={prev.current} end={count} duration={1.6} />
        )}
      </h3>
      <p className="text-gray-300 text-base sm:text-lg mt-2">
        Kullanıcı Memric&apos;e katıldı
      </p>
    </div>
  );
}
