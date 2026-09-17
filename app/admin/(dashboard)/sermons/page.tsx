"use client";

import { useEffect, useState } from "react";
import { Sermon } from "@/types";

const emptySermon = (): Sermon => ({
  slug: `sermon-${Date.now()}`,
  title: "",
  speaker: "",
  date: new Date().toISOString().slice(0, 10),
  scripture: "",
  series: "",
  youtubeId: "",
  thumbnail: ""
});

export default function AdminSermonsPage() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/sermons")
      .then((res) => res.json())
      .then((data) => {
        setSermons(data.sermons ?? []);
        setLoading(false);
      });
  }, []);

  function updateField(i: number, field: keyof Sermon, value: string) {
    setSermons((prev) => prev.map((s, idx) => (idx === i ? { ...s, [field]: value } : s)));
  }

  function addSermon() {
    setSermons((prev) => [emptySermon(), ...prev]);
  }

  function removeSermon(i: number) {
    setSermons((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function handleSave() {
    setSaving(true);
    setMessage(null);

    const res = await fetch("/api/admin/sermons", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sermons })
    });

    setSaving(false);

    if (res.ok) {
      setMessage("已儲存到資料庫。");
    } else {
      const data = await res.json().catch(() => null);
      setMessage(data?.error ?? "儲存失敗");
    }
  }

  if (loading) {
    return <p className="text-sm text-ink-soft">載入中…</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-sans text-2xl font-extrabold text-ink">主日信息編輯</h1>
        <button
          onClick={addSermon}
          className="rounded-full border border-gold px-4 py-2 text-sm font-semibold text-gold-600 hover:bg-gold-50"
        >
          ＋ 新增一篇
        </button>
      </div>
      <p className="mt-2 text-sm text-ink-soft/80">
        首頁只顯示日期最新的 3 篇，完整清單在 /sermons（若已建立該頁面）。
      </p>

      <div className="mt-8 space-y-6">
        {sermons.map((sermon, i) => (
          <div key={i} className="rounded-2xl bg-white p-6 shadow-card">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-ink-soft">標題</span>
                <input
                  value={sermon.title}
                  onChange={(e) => updateField(i, "title", e.target.value)}
                  className="w-full rounded-xl border border-ink/10 px-3 py-2 text-sm outline-none focus:border-gold"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-ink-soft">講員</span>
                <input
                  value={sermon.speaker}
                  onChange={(e) => updateField(i, "speaker", e.target.value)}
                  className="w-full rounded-xl border border-ink/10 px-3 py-2 text-sm outline-none focus:border-gold"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-ink-soft">日期</span>
                <input
                  type="date"
                  value={sermon.date}
                  onChange={(e) => updateField(i, "date", e.target.value)}
                  className="w-full rounded-xl border border-ink/10 px-3 py-2 text-sm outline-none focus:border-gold"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-ink-soft">經文</span>
                <input
                  value={sermon.scripture}
                  onChange={(e) => updateField(i, "scripture", e.target.value)}
                  className="w-full rounded-xl border border-ink/10 px-3 py-2 text-sm outline-none focus:border-gold"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-ink-soft">系列（選填）</span>
                <input
                  value={sermon.series ?? ""}
                  onChange={(e) => updateField(i, "series", e.target.value)}
                  className="w-full rounded-xl border border-ink/10 px-3 py-2 text-sm outline-none focus:border-gold"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-ink-soft">YouTube 影片 ID</span>
                <input
                  value={sermon.youtubeId}
                  onChange={(e) => updateField(i, "youtubeId", e.target.value)}
                  className="w-full rounded-xl border border-ink/10 px-3 py-2 text-sm outline-none focus:border-gold"
                />
              </label>
              <label className="block text-sm sm:col-span-2">
                <span className="mb-1 block font-medium text-ink-soft">縮圖網址</span>
                <input
                  value={sermon.thumbnail}
                  onChange={(e) => updateField(i, "thumbnail", e.target.value)}
                  className="w-full rounded-xl border border-ink/10 px-3 py-2 text-sm outline-none focus:border-gold"
                />
              </label>
            </div>
            <button
              onClick={() => removeSermon(i)}
              className="mt-4 text-xs font-semibold text-red-600 hover:text-red-700"
            >
              刪除這篇
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-8 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink transition-all hover:bg-gold-600 disabled:opacity-60"
      >
        {saving ? "儲存中…" : "儲存變更"}
      </button>

      {message && <p className="mt-4 text-sm text-ink-soft">{message}</p>}
    </div>
  );
}
