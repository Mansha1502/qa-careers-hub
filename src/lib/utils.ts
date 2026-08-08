import { Region, Seniority } from "./types";

export function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date("2026-08-08");
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 30) return `${diffDays} days ago`;
  const months = Math.round(diffDays / 30);
  if (months < 12) return months === 1 ? "1 month ago" : `${months} months ago`;
  const years = Math.round(months / 12);
  return years === 1 ? "1 year ago" : `${years} years ago`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const regionStyles: Record<Region, { bg: string; text: string; dot: string }> = {
  India: {
    bg: "bg-amber-50 dark:bg-amber-500/10",
    text: "text-amber-700 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  UAE: {
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    text: "text-emerald-700 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  Remote: {
    bg: "bg-sky-50 dark:bg-sky-500/10",
    text: "text-sky-700 dark:text-sky-400",
    dot: "bg-sky-500",
  },
};

export const seniorityOrder: Seniority[] = ["Engineer", "Senior", "Lead", "Manager", "Director"];

export const seniorityStyles: Record<Seniority, string> = {
  Engineer:
    "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  Senior:
    "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400",
  Lead: "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400",
  Manager: "bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-500/10 dark:text-fuchsia-400",
  Director: "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400",
};

export function companyInitials(name: string): string {
  const cleaned = name.replace(/[™®©]/g, "").trim();
  const words = cleaned.split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}
