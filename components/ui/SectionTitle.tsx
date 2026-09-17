import { cn } from "@/lib/utils";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean; // 深色背景時使用淺色文字
  className?: string;
}

/**
 * 所有 Section 標題的共用元件，確保全站標題層級一致。
 */
export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "left",
  light = false,
  className
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-sm font-semibold uppercase tracking-[0.2em]",
            light ? "text-gold-300" : "text-sky-600"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-sans text-3xl font-extrabold leading-tight tracking-tight md:text-4xl",
          light ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed md:text-lg",
            light ? "text-cream/80" : "text-ink-soft/90"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
