/**
 * 後台簡易帳密驗證。
 *
 * ⚠️ 正式上線前務必到 Netlify/Vercel 環境變數設定：
 *   ADMIN_USERNAME / ADMIN_PASSWORD / ADMIN_SESSION_SECRET
 * 未設定時會 fallback 成下方預設值（僅供開發測試）。
 *
 * 這裡用 Web Crypto API（crypto.subtle）而非 Node 的 crypto 模組，
 * 因為 middleware.ts 跑在 Edge Runtime，Edge Runtime 不支援 Node crypto。
 * Web Crypto API 在瀏覽器、Edge Runtime、Node 18+ 都能用，是通用寫法。
 */
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "123456";

const SECRET =
  process.env.ADMIN_SESSION_SECRET || "light-city-church-dev-secret-change-me";

export const SESSION_COOKIE_NAME = "lcc_admin_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8; // 8 小時

async function sign(value: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sigBuffer = await crypto.subtle.sign("HMAC", key, enc.encode(value));
  return Array.from(new Uint8Array(sigBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** 簽發一個帶到期時間與簽章的 session token。 */
export async function createSessionToken(username: string): Promise<string> {
  const expires = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  const payload = `${username}.${expires}`;
  return `${payload}.${await sign(payload)}`;
}

/** 驗證 session token 是否合法且未過期。 */
export async function verifySessionToken(
  token: string | undefined | null
): Promise<boolean> {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [username, expiresStr, sig] = parts;
  const payload = `${username}.${expiresStr}`;
  if ((await sign(payload)) !== sig) return false;

  const expires = Number(expiresStr);
  if (Number.isNaN(expires) || Date.now() > expires) return false;

  return true;
}
