import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { ChurchEvent } from "@/types";
import Button from "@/components/ui/Button";

export default function EventCard({ event }: { event: ChurchEvent }) {
  return (
    <article className="group overflow-hidden rounded-3xl bg-white shadow-card transition-transform duration-300 hover:-translate-y-1">
      <Link href={`/events/${event.slug}`} className="relative block aspect-[16/10] overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 768px) 33vw, 90vw"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-ink">
          {event.dateLabel}
        </span>
      </Link>
      <div className="p-6">
        <h3 className="font-sans text-lg font-bold text-ink">{event.title}</h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-ink-soft">
          <MapPin className="h-4 w-4 shrink-0 text-sky-500" />
          {event.location}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft/90">{event.description}</p>
        <Button href={event.registerHref} variant="primary" className="mt-5 w-fit !px-5 !py-2.5">
          我要報名
        </Button>
      </div>
    </article>
  );
}
