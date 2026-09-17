import Link from "next/link";
import { getServices, getSermons, getEvents, getGroups } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const [services, sermons, events, groups] = await Promise.all([
    getServices(),
    getSermons(),
    getEvents(),
    getGroups()
  ]);

  const cards = [
    { title: "聚會資訊", count: services.length, href: "/admin/services", editable: true },
    { title: "主日信息", count: sermons.length, href: "/admin/sermons", editable: true },
    { title: "近期活動", count: events.length, href: "/admin/events", editable: true },
    { title: "團契與小組", count: groups.length, href: "/admin/groups", editable: true }
  ];

  return (
    <div>
      <h1 className="font-sans text-2xl font-extrabold text-ink">後台總覽</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft/80">
        四種內容都已開放線上編輯，存檔後會直接寫入 Supabase 資料庫，網站首頁重新整理即可看到最新內容。
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.title} className="rounded-2xl bg-white p-6 shadow-card">
            <p className="text-sm font-semibold text-ink-soft">{c.title}</p>
            <p className="mt-1 text-3xl font-extrabold text-ink">{c.count}</p>
            {c.editable ? (
              <Link
                href={c.href}
                className="mt-4 inline-block text-sm font-semibold text-gold-600 hover:text-gold-700"
              >
                前往編輯 →
              </Link>
            ) : (
              <p className="mt-4 text-xs text-ink-soft/60">唯讀（尚未開放線上編輯）</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
