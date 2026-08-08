export type ApplicationStatus = "saved" | "applied" | "interviewing" | "offer" | "rejected";

export interface TrackedApplication {
  jobId: string;
  status: ApplicationStatus;
  notes: string;
  followUpDate?: string;
  updatedAt: string;
}

export const STATUS_ORDER: ApplicationStatus[] = [
  "saved",
  "applied",
  "interviewing",
  "offer",
  "rejected",
];

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  saved: "Saved",
  applied: "Applied",
  interviewing: "Interviewing",
  offer: "Offer",
  rejected: "Rejected",
};

export const STATUS_STYLES: Record<ApplicationStatus, { bg: string; text: string; dot: string }> = {
  saved: {
    bg: "bg-slate-100 dark:bg-slate-800",
    text: "text-slate-700 dark:text-slate-300",
    dot: "bg-slate-400",
  },
  applied: {
    bg: "bg-indigo-50 dark:bg-indigo-500/10",
    text: "text-indigo-700 dark:text-indigo-400",
    dot: "bg-indigo-500",
  },
  interviewing: {
    bg: "bg-amber-50 dark:bg-amber-500/10",
    text: "text-amber-700 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  offer: {
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    text: "text-emerald-700 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  rejected: {
    bg: "bg-rose-50 dark:bg-rose-500/10",
    text: "text-rose-700 dark:text-rose-400",
    dot: "bg-rose-500",
  },
};

export const TRACKER_STORAGE_KEY = "qa-careers-hub:tracker:v1";
