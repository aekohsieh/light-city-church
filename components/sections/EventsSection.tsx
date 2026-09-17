import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import EventCard from "@/components/cards/EventCard";
import { getEvents } from "@/lib/queries";

/**
 * Section 8｜Upcoming Events
 * 第三重要 CTA「近期活動」的主要落地內容。
 */
export default async function EventsSection() {
  const events = await getEvents();

  return (
    <section className="container-site py-20 md:py-28">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <Reveal>
          <SectionTitle eyebrow="Upcoming Events" title="近期活動" />
        </Reveal>
        <Reveal delay={100}>
          <Button href="/events" variant="ghost" className="group inline-flex">
            所有活動
          </Button>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {events.map((event, i) => (
          <Reveal key={event.slug} delay={i * 100}>
            <EventCard event={event} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
