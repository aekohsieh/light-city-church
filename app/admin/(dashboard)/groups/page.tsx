"use client";

import { useEffect, useState } from "react";
import { Group } from "@/types";

const emptyGroup = (): Group => ({
  slug: `group-${Date.now()}`,
  name: "",
  audience: "",
  description: "",
  meetingTime: "",
  image: ""
});

export default function AdminGroupsPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/groups")
      .then((res) => res.json())
      .then((data) => {
        setGroups(data.groups ?? []);
        setLoading(false);
      });
  }, []);

  function updateField(i: number, field: keyof Group, value: string) {
    setGroups((prev) => prev.map((g, idx) => (idx === i ? { ...g, [field]: value } : g)));
  }

  function addGroup() {
    setGroups((prev) => [emptyGroup(), ...prev]);
  }

  function removeGroup(i: number) {
    setGroups((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function handleSave() {
    setSaving(true);
    setMessage(null);

    const res = await fetch("/api/admin/groups", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ groups })
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
        <h1 className="font-sans text-2xl font-extrabold text-ink">團契與小組編輯</h1>
        <button
          onClick={addGroup}
          className="rounded-full border border-gold px-4 py-2 text-sm font-semibold text-gold-600 hover:bg-gold-50"
        >
          ＋ 新增一個團契
        </button>
      </div>
      <p className="mt-2 text-sm text-ink-soft/80">
        首頁只顯示前 8 個，這裡的排列順序（由上而下）就是首頁的顯示順序。
      </p>

      <div className="mt-8 space-y-6">
        {groups.map((group, i) => (
          <div key={i} className="rounded-2xl bg-white p-6 shadow-card">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-ink-soft">名稱</span>
                <input
                  value={group.name}
                  onChange={(e) => updateField(i, "name", e.target.value)}
                  className="w-full rounded-xl border border-ink/10 px-3 py-2 text-sm outline-none focus:border-gold"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-ink-soft">
                  對象（例如「幼幼～國小」）
                </span>
                <input
                  value={group.audience}
                  onChange={(e) => updateField(i, "audience", e.target.value)}
                  className="w-full rounded-xl border border-ink/10 px-3 py-2 text-sm outline-none focus:border-gold"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-ink-soft">聚會時間</span>
                <input
                  value={group.meetingTime}
                  onChange={(e) => updateField(i, "meetingTime", e.target.value)}
                  className="w-full rounded-xl border border-ink/10 px-3 py-2 text-sm outline-none focus:border-gold"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-ink-soft">圖片網址</span>
                <input
                  value={group.image}
                  onChange={(e) => updateField(i, "image", e.target.value)}
                  className="w-full rounded-xl border border-ink/10 px-3 py-2 text-sm outline-none focus:border-gold"
                />
              </label>
              <label className="block text-sm sm:col-span-2">
                <span className="mb-1 block font-medium text-ink-soft">說明</span>
                <textarea
                  value={group.description}
                  onChange={(e) => updateField(i, "description", e.target.value)}
                  rows={2}
                  className="w-full rounded-xl border border-ink/10 px-3 py-2 text-sm outline-none focus:border-gold"
                />
              </label>
            </div>
            <button
              onClick={() => removeGroup(i)}
              className="mt-4 text-xs font-semibold text-red-600 hover:text-red-700"
            >
              刪除這個團契
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
