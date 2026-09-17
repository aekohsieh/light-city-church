import { Heart, Users, Sparkles } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const pillars = [
  {
    icon: Heart,
    en: "Love God",
    zh: "愛神",
    desc: "把神放在生命的中心，在敬拜與安靜中，重新認識祂的愛。"
  },
  {
    icon: Users,
    en: "Love People",
    zh: "愛人",
    desc: "在關係裡彼此陪伴、彼此扶持，成為彼此生命中的祝福。"
  },
  {
    icon: Sparkles,
    en: "Impact the City",
    zh: "祝福城市",
    desc: "走進社區與城市,把神的愛與盼望帶給身邊每一個人。"
  }
];

/**
 * 教會異象三大支柱。使用簡潔 Icon，避免宗教符號堆疊。
 */
export default function VisionSection() {
  return (
    <section className="container-site py-20 md:py-28">
      <div className="grid gap-6 md:grid-cols-3">
        {pillars.map(({ icon: Icon, en, zh, desc }, i) => (
          <Reveal key={en} delay={i * 100}>
            <div className="h-full rounded-3xl border border-ink/5 bg-white p-8 shadow-card">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-100 text-gold-600">
                <Icon className="h-6 w-6" />
              </span>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-sky-500">
                {en}
              </p>
              <h3 className="mt-1 font-sans text-2xl font-bold text-ink">{zh}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft/90">{desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
