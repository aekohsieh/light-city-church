import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

/**
 * Who We Are — 建立信任感，讓新朋友知道「這群人是誰」。
 */
export default function WhoWeAreSection() {
  return (
    <section className="bg-navy py-20 text-cream md:py-28">
      <div className="container-site grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <Reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image
              src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1200&q=80"
              alt="光之城行道會的弟兄姊妹一起服事"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 40vw, 90vw"
            />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <SectionTitle
            eyebrow="Who We Are"
            title="我們是誰"
            subtitle="我們相信教會不只是一個聚會的地方，而是一群願意彼此相愛、一起跟隨耶穌的人。我們盼望成為城市中的光，把神的愛與盼望帶進家庭、社區與下一個世代。"
            light
          />
          <Button href="/about" variant="secondary" className="mt-8 w-fit">
            認識光之城
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
