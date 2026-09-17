import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getEvents } from "@/lib/queries";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth";

async function isAuthed(request: NextRequest) {
  return await verifySessionToken(request.cookies.get(SESSION_COOKIE_NAME)?.value);
}

export async function GET(request: NextRequest) {
  if (!(await isAuthed(request))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const events = await getEvents();
  return NextResponse.json({ events });
}

export async function PUT(request: NextRequest) {
  if (!(await isAuthed(request))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: "尚未設定 Supabase，無法儲存。" },
      { status: 500 }
    );
  }

  const body = await request.json().catch(() => null);
  const events = body?.events;
  if (!Array.isArray(events)) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  const rows = events.map((e) => ({
    slug: e.slug,
    title: e.title,
    date: e.date,
    date_label: e.dateLabel,
    location: e.location,
    description: e.description,
    image: e.image,
    register_href: e.registerHref
  }));

  const { error: upsertError } = await supabaseAdmin
    .from("events")
    .upsert(rows, { onConflict: "slug" });
  if (upsertError) {
    console.error("[admin/events PUT] upsert error:", upsertError);
    return NextResponse.json({ error: upsertError.message }, { status: 500 });
  }

  // 空陣列代表「後台把這個列表全部刪光」，這時改用刪除全部（slug is not null 恆真）
  // 而不是略過刪除，否則沒辦法透過後台把列表清空到 0 筆。
  const slugs = rows.map((r) => r.slug);
  const deleteQuery = supabaseAdmin.from("events").delete();
  const { error: deleteError } =
    slugs.length > 0
      ? await deleteQuery.not("slug", "in", `(${slugs.map((s) => `"${s}"`).join(",")})`)
      : await deleteQuery.not("slug", "is", null);
  if (deleteError) {
    console.error("[admin/events PUT] delete error:", deleteError);
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
