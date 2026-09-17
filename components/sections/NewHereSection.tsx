import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

/**
 * Section 1｜第一次來教會
 * 目的：在使用者還沒滑到聚會資訊前，先降低陌生感、卸下心防。
 */
export default function NewHereSection() {
  return (
    <section id="new-here" className="container-site py-20 md:py-28">
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <Reveal>
          <SectionTitle
            eyebrow="New Here"
            title="第一次來？我們已經為你預備好了。"
            subtitle="無論你是否曾經來過教會，你都可以很自在地來到這裡。不需要懂任何宗教儀式，也不需要準備什麼。帶著你自己來，就好。"
          />
          <Button href="/new-here" variant="ghost" className="group mt-8 inline-flex">
            新朋友指南
          </Button>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-card">
            <Image
              src="https://preeminent-tanuki-8bdebb.netlify.app/small-group.jpg"
              alt="教會弟兄姊妹在主日聚會中彼此問候"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 40vw, 90vw"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
