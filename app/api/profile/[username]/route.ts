// app/api/profile/[username]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await context.params; // 🔑 params artık await edilmek zorunda
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
      return NextResponse.json({ error: "Kullanıcı sorgusunda hata" }, { status: 500 });
    }

    if (!user) {
      return NextResponse.json({ error: "Kullanıcı bulunamadı" }, { status: 404 });
    }

    if (user.is_hidden) {
      return NextResponse.json({ error: "Bu profil gizli" }, { status: 403 });
    }

    // 2) diğer tablolar
    const userId = user.id;
    const [
      { data: listened_artists = [] },
      { data: favorite_songs = [] },
      { data: favorite_series = [] },
      { data: favorite_movies = [] },
      { data: favorite_actors = [] },
      { data: currently_listening_songs = [] },
    ] = await Promise.all([
      supabase.from("listened_artists").select("*").eq("user_id", userId),
      supabase.from("favorite_songs").select("*").eq("user_id", userId),
      supabase.from("favorite_series").select("*").eq("user_id", userId),
      supabase.from("favorite_movies").select("*").eq("user_id", userId),
      supabase.from("favorite_actors").select("*").eq("user_id", userId),
      supabase.from("currently_listening_songs").select("*").eq("user_id", userId),
    ]);

    return NextResponse.json(
      {
        user,
        listened_artists,
        favorite_songs,
        favorite_series,
        favorite_movies,
        favorite_actors,
        currently_listening_songs,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("💥 Beklenmedik hata:", err);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
