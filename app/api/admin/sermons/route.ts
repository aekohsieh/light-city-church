import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getSermons } from "@/lib/queries";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth";

async function isAuthed(request: NextRequest) {
  return await verifySessionToken(request.cookies.get(SESSION_COOKIE_NAME)?.value);
}

export async function GET(request: NextRequest) {
  if (!(await isAuthed(request))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const sermons = await getSermons();
  return NextResponse.json({ sermons });
}

/**
 * 整份清單「取代」寫法：前端送整份陣列，
 * 伺服器 upsert 陣列裡的每一筆，並刪除資料庫裡「陣列中已經不存在」的舊資料，
 * 讓「新增」「刪除」都能透過同一個 PUT 完成，前端邏輯最簡單。
 */
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
  const sermons = body?.sermons;
  if (!Array.isArray(sermons)) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  const rows = sermons.map((s) => ({
    slug: s.slug,
    title: s.title,
    speaker: s.speaker,
    date: s.date,
    scripture: s.scripture,
    series: s.series || null,
    youtube_id: s.youtubeId,
    thumbnail: s.thumbnail
  }));

  const { error: upsertError } = await supabaseAdmin
    .from("sermons")
    .upsert(rows, { onConflict: "slug" });
  if (upsertError) {
    console.error("[admin/sermons PUT] upsert error:", upsertError);
    return NextResponse.json({ error: upsertError.message }, { status: 500 });
  }

  // 空陣列代表「後台把這個列表全部刪光」，這時改用刪除全部（slug is not null 恆真）
  // 而不是略過刪除，否則沒辦法透過後台把列表清空到 0 筆。
  const slugs = rows.map((r) => r.slug);
  const deleteQuery = supabaseAdmin.from("sermons").delete();
  const { error: deleteError } =
    slugs.length > 0
      ? await deleteQuery.not("slug", "in", `(${slugs.map((s) => `"${s}"`).join(",")})`)
      : await deleteQuery.not("slug", "is", null);
  if (deleteError) {
    console.error("[admin/sermons PUT] delete error:", deleteError);
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
