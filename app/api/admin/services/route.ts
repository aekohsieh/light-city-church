import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getServices } from "@/lib/queries";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth";

async function isAuthed(request: NextRequest) {
  return await verifySessionToken(request.cookies.get(SESSION_COOKIE_NAME)?.value);
}

export async function GET(request: NextRequest) {
  if (!(await isAuthed(request))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const services = await getServices();
  return NextResponse.json({ services });
}

export async function PUT(request: NextRequest) {
  if (!(await isAuthed(request))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json(
      {
        error:
          "尚未設定 Supabase（環境變數 NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY），無法儲存。"
      },
      { status: 500 }
    );
  }

  const body = await request.json().catch(() => null);
  const services = body?.services;
  if (!Array.isArray(services)) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  const rows = services.map((s, i) => ({
    id: s.id,
    name: s.name,
    time: s.time,
    location: s.location,
    description: s.description,
    href: s.href,
    sort_order: i + 1
  }));

  const { error } = await supabaseAdmin.from("services").upsert(rows, { onConflict: "id" });

  if (error) {
    console.error("[admin/services PUT] Supabase error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
