import Button from "@/components/ui/Button";
import LightDivider from "@/components/ui/LightDivider";
import Reveal from "@/components/ui/Reveal";

/**
 * 首頁最底部、Footer 之前的收尾 CTA。
 * 目的：即使使用者滑到最底，仍有清楚的「下一步」，而不是只剩下 Footer 連結。
 */
export default function FinalCTASection() {
  return (
    <section className="relative bg-navy py-20 text-center text-white md:py-28">
      <LightDivider className="absolute -top-12 left-0" />
      <div className="container-site">
        <h2 className="mx-auto max-w-xl font-sans text-3xl font-extrabold leading-tight md:text-4xl">
          準備好認識光之城了嗎？
        </h2>
        <p className="mx-auto mt-4 max-w-md text-cream/75">
          這個週日，我們在光之城等你。不需要準備什麼，帶著你自己來就好。
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/new-here" variant="primary">
            第一次來嗎？
          </Button>
          <Button href="/contact" variant="secondary">
            聯絡我們
          </Button>
        </div>
      </div>
    </section>
  );
}
