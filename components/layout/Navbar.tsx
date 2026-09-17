"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { navItems, primaryCta } from "@/data/nav";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

/**
 * 全站導覽列。
 * - 首屏（未捲動）：透明背景，白色文字，疊在 Hero 圖片上。
 * - 捲動後：白色半透明玻璃感背景（Glass Effect），深色文字，加上陰影。
 * - 手機版：Hamburger Menu 展開全螢幕選單。
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 開啟手機選單時鎖住背景捲動
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isSolid = scrolled || mobileOpen;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isSolid
          ? "bg-cream/90 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <nav className="container-site flex h-20 items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-14 items-center">
            <Image
              src="/images/logo.jpg"
              alt="光之城行道會 Logo"
              width={140}
              height={56}
              className="h-14 w-auto object-contain"
              priority
            />
          </span>
          <span
            className={cn(
              "font-display text-lg font-extrabold tracking-tight transition-colors",
              isSolid ? "text-ink" : "text-white"
            )}
          >
            光之城行道會
            <span className="block text-[10px] font-medium tracking-[0.25em] opacity-70">
              CITY OF LIGHT CHURCH
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-gold-600",
                  isSolid ? "text-ink-soft" : "text-white/90"
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button href={primaryCta.href} variant="primary" className="!py-2.5">
            {primaryCta.label}
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={mobileOpen ? "關閉選單" : "開啟選單"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full lg:hidden",
            isSolid ? "text-ink" : "text-white"
          )}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu panel */}
      <div
        className={cn(
          "fixed inset-x-0 top-20 bottom-0 z-40 origin-top bg-cream transition-all duration-300 lg:hidden",
          mobileOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        )}
      >
        <ul className="container-site flex flex-col gap-1 py-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block border-b border-ink/5 py-4 text-lg font-medium text-ink"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="container-site">
          <Button href={primaryCta.href} variant="primary" className="w-full justify-center">
            {primaryCta.label}
          </Button>
        </div>
      </div>
    </header>
  );
}
