import Image from "next/image";
import Link from "next/link";
import { Group } from "@/types";

export default function GroupCard({ group }: { group: Group }) {
  return (
    <Link
      href={`/groups/${group.slug}`}
      className="group relative block aspect-[3/4] overflow-hidden rounded-3xl shadow-card"
    >
      <Image
        src={group.image}
        alt={group.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 45vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-gold-300">
          {group.audience}
        </p>
        <h3 className="mt-1 font-sans text-lg font-bold">{group.name}</h3>
      </div>
    </Link>
  );
}
