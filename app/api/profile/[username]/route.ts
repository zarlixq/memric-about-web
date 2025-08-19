import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // anon key yeterli, service role kullanma
);

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;
    console.log("📩 API isteği geldi, username:", username);

    // 1. User bilgilerini çek
    const { data: user, error: userError } = await supabase
      .from("users")
      .select(
        "id, username, zodiac_sign, show_zodiac, is_hidden, school, hobbies, red_lines, phobias, countries_visited, languages_known"
      )
      .eq("username", username)
      .single();

    if (userError) {
      console.error("❌ User sorgu hatası:", userError.message);
      return NextResponse.json({ error: "Kullanıcı sorgusunda hata" }, { status: 500 });
    }

    if (!user) {
      console.warn("⚠️ Kullanıcı bulunamadı:", username);
      return NextResponse.json({ error: "Kullanıcı bulunamadı" }, { status: 404 });
    }

    if (user.is_hidden) {
      console.warn("🙈 Kullanıcı profili gizli:", username);
      return NextResponse.json({ error: "Bu profil gizli" }, { status: 403 });
    }

    // 2. Diğer tabloları user_id ile çek
    const userId = user.id;

    const queries = {
      listened_artists: supabase.from("listened_artists").select("*").eq("user_id", userId),
      favorite_songs: supabase.from("favorite_songs").select("*").eq("user_id", userId),
      favorite_series: supabase.from("favorite_series").select("*").eq("user_id", userId),
      favorite_movies: supabase.from("favorite_movies").select("*").eq("user_id", userId),
      favorite_actors: supabase.from("favorite_actors").select("*").eq("user_id", userId),
      currently_listening_songs: supabase.from("currently_listening_songs").select("*").eq("user_id", userId),
    };

    const results = await Promise.all(Object.values(queries));

    // Map sonuçları tablo adına göre koy
    const data = {
      user,
      listened_artists: results[0].data ?? [],
      favorite_songs: results[1].data ?? [],
      favorite_series: results[2].data ?? [],
      favorite_movies: results[3].data ?? [],
      favorite_actors: results[4].data ?? [],
      currently_listening_songs: results[5].data ?? [],
    };

    // 📊 Loglar
    console.log("✅ Profil verisi hazır:", username);
    console.log("👤 User:", user);
    console.log("🎵 listened_artists:", data.listened_artists.length, "kayıt");
    console.log("💜 favorite_songs:", data.favorite_songs.length, "kayıt");
    console.log("📺 favorite_series:", data.favorite_series.length, "kayıt");
    console.log("🎬 favorite_movies:", data.favorite_movies.length, "kayıt");
    console.log("⭐ favorite_actors:", data.favorite_actors.length, "kayıt");
    console.log("🎧 currently_listening_songs:", data.currently_listening_songs.length, "kayıt");

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("💥 Beklenmedik hata:", err);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
