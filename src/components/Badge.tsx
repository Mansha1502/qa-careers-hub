import { ReactNode } from "react";

export function RegionBadge({
  region,
}: {
  region: "India" | "UAE" | "Egypt" | "Remote";
}) {
  const styles = {
    India: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
    UAE: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
    Egypt: "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400",
    Remote: "bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400",
  }[region];
  const dot = {
    India: "bg-amber-500",
    UAE: "bg-emerald-500",
    Egypt: "bg-violet-500",
    Remote: "bg-sky-500",
  }[region];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${styles}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {region}
    </span>
  );
}

export function SeniorityBadge({
  seniority,
}: {
  seniority: "Engineer" | "Senior" | "Lead" | "Manager" | "Director";
}) {
  const styles = {
    Engineer: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    Senior: "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400",
    Lead: "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400",
    Manager: "bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-500/10 dark:text-fuchsia-400",
    Director: "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400",
  }[seniority];

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${styles}`}>
      {seniority}
    </span>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--background)] px-2.5 py-1 text-[11.5px] font-medium text-[var(--muted)]">
      {children}
    </span>
  );
}
