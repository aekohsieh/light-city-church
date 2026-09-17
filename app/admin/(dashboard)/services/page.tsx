"use client";

import { useEffect, useState } from "react";
import { ServiceInfo } from "@/types";

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data.services ?? []);
        setLoading(false);
      });
  }, []);

  function updateField(index: number, field: keyof ServiceInfo, value: string) {
    setServices((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  }

  async function handleSave() {
    setSaving(true);
    setMessage(null);

    const res = await fetch("/api/admin/services", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ services })
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
      <h1 className="font-sans text-2xl font-extrabold text-ink">聚會資訊編輯</h1>
      <p className="mt-2 text-sm text-ink-soft/80">
        編輯首頁「Join Us This Sunday」顯示的聚會時間與地點。
      </p>

      <div className="mt-8 space-y-6">
        {services.map((service, i) => (
          <div key={service.id} className="rounded-2xl bg-white p-6 shadow-card">
            <p className="text-sm font-semibold text-gold-600">{service.name}</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-ink-soft">時間</span>
                <input
                  value={service.time}
                  onChange={(e) => updateField(i, "time", e.target.value)}
                  className="w-full rounded-xl border border-ink/10 px-3 py-2 text-sm outline-none focus:border-gold"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-ink-soft">地點</span>
                <input
                  value={service.location}
                  onChange={(e) => updateField(i, "location", e.target.value)}
                  className="w-full rounded-xl border border-ink/10 px-3 py-2 text-sm outline-none focus:border-gold"
                />
              </label>
              <label className="block text-sm sm:col-span-2">
                <span className="mb-1 block font-medium text-ink-soft">說明</span>
                <textarea
                  value={service.description}
                  onChange={(e) => updateField(i, "description", e.target.value)}
                  rows={2}
                  className="w-full rounded-xl border border-ink/10 px-3 py-2 text-sm outline-none focus:border-gold"
                />
              </label>
            </div>
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

      {message && <p className="mt-4 max-w-xl text-sm text-ink-soft">{message}</p>}
    </div>
  );
}
