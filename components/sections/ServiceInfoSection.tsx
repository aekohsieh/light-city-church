import SectionTitle from "@/components/ui/SectionTitle";
import ServiceCard from "@/components/cards/ServiceCard";
import Reveal from "@/components/ui/Reveal";
import { getServices } from "@/lib/queries";

/**
 * Section 2｜聚會資訊 Join Us This Sunday
 * User Journey 核心站：新朋友在這裡確認「什麼時候、去哪裡」。
 */
export default async function ServiceInfoSection() {
  const services = await getServices();

  return (
    <section id="service-info" className="bg-cream-deep py-20 md:py-28">
      <div className="container-site">
        <Reveal>
          <SectionTitle
            eyebrow="Service Times"
            title="Join Us This Sunday"
            subtitle="無論是第一次，還是每週固定聚會，這裡都為你保留一個位置。"
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 100}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
