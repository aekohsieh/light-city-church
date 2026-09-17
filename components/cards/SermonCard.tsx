import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { Sermon } from "@/types";

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export default function SermonCard({ sermon }: { sermon: Sermon }) {
  return (
    <Link
      href={`/sermons/${sermon.slug}`}
      className="group block overflow-hidden rounded-3xl bg-white shadow-card transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={sermon.thumbnail}
          alt={sermon.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 768px) 33vw, 90vw"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-navy/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90">
            <Play className="ml-0.5 h-5 w-5 fill-ink text-ink" />
          </span>
        </div>
      </div>
      <div className="p-6">
        {sermon.series && (
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.15em] text-sky-500">
            {sermon.series}
          </p>
        )}
        <h3 className="font-sans text-lg font-bold text-ink">{sermon.title}</h3>
        <p className="mt-2 text-sm text-ink-soft">
          {sermon.speaker} · {sermon.scripture}
        </p>
        <p className="mt-1 text-xs text-ink-soft/70">{formatDate(sermon.date)}</p>
      </div>
    </Link>
  );
}
