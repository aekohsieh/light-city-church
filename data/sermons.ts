import { Sermon } from "@/types";

/**
 * 主日信息 mock data。
 * 未來串接 CMS（Sanity / Contentful / Supabase）時，
 * 只需替換此檔案的資料來源，元件與頁面邏輯不需更動。
 */
export const sermons: Sermon[] = [
  {
    slug: "light-in-the-city-01",
    title: "在光中，相遇",
    speaker: "王牧師",
    date: "2026-08-23",
    scripture: "約翰福音 1:4-5",
    series: "光之城系列",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1508537548955-9c00e7d33e14?w=1200&q=80"
  },
  {
    slug: "found-and-home-02",
    title: "找到回家的路",
    speaker: "李傳道",
    date: "2026-08-16",
    scripture: "路加福音 15:20",
    series: "光之城系列",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1445445290350-18a3b86e0b5a?w=1200&q=80"
  },
  {
    slug: "hope-that-holds-03",
    title: "盼望，撐住我們的日子",
    speaker: "王牧師",
    date: "2026-08-09",
    scripture: "羅馬書 15:13",
    series: "盼望系列",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=1200&q=80"
  }
];

export const latestSermon = sermons[0];
