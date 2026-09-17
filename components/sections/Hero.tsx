import Image from "next/image";
import Button from "@/components/ui/Button";

/**
 * 首頁 Hero — 全站最重要的第一印象。
 * User Journey 起點：5 秒內傳達「這是什麼教會」+「下一步可以做什麼」。
 * 主要 CTA：第一次來嗎？／次要 CTA：觀看最新主日信息
 */
export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-navy">
      <Image
        src="https://preeminent-tanuki-8bdebb.netlify.app/hero-storefront.jpg"
        alt="光之城行道會 教會實景"
        fill
        priority
        className="object-cover"
        style={{ objectPosition: "center 42%" }}
      />
      {/* 陰暗／亮度：復刻自 index.html — 疊層更淺，保留店面照片的真實明亮感 */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-navy/10 to-transparent" />
      <div className="absolute inset-0 bg-light-beam opacity-80" />

      <div className="container-site relative z-10 pb-20 pt-40 md:pb-28">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-gold-300 animate-fade-in">
          光之城行道會 · Light of the City Church
        </p>
        <h1 className="max-w-2xl font-sans text-4xl font-extrabold leading-[1.15] tracking-tight text-white animate-fade-up sm:text-5xl md:text-6xl">
          在光中，相遇。
        </h1>
        <p
          className="mt-4 font-display text-lg font-semibold tracking-wide text-gold-100 animate-fade-up sm:text-xl"
          style={{ animationDelay: "120ms" }}
        >
          Find Light. Find Hope. Find Home.
        </p>
        <p
          className="mt-6 max-w-xl text-base leading-relaxed text-cream/85 animate-fade-up sm:text-lg"
          style={{ animationDelay: "220ms" }}
        >
          我們相信，每一個生命都值得被愛，每一段人生，都可以重新找到盼望。
          歡迎你來到光之城，一起認識神、經歷愛，找到屬於你的家。
        </p>

        <div
          className="mt-9 flex flex-col gap-3 animate-fade-up sm:flex-row"
          style={{ animationDelay: "320ms" }}
        >
          <Button href="/new-here" variant="primary">
            第一次來嗎？
          </Button>
          <Button href="/sermons" variant="secondary">
            觀看最新主日信息
          </Button>
        </div>
      </div>
    </section>
  );
}
