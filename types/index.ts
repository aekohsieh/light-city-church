export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceInfo {
  id: string;
  name: string;
  time: string;
  location: string;
  description: string;
  href: string;
}

export interface Sermon {
  slug: string;
  title: string;
  speaker: string;
  date: string; // ISO string
  scripture: string;
  series?: string;
  youtubeId: string;
  thumbnail: string;
}

export interface ChurchEvent {
  slug: string;
  title: string;
  date: string; // ISO string
  dateLabel: string;
  location: string;
  description: string;
  image: string;
  registerHref: string;
}

export interface Group {
  slug: string;
  name: string;
  audience: string;
  description: string;
  meetingTime: string;
  image: string;
}
