import { Region, Seniority } from "./types";

// Bump this to the current date each time jobs.ts is refreshed with new listings.
// Drives "time ago" text, the "New" badge window, and the /api/jobs updatedAt field —
// kept as a pinned snapshot date (not wall-clock time) so listings don't silently
// drift stale-looking between refreshes.
export const SITE_UPDATED_AT = "2026-08-14";

const NEW_JOB_WINDOW_DAYS = 2;

function daysSince(dateStr: string): number {
  const date = new Date(dateStr);
  const now = new Date(SITE_UPDATED_AT);
  const diffMs = now.getTime() - date.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

export function timeAgo(dateStr: string): string {
  const diffDays = daysSince(dateStr);

  if (diffDays <= 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 30) return `${diffDays} days ago`;
  const months = Math.round(diffDays / 30);
  if (months < 12) return months === 1 ? "1 month ago" : `${months} months ago`;
  const years = Math.round(months / 12);
  return years === 1 ? "1 year ago" : `${years} years ago`;
}

export function isNewJob(dateStr: string): boolean {
  const diffDays = daysSince(dateStr);
  return diffDays >= 0 && diffDays <= NEW_JOB_WINDOW_DAYS;
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
  Egypt: {
    bg: "bg-violet-50 dark:bg-violet-500/10",
    text: "text-violet-700 dark:text-violet-400",
    dot: "bg-violet-500",
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
