import { ServiceInfo } from "@/types";

/**
 * 聚會資訊 — 首頁「Join Us This Sunday」使用。
 * 已依教會提供之正式資訊更新（同步自 index.html / 現行 Netlify 站台）。
 */
export const services: ServiceInfo[] = [
  {
    id: "sunday-worship",
    name: "主日崇拜",
    time: "每週日 第一堂：8:30　第二堂：10:30",
    location: "光之城行道會｜海山捷運站 1 號出口步行 1 分鐘",
    description: "敬拜、信息與禱告，我們一起在神面前重新得力，開始新的一週。",
    href: "/new-here"
  },
  {
    id: "kids-sunday",
    name: "兒童主日",
    time: "每週日 10:00 AM（與主日崇拜同時）",
    location: "光之城行道會｜兒童教室",
    description: "專為孩子設計的敬拜與故事時間，讓孩子從小認識神的愛。",
    href: "/new-here"
  },
  {
    id: "prayer-meeting",
    name: "禱告會",
    time: "每週四 08:00 PM",
    location: "光之城行道會｜線上同步",
    description: "一起安靜、代禱，為家人、城市與教會的需要祈求。",
    href: "/new-here"
  }
];
