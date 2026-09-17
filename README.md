# 光之城行道會官方網站（v1｜首頁）

技術：Next.js 14（App Router）· React 18 · TypeScript · Tailwind CSS

## 本次交付範圍

依照企劃 PM 指示，第一版先完成：

1. Global Design System（`tailwind.config.ts` + `app/globals.css`）
2. Navbar（`components/layout/Navbar.tsx`）
3. Homepage 全部 Section（`app/page.tsx` + `components/sections/*`）
4. Footer（`components/layout/Footer.tsx`）
5. Responsive Design（Mobile First，已於 390 / 768 / 1024 / 1440 斷點檢查）

其餘頁面（/about、/new-here、/sermons、/events、/groups、/jesus、/giving、/contact）
尚未建立，待 IA 與 Wireframe 確認後再進行下一輪開發。目前 Navbar／Footer／首頁按鈕
已預先連結到這些路徑，之後建立對應頁面即可，不需再改動導覽邏輯。

## 本機執行

```bash
npm install
npm run dev
```

開啟 http://localhost:3000

> 注意：`next/font` 會在 build/dev 時向 Google Fonts 下載字型，
> 需要一般網路環境（在本沙盒環境中因網域白名單限制無法連線，
> 屬環境限制而非程式錯誤；已用 `tsc --noEmit` 與 `next lint` 確認程式碼本身正確）。

## 設計系統（Design Tokens）

| Token | 用途 | 色碼 |
|---|---|---|
| `cream` | 主背景（暖白） | #FAF6EE |
| `cream-deep` | 區塊底色（米白，用於區隔 Section） | #F2EADA |
| `ink` | 主要文字（深藍近黑） | #17223B |
| `navy` | 深色區塊 / Footer / Hero 疊層 | #101A30 |
| `sky` | 資訊型 icon、連結（天空藍） | #4C86AE |
| `gold` | 唯一強調色，代表「光」，只用在主要 CTA 與少量強調 | #E4A94A |

字體：
- 中文標題／內文：Noto Sans TC
- 英文內文／UI：Inter
- 英文 Slogan／Display：Manrope

視覺簽名（Signature）：`components/ui/LightDivider.tsx` — 用一道柔和的金色光線
作為段落過渡，呼應「光」的品牌概念，取代十字架等宗教符號堆疊。

## 目錄結構

```
app/                  Next.js App Router 頁面
components/
  layout/             Navbar, Footer
  ui/                 SectionTitle, Button, Reveal, LightDivider（跨頁共用）
  sections/           首頁各 Section（一個 Section 一個檔案）
  cards/              ServiceCard, SermonCard, EventCard, GroupCard
data/                 Mock data（services, sermons, events, groups, nav）
types/                共用 TypeScript 型別
lib/                  共用工具函式（cn）
```

## 給非工程背景同工的維護說明

第一版內容集中在 `data/` 資料夾的 5 個檔案，**不需要碰程式碼**，
只要照現有格式修改陣列內容即可更新網站：

- `data/services.ts`　聚會時間、地點、介紹
- `data/sermons.ts`　主日信息（標題、講員、經文、YouTube 影片 ID）
- `data/events.ts`　近期活動
- `data/groups.ts`　團契與小組
- `data/nav.ts`　導覽列選單

未來要接 CMS（Sanity / Contentful / Supabase）時，只需把這幾個檔案的
資料來源換成 CMS API 回傳的資料，元件與版面完全不需更動 ——
這是本次架構刻意為「內容易維護」預留的設計。

## ⚠️ 需要教會提供的真實資訊（目前為佔位資料）

- 教會地址、電話、Email（`components/layout/Footer.tsx`）
- Instagram / YouTube / LINE 官方連結（`components/layout/Footer.tsx`）
- Who We Are、團契與小組、活動 等區塊的實際教會照片（目前使用 Unsplash 示意圖）
- 主日信息實際 YouTube 影片 ID（`data/sermons.ts`）
- **Logo / Hero / 新朋友照片**：已從既有靜態站台（index.html／Netlify）同步，
  詳見下方「圖片資產」說明

## 圖片資產（2026/08 更新）

| 圖片 | 目前處理方式 | 待辦 |
|---|---|---|
| Logo | 已放入 `public/images/logo.jpg`（由教會提供的 JPG，白底非透明） | 建議請教會提供透明背景 PNG，深色 Hero／Navbar 上會更乾淨 |
| Hero 首圖 | 暫時透過 `next.config.mjs` 的 `remotePatterns` 連到現有 Netlify 站台的 `hero-storefront.jpg` | 待教會提供實體檔案後，改放 `public/images/hero-storefront.jpg` 並移除 remotePattern |
| 新朋友照片 | 同上，暫連到 `small-group.jpg` | 同上，改為本地檔案 |

Hero 疊層（陰暗／亮度）已依 index.html 版本校正：
`bg-gradient-to-t from-navy/40 via-navy/10 to-transparent` + `bg-light-beam opacity-80`，
物件定位 `object-position: center 42%`，比原本 Next.js 版更明亮、更貼近真實店面照片質感。

## 聚會資訊（已同步）

`data/services.ts` 已更新為教會目前正式資訊：主日崇拜改為兩堂（8:30 / 10:30）、
海山捷運站 1 號出口步行 1 分鐘、禱告會改為每週四 08:00 PM。Footer 地址同步更新。

## 後台管理（新增）

新增最簡單的帳密登入後台，路徑 `/admin`：

- 帳號／密碼：`admin` / `123456`（寫死在 `lib/auth.ts` 的預設值，
  **正式上線前請務必**改到 Netlify 環境變數 `ADMIN_USERNAME` / `ADMIN_PASSWORD` / `ADMIN_SESSION_SECRET`）
- `middleware.ts` 保護所有 `/admin/*`，未登入會導回 `/admin/login`
- Session 用簽章 cookie 實作（Node `crypto`，無額外套件依賴），有效期 8 小時
- `/admin` 總覽頁：顯示各類內容筆數
- `/admin/services`：目前**唯一可線上編輯**的內容（聚會時間／地點／說明）

### ⚠️ 後台目前的重要限制

`/admin/services` 儲存時是直接寫回 `data/services.ts` 這個原始碼檔案（`app/api/admin/services/route.ts`）。
這在**本機開發或有持久檔案系統的伺服器**上可正常運作，但：

- **在 Netlify Functions（Serverless）環境下，寫入不會持久保存**——
  重新部署或函式冷啟動後，寫入的內容就會消失，因為 serverless function 沒有持久檔案系統。
- 其餘內容（主日信息／活動／團契）**尚未**做線上編輯功能，僅總覽頁列出筆數。

若要在 Netlify 上有真正「後台編輯、內容永久保存」的效果，建議下一步改接資料庫
（例如 Supabase／PlanetScale／Neon 皆有免費方案），把 `data/*.ts` 換成從資料庫讀取，
`/api/admin/*` 改成寫入資料庫而非寫檔案。這是目前架構下最小改動、最快能上線的路徑。

## 下一步建議（PM 決策用）

1. 確認 `/new-here`、`/sermons`、`/events`、`/groups` 的 Wireframe 後即可接續開發
2. 補齊真實照片（Logo 透明版、Hero、Who We Are、團契、活動）
3. 決定後台是否要接資料庫（見上方後台限制說明），並擴充主日信息／活動／團契的線上編輯功能
4. 串接表單服務（Contact / Jesus 頁面的聯絡表單）
5. 部署到 Netlify：需改用 `@netlify/plugin-nextjs`，並在 Netlify 後台設定
   `ADMIN_USERNAME` / `ADMIN_PASSWORD` / `ADMIN_SESSION_SECRET` 環境變數
