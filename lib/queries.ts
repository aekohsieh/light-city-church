import { supabase } from "@/lib/supabase/client";
import { services as fallbackServices } from "@/data/services";
import { sermons as fallbackSermons } from "@/data/sermons";
import { events as fallbackEvents } from "@/data/events";
import { groups as fallbackGroups } from "@/data/groups";
import { ServiceInfo, Sermon, ChurchEvent, Group } from "@/types";

/**
 * 所有首頁內容的讀取入口。
 * 有設定 Supabase 就查資料庫；沒設定，或查詢失敗／查無資料，
 * 一律 fallback 回 data/*.ts 的靜態資料，確保網站永遠有內容可顯示。
 */

export async function getServices(): Promise<ServiceInfo[]> {
  if (!supabase) return fallbackServices;

  const { data, error } = await supabase
    .from("services")
    .select("id, name, time, location, description, href")
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) return fallbackServices;
  return data as ServiceInfo[];
}

export async function getSermons(): Promise<Sermon[]> {
  if (!supabase) return fallbackSermons;

  const { data, error } = await supabase
    .from("sermons")
    .select("slug, title, speaker, date, scripture, series, youtube_id, thumbnail")
    .order("date", { ascending: false });

  if (error || !data || data.length === 0) return fallbackSermons;

  return data.map(
    (row: {
      slug: string;
      title: string;
      speaker: string;
      date: string;
      scripture: string;
      series: string | null;
      youtube_id: string;
      thumbnail: string;
    }) => ({
      slug: row.slug,
      title: row.title,
      speaker: row.speaker,
      date: row.date,
      scripture: row.scripture,
      series: row.series ?? undefined,
      youtubeId: row.youtube_id,
      thumbnail: row.thumbnail
    })
  );
}

export async function getEvents(): Promise<ChurchEvent[]> {
  if (!supabase) return fallbackEvents;

  const { data, error } = await supabase
    .from("events")
    .select("slug, title, date, date_label, location, description, image, register_href")
    .order("date", { ascending: true });

  if (error || !data || data.length === 0) return fallbackEvents;

  return data.map(
    (row: {
      slug: string;
      title: string;
      date: string;
      date_label: string;
      location: string;
      description: string;
      image: string;
      register_href: string;
    }) => ({
      slug: row.slug,
      title: row.title,
      date: row.date,
      dateLabel: row.date_label,
      location: row.location,
      description: row.description,
      image: row.image,
      registerHref: row.register_href
    })
  );
}

export async function getGroups(): Promise<Group[]> {
  if (!supabase) return fallbackGroups;

  const { data, error } = await supabase
    .from("groups")
    .select("slug, name, audience, description, meeting_time, image")
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) return fallbackGroups;

  return data.map(
    (row: {
      slug: string;
      name: string;
      audience: string;
      description: string;
      meeting_time: string;
      image: string;
    }) => ({
      slug: row.slug,
      name: row.name,
      audience: row.audience,
      description: row.description,
      meetingTime: row.meeting_time,
      image: row.image
    })
  );
}
