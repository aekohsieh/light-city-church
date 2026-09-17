import { cn } from "@/lib/utils";

/**
 * 網站的視覺簽名元素（Signature）。
 * 以一道柔和的光線取代十字架或宗教符號，
 * 呼應「Light · Love · Hope」與「在光中，相遇」的核心概念，
 * 在頁面段落之間作為安靜、低調的過渡。
 */
export default function LightDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("relative mx-auto h-24 w-full max-w-8xl overflow-hidden", className)}
    >
      <svg
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="beam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E4A94A" stopOpacity="0" />
            <stop offset="50%" stopColor="#E4A94A" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#E4A94A" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="0" y1="50" x2="1200" y2="50" stroke="url(#beam)" strokeWidth="1.5" />
      </svg>
    </div>
  );
}
