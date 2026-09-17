import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import NewHereSection from "@/components/sections/NewHereSection";
import ServiceInfoSection from "@/components/sections/ServiceInfoSection";
import LatestSermonSection from "@/components/sections/LatestSermonSection";
import WhoWeAreSection from "@/components/sections/WhoWeAreSection";
import VisionSection from "@/components/sections/VisionSection";
import GroupsSection from "@/components/sections/GroupsSection";
import EventsSection from "@/components/sections/EventsSection";
import FinalCTASection from "@/components/sections/FinalCTASection";

export const metadata: Metadata = {
  title: "光之城行道會｜Light of the City Church",
  description: "歡迎來到光之城行道會。一起認識神、經歷愛，找到屬於你的家。",
  alternates: { canonical: "/" }
};

/**
 * 強制動態渲染，關閉 Next.js 對這個頁面的資料快取。
 * 首頁內容改抓 Supabase 資料庫後，若不設定這個，Next.js 預設會快取查詢結果，
 * 導致後台存檔後首頁仍顯示舊資料，要等重新部署或伺服器重啟才會更新。
 */
export const dynamic = "force-dynamic";

/**
 * 首頁 Information Architecture：
 * Hero → 第一次來 → 聚會資訊 → 主日信息 → Who We Are → 教會異象
 * → 團契與小組 → 近期活動 → 收尾 CTA
 *
 * 設計原則：新朋友在滑動過程中，資訊「由淺入深」：
 * 先卸下陌生感 → 給出具體時間地點 → 建立信任 → 再邀請更深的參與（團契／活動）。
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <NewHereSection />
      <ServiceInfoSection />
      <LatestSermonSection />
      <WhoWeAreSection />
      <VisionSection />
      <GroupsSection />
      <EventsSection />
      <FinalCTASection />
    </>
  );
}
