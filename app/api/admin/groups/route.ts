import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getGroups } from "@/lib/queries";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth";

async function isAuthed(request: NextRequest) {
  return await verifySessionToken(request.cookies.get(SESSION_COOKIE_NAME)?.value);
}

export async function GET(request: NextRequest) {
  if (!(await isAuthed(request))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const groups = await getGroups();
  return NextResponse.json({ groups });
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
  const groups = body?.groups;
  if (!Array.isArray(groups)) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  const rows = groups.map((g, i) => ({
    slug: g.slug,
    name: g.name,
    audience: g.audience,
    description: g.description,
    meeting_time: g.meetingTime,
    image: g.image,
    sort_order: i + 1
  }));

  const { error: upsertError } = await supabaseAdmin
    .from("groups")
    .upsert(rows, { onConflict: "slug" });
  if (upsertError) {
    console.error("[admin/groups PUT] upsert error:", upsertError);
    return NextResponse.json({ error: upsertError.message }, { status: 500 });
  }

  // 空陣列代表「後台把這個列表全部刪光」，這時改用刪除全部（slug is not null 恆真）
  // 而不是略過刪除，否則沒辦法透過後台把列表清空到 0 筆。
  const slugs = rows.map((r) => r.slug);
  const deleteQuery = supabaseAdmin.from("groups").delete();
  const { error: deleteError } =
    slugs.length > 0
      ? await deleteQuery.not("slug", "in", `(${slugs.map((s) => `"${s}"`).join(",")})`)
      : await deleteQuery.not("slug", "is", null);
  if (deleteError) {
    console.error("[admin/groups PUT] delete error:", deleteError);
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
