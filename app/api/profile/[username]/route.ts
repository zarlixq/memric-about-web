// app/api/profile/[username]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic"; // her istekte çalışsın
export const revalidate = 0;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // anon key yeterli
);

export async function GET(
  _req: NextRequest,
  ctx: { params: { username: string } } // <— destrüktüre etme
) {
  try {
    const { username } = ctx.params;
    console.log("📩 API isteği geldi, username:", username);

    // 1) user
    const { data: user, error: userError } = await supabase
      .from("users")
      .select(
        "id, username, zodiac_sign, show_zodiac, is_hidden, school, hobbies, red_lines, phobias, countries_visited, languages_known"
      )
      .eq("username", username)
      .single();

    if (userError) {
      console.error("❌ User sorgu hatası:", userError.message);
      return NextResponse.json(
        { error: "Kullanıcı sorgusunda hata" },
        { status: 500 }
      );
    }

    if (!user) {
      console.warn("⚠️ Kullanıcı bulunamadı:", username);
      return NextResponse.json({ error: "Kullanıcı bulunamadı" }, { status: 404 });
    }

    if (user.is_hidden) {
      console.warn("🙈 Kullanıcı profili gizli:", username);
      return NextResponse.json({ error: "Bu profil gizli" }, { status: 403 });
    }

    // 2) diğer tablolar
    const userId = user.id;

    const [
      { data: listened_artists = [], error: e1 },
      { data: favorite_songs = [], error: e2 },
      { data: favorite_series = [], error: e3 },
      { data: favorite_movies = [], error: e4 },
      { data: favorite_actors = [], error: e5 },
      { data: currently_listening_songs = [], error: e6 },
    ] = await Promise.all([
      supabase.from("listened_artists").select("*").eq("user_id", userId),
      supabase.from("favorite_songs").select("*").eq("user_id", userId),
      supabase.from("favorite_series").select("*").eq("user_id", userId),
      supabase.from("favorite_movies").select("*").eq("user_id", userId),
      supabase.from("favorite_actors").select("*").eq("user_id", userId),
      supabase.from("currently_listening_songs").select("*").eq("user_id", userId),
    ]);

    // toplu hata log (isteği yine de 200 döndürüyoruz)
    const qErrors = [e1, e2, e3, e4, e5, e6].filter(Boolean);
    if (qErrors.length) {
      console.warn("ℹ️ Bazı listeler çekilirken uyarı:", qErrors.map((x) => x?.message));
    }

    const payload = {
      user,
      listened_artists,
      favorite_songs,
      favorite_series,
      favorite_movies,
      favorite_actors,
      currently_listening_songs,
    };

    console.log("✅ Profil verisi hazır:", username);
    return NextResponse.json(payload, { status: 200 });
  } catch (err) {
    console.error("💥 Beklenmedik hata:", err);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
