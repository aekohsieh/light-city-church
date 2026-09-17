import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  showArrow?: boolean;
  className?: string;
}

/**
 * 全站唯一的 CTA 按鈕元件。
 * primary：金黃色實心，用於最重要的 CTA（第一次來）
 * secondary：外框，用於次要 CTA（觀看主日信息 / 近期活動）
 * ghost：無框文字連結，用於卡片內「了解更多」
 */
export default function Button({
  href,
  children,
  variant = "primary",
  showArrow = true,
  className
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline-none";

  const styles: Record<string, string> = {
    primary:
      "bg-gold text-ink hover:bg-gold-600 hover:shadow-soft hover:-translate-y-0.5",
    secondary:
      "border border-white/40 text-white hover:bg-white/10 backdrop-blur-sm",
    ghost: "text-sky-600 hover:text-sky-500 px-0 py-0"
  };

  return (
    <Link href={href} className={cn(base, styles[variant], className)}>
      {children}
      {showArrow && (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </Link>
  );
}
