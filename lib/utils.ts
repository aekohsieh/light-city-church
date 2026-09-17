import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 合併 Tailwind className，避免樣式衝突。
 * 供所有元件共用，避免 hard code class string 拼接。
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
