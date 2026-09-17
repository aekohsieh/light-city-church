"use client";

import { useEffect, useState } from "react";
import { ChurchEvent } from "@/types";

const emptyEvent = (): ChurchEvent => ({
  slug: `event-${Date.now()}`,
  title: "",
  date: new Date().toISOString().slice(0, 10),
  dateLabel: "",
  location: "",
  description: "",
  image: "",
  registerHref: "#"
});

export default function AdminEventsPage() {
  const [events, setEvents] = useState<ChurchEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.events ?? []);
        setLoading(false);
      });
  }, []);

  function updateField(i: number, field: keyof ChurchEvent, value: string) {
    setEvents((prev) => prev.map((e, idx) => (idx === i ? { ...e, [field]: value } : e)));
  }

  function addEvent() {
    setEvents((prev) => [emptyEvent(), ...prev]);
  }

  function removeEvent(i: number) {
    setEvents((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function handleSave() {
    setSaving(true);
    setMessage(null);

    const res = await fetch("/api/admin/events", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ events })
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
        <h1 className="font-sans text-2xl font-extrabold text-ink">近期活動編輯</h1>
        <button
          onClick={addEvent}
          className="rounded-full border border-gold px-4 py-2 text-sm font-semibold text-gold-600 hover:bg-gold-50"
        >
          ＋ 新增一個活動
        </button>
      </div>

      <div className="mt-8 space-y-6">
        {events.map((event, i) => (
          <div key={i} className="rounded-2xl bg-white p-6 shadow-card">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-ink-soft">標題</span>
                <input
                  value={event.title}
                  onChange={(e) => updateField(i, "title", e.target.value)}
                  className="w-full rounded-xl border border-ink/10 px-3 py-2 text-sm outline-none focus:border-gold"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-ink-soft">日期</span>
                <input
                  type="date"
                  value={event.date}
                  onChange={(e) => updateField(i, "date", e.target.value)}
                  className="w-full rounded-xl border border-ink/10 px-3 py-2 text-sm outline-none focus:border-gold"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-ink-soft">
                  日期標籤（畫面上顯示的文字，例如「9/12（六）19:30」）
                </span>
                <input
                  value={event.dateLabel}
                  onChange={(e) => updateField(i, "dateLabel", e.target.value)}
                  className="w-full rounded-xl border border-ink/10 px-3 py-2 text-sm outline-none focus:border-gold"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-ink-soft">地點</span>
                <input
                  value={event.location}
                  onChange={(e) => updateField(i, "location", e.target.value)}
                  className="w-full rounded-xl border border-ink/10 px-3 py-2 text-sm outline-none focus:border-gold"
                />
              </label>
              <label className="block text-sm sm:col-span-2">
                <span className="mb-1 block font-medium text-ink-soft">說明</span>
                <textarea
                  value={event.description}
                  onChange={(e) => updateField(i, "description", e.target.value)}
                  rows={2}
                  className="w-full rounded-xl border border-ink/10 px-3 py-2 text-sm outline-none focus:border-gold"
                />
              </label>
              <label className="block text-sm sm:col-span-2">
                <span className="mb-1 block font-medium text-ink-soft">圖片網址</span>
                <input
                  value={event.image}
                  onChange={(e) => updateField(i, "image", e.target.value)}
                  className="w-full rounded-xl border border-ink/10 px-3 py-2 text-sm outline-none focus:border-gold"
                />
              </label>
              <label className="block text-sm sm:col-span-2">
                <span className="mb-1 block font-medium text-ink-soft">
                  報名連結（「我要報名」按鈕的連結）
                </span>
                <input
                  value={event.registerHref}
                  onChange={(e) => updateField(i, "registerHref", e.target.value)}
                  className="w-full rounded-xl border border-ink/10 px-3 py-2 text-sm outline-none focus:border-gold"
                />
              </label>
            </div>
            <button
              onClick={() => removeEvent(i)}
              className="mt-4 text-xs font-semibold text-red-600 hover:text-red-700"
            >
              刪除這個活動
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
