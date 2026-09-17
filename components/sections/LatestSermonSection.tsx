import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SermonCard from "@/components/cards/SermonCard";
import { getSermons } from "@/lib/queries";

/**
 * 首頁只呈現最新 3 篇信息，完整內容導向 /sermons。
 * 次要 CTA「觀看主日信息」的落地內容。
 */
export default async function LatestSermonSection() {
  const sermons = await getSermons();
  const latestThree = sermons.slice(0, 3);

  return (
    <section className="container-site py-20 md:py-28">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <Reveal>
          <SectionTitle eyebrow="Latest Message" title="最新主日信息" />
        </Reveal>
        <Reveal delay={100}>
          <Button href="/sermons" variant="ghost" className="group inline-flex">
            所有信息
          </Button>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {latestThree.map((sermon, i) => (
          <Reveal key={sermon.slug} delay={i * 100}>
            <SermonCard sermon={sermon} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
