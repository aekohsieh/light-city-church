import Link from "next/link";
import { Facebook, Instagram, Youtube, MessageCircle, MapPin, Mail, Phone } from "lucide-react";

const quickLinks = [
  { label: "關於我們", href: "/about" },
  { label: "主日信息", href: "/sermons" },
  { label: "活動", href: "/events" },
  { label: "團契與小組", href: "/groups" },
  { label: "第一次來", href: "/new-here" },
  { label: "奉獻", href: "/giving" },
  { label: "聯絡我們", href: "/contact" }
];

const socials = [
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=100064792983888", icon: Facebook },
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "YouTube", href: "#", icon: Youtube },
  { label: "LINE", href: "#", icon: MessageCircle }
];

/**
 * 全站 Footer。深色背景，作為資訊的「安全網」——
 * 即使使用者從任何頁面滑到底部，也能找到聯絡方式與核心連結。
 */
export default function Footer() {
  return (
    <footer className="bg-navy text-cream/80">
      <div className="container-site grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <p className="font-display text-xl font-extrabold text-white">光之城行道會</p>
          <p className="mt-1 text-sm tracking-wide text-cream/60">
            Light of the City Church
          </p>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/60">
            我們相信，每一個生命都值得被愛，每一段人生，都可以重新找到盼望。
          </p>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold-300">
            快速連結
          </p>
          <ul className="space-y-3 text-sm">
            {quickLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold-300">
            聯絡我們
          </p>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
              <span>新北市｜海山捷運站 1 號出口步行 1 分鐘</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-gold-300" />
              <span>(02) 0000-0000</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-gold-300" />
              <span>hello@lightofthecity.church</span>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold-300">
            關注我們
          </p>
          <div className="flex gap-3">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-gold hover:text-gold-300"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <p className="container-site text-xs text-cream/50">
          © 2026 光之城行道會 Light of the City Church. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
