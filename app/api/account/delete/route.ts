import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });

  const { data: { user }, error: authErr } = await supabase.auth.getUser();
  if (authErr || !user) {
    return new NextResponse("Giriş yapılmış bir hesap gerekli", { status: 401 });
  }

  let reasons: string[] = [];
  let otherText = "";
  try {
    const body = await req.json();
    reasons = Array.isArray(body?.reasons) ? body.reasons : [];
    otherText = typeof body?.otherText === "string" ? body.otherText : "";
  } catch {
    // Veri okunamasa bile silme işlemine devam et.
  }

  try {
    await supabase.from("feedbacks").insert({
      type: reasons.join(","),
      message: otherText?.slice(0, 2000) || null,
    });
  } catch (e) {
    console.error("Feedback kaydı sırasında hata:", e);
  }

  const { error: rpcErr } = await supabase.rpc("hard_delete_user", { u: user.id });
  
  if (rpcErr) {
    console.error("hard_delete_user RPC error:", rpcErr);
    return new NextResponse("Silme işlemi başarısız oldu", { status: 500 });
  }

  try {
    await supabase.auth.signOut({ scope: "global" });
  } catch {
    // @ts-ignore
    await supabase.auth.signOut();
  }

  return NextResponse.json({ ok: true });
}