import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * 後台專用 client（service role key，會略過 Row Level Security）。
 *
 * ⚠️ 只能在伺服器端程式碼使用（API Routes）。
 * 千萬不要在這個變數名稱前面加上 NEXT_PUBLIC_，也不要在 Client Component 裡 import 這支檔案，
 * 否則 service role key 會被打包進前端 JS，任何人都能取得資料庫完整寫入權限。
 */
export const supabaseAdmin =
  url && serviceRoleKey
    ? createClient(url, serviceRoleKey, { auth: { persistSession: false } })
    : null;

export const isSupabaseAdminConfigured = Boolean(url && serviceRoleKey);
