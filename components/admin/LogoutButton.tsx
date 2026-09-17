"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-full border border-ink/15 px-4 py-2 text-xs font-semibold text-ink-soft transition-colors hover:border-gold hover:text-gold-600"
    >
      登出
    </button>
  );
}
