import { Clock, MapPin } from "lucide-react";
import { ServiceInfo } from "@/types";
import Button from "@/components/ui/Button";

export default function ServiceCard({ service }: { service: ServiceInfo }) {
  return (
    <div className="flex h-full flex-col rounded-3xl bg-white p-8 shadow-card transition-transform duration-300 hover:-translate-y-1">
      <h3 className="font-sans text-xl font-bold text-ink">{service.name}</h3>

      <div className="mt-4 space-y-2 text-sm text-ink-soft">
        <p className="flex items-center gap-2">
          <Clock className="h-4 w-4 shrink-0 text-sky-500" />
          {service.time}
        </p>
        <p className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sky-500" />
          <span>{service.location}</span>
        </p>
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft/90">
        {service.description}
      </p>

      <Button href={service.href} variant="ghost" className="group mt-6 inline-flex w-fit">
        了解更多
      </Button>
    </div>
  );
}
