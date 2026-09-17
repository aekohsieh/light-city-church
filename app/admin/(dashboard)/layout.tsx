import Link from "next/link";
import LogoutButton from "@/components/admin/LogoutButton";

export default function AdminDashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-cream-deep">
      <header className="border-b border-ink/10 bg-white">
        <div className="container-site flex h-16 items-center justify-between">
          <Link href="/admin" className="font-display text-base font-extrabold text-ink">
            光之城行道會・後台管理
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-ink-soft md:flex">
            <Link href="/admin" className="hover:text-gold-600">
              總覽
            </Link>
            <Link href="/admin/services" className="hover:text-gold-600">
              聚會資訊
            </Link>
            <Link href="/admin/sermons" className="hover:text-gold-600">
              主日信息
            </Link>
            <Link href="/admin/events" className="hover:text-gold-600">
              近期活動
            </Link>
            <Link href="/admin/groups" className="hover:text-gold-600">
              團契與小組
            </Link>
            <Link href="/" target="_blank" className="hover:text-gold-600">
              查看網站
            </Link>
          </nav>
          <LogoutButton />
        </div>
      </header>
      <main className="container-site py-10">{children}</main>
    </div>
  );
}
