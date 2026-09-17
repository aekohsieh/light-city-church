-- 光之城行道會網站資料庫 Schema
-- 使用方式：Supabase Dashboard → SQL Editor → 貼上整份執行一次即可
-- （之後要更新種子資料可以重複執行，用 upsert / on conflict 處理不會重複新增）

-- ========== 資料表 ==========

create table if not exists services (
  id text primary key,
  name text not null,
  time text not null,
  location text not null,
  description text not null,
  href text not null default '/new-here',
  sort_order integer not null default 0
);

create table if not exists sermons (
  slug text primary key,
  title text not null,
  speaker text not null,
  date date not null,
  scripture text not null,
  series text,
  youtube_id text not null,
  thumbnail text not null
);

create table if not exists events (
  slug text primary key,
  title text not null,
  date date not null,
  date_label text not null,
  location text not null,
  description text not null,
  image text not null,
  register_href text not null default '#'
);

create table if not exists groups (
  slug text primary key,
  name text not null,
  audience text not null,
  description text not null,
  meeting_time text not null,
  image text not null,
  sort_order integer not null default 0
);

-- ========== Row Level Security ==========
-- 網站首頁需要「公開可讀」（用 anon key）；寫入只允許後台 API Route
-- 用 service role key 操作（service role 會略過 RLS，所以不需要另外寫 insert/update policy）。

alter table services enable row level security;
alter table sermons enable row level security;
alter table events enable row level security;
alter table groups enable row level security;

drop policy if exists "Public can read services" on services;
create policy "Public can read services" on services for select using (true);

drop policy if exists "Public can read sermons" on sermons;
create policy "Public can read sermons" on sermons for select using (true);

drop policy if exists "Public can read events" on events;
create policy "Public can read events" on events for select using (true);

drop policy if exists "Public can read groups" on groups;
create policy "Public can read groups" on groups for select using (true);

-- ========== 種子資料（目前網站上的實際內容）==========

insert into services (id, name, time, location, description, href, sort_order) values
  ('sunday-worship', '主日崇拜', '每週日 第一堂：8:30　第二堂：10:30', '光之城行道會｜海山捷運站 1 號出口步行 1 分鐘', '敬拜、信息與禱告，我們一起在神面前重新得力，開始新的一週。', '/new-here', 1),
  ('kids-sunday', '兒童主日', '每週日 10:00 AM（與主日崇拜同時）', '光之城行道會｜兒童教室', '專為孩子設計的敬拜與故事時間，讓孩子從小認識神的愛。', '/new-here', 2),
  ('prayer-meeting', '禱告會', '每週四 08:00 PM', '光之城行道會｜線上同步', '一起安靜、代禱，為家人、城市與教會的需要祈求。', '/new-here', 3)
on conflict (id) do update set
  name = excluded.name, time = excluded.time, location = excluded.location,
  description = excluded.description, href = excluded.href, sort_order = excluded.sort_order;

insert into sermons (slug, title, speaker, date, scripture, series, youtube_id, thumbnail) values
  ('light-in-the-city-01', '在光中，相遇', '王牧師', '2026-08-23', '約翰福音 1:4-5', '光之城系列', 'dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1508537548955-9c00e7d33e14?w=1200&q=80'),
  ('found-and-home-02', '找到回家的路', '李傳道', '2026-08-16', '路加福音 15:20', '光之城系列', 'dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1445445290350-18a3b86e0b5a?w=1200&q=80'),
  ('hope-that-holds-03', '盼望，撐住我們的日子', '王牧師', '2026-08-09', '羅馬書 15:13', '盼望系列', 'dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=1200&q=80')
on conflict (slug) do nothing;

insert into events (slug, title, date, date_label, location, description, image, register_href) values
  ('city-of-light-worship-night', '光之城敬拜之夜', '2026-09-12', '9/12（六）19:30', '光之城行道會 主堂', '一個晚上，一起唱歌、安靜、被神的愛充滿。邀請朋友一起來。', 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80', '/events/city-of-light-worship-night'),
  ('new-here-brunch', '第一次來｜新朋友早午餐', '2026-09-06', '9/6（日）11:30', '光之城行道會 二樓交誼廳', '如果你是第一次來，歡迎主日結束後留下來，一起吃頓飯、認識彼此。', 'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=1200&q=80', '/events/new-here-brunch'),
  ('family-fun-day', '家庭日：城市裡的小旅行', '2026-09-27', '9/27（日）14:00', '海山周邊集合', '帶著全家大小一起走出戶外，享受陽光與彼此陪伴的時光。', 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&q=80', '/events/family-fun-day')
on conflict (slug) do nothing;

insert into groups (slug, name, audience, description, meeting_time, image, sort_order) values
  ('kids', '兒童', '幼幼～國小', '透過故事、遊戲與敬拜，讓孩子從小認識神的愛與真理。', '主日 10:00 AM', 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80', 1),
  ('youth', '青少年', '國高中', '陪伴青少年在信仰與成長路上，找到屬於自己的答案與夥伴。', '週六 06:30 PM', 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&q=80', 2),
  ('college', '大學生', '大專青年', '在人生選擇最多的階段，一起讀經、彼此陪伴、找方向。', '週五 07:30 PM', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80', 3),
  ('young-adults', '社青', '社會新鮮人～35 歲', '在工作與生活的忙碌中，一起停下來、被信仰餵養。', '週五 08:00 PM', 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80', 4),
  ('fellowship', '同行團契', '各年齡層皆歡迎', '不分年齡、不分背景，一起在信仰路上彼此同行。', '每月第二個週六', 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&q=80', 5),
  ('family', '家庭', '已婚家庭', '陪伴家庭在婚姻、教養與信仰之間，找到平衡與力量。', '每月一次家庭聚會', 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&q=80', 6),
  ('small-groups', '小組', '所有會友', '在小組裡被看見、被了解，一起生活、一起成長。', '依各小組時間', 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80', 7),
  ('prayer', '禱告會', '所有會友', '一起安靜在神面前，為自己、家人與城市代禱。', '每週三 07:30 PM', 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&q=80', 8)
on conflict (slug) do nothing;
