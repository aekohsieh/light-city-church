import { NavItem } from "@/types";

/**
 * 導覽列資料。未來若頁面增加（最新消息、服事團隊等），
 * 只需在此陣列新增項目，Navbar 元件不需修改。
 */
export const navItems: NavItem[] = [
  { label: "首頁", href: "/" },
  { label: "關於我們", href: "/about" },
  { label: "聚會", href: "/#service-info" },
  { label: "主日信息", href: "/sermons" },
  { label: "團契與小組", href: "/groups" },
  { label: "活動", href: "/events" },
  { label: "第一次來", href: "/new-here" },
  { label: "認識耶穌", href: "/jesus" },
  { label: "奉獻", href: "/giving" }
];

export const primaryCta: NavItem = { label: "第一次來", href: "/new-here" };
