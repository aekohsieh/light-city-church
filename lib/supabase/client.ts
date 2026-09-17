import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * 公開讀取用 client（anon key，權限受 Row Level Security 限制，只能讀不能寫）。
 *
 * 若尚未設定 Supabase 環境變數，這裡會是 null——呼叫端（lib/queries.ts）
 * 會自動 fallback 回 data/*.ts 的靜態資料，讓網站在資料庫還沒接上前也能正常顯示。
 *
 * 這裡明確指定 fetch 用 cache: "no-store"——
 * 避免 Vercel 把打去 Supabase REST API 的請求快取住，
 * 導致即使頁面本身是 force-dynamic，資料還是被舊的快取結果卡住。
 */
export const supabase =
  url && anonKey
    ? createClient(url, anonKey, {
        global: {
          fetch: (input, init) => fetch(input, { ...init, cache: "no-store" })
        }
      })
    : null;

export const isSupabaseConfigured = Boolean(url && anonKey);
