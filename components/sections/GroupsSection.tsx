import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import GroupCard from "@/components/cards/GroupCard";
import { getGroups } from "@/lib/queries";

/**
 * Section 7｜Life Together
 * 首頁只展示前 8 個團契，完整清單與詳細頁在 /groups。
 */
export default async function GroupsSection() {
  const groups = await getGroups();

  return (
    <section className="bg-cream-deep py-20 md:py-28">
      <div className="container-site">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <SectionTitle
              eyebrow="Life Together"
              title="信仰，不是一個人走。"
            />
          </Reveal>
          <Reveal delay={100}>
            <Button href="/groups" variant="ghost" className="group inline-flex">
              找到適合我的團契
            </Button>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {groups.map((group, i) => (
            <Reveal key={group.slug} delay={(i % 4) * 80}>
              <GroupCard group={group} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
