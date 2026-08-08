"use client";

import Link from "next/link";
import { Job } from "@/lib/types";
import { companyInitials, timeAgo } from "@/lib/utils";
import { RegionBadge, SeniorityBadge } from "./Badge";
import { useTracker } from "./TrackerProvider";
import { STATUS_LABELS, STATUS_STYLES } from "@/lib/tracker";

export default function JobCard({ job }: { job: Job }) {
  const { tracked, hydrated, setStatus, remove } = useTracker();
  const entry = tracked[job.id];

  function toggleSave(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (entry) {
      remove(job.id);
    } else {
      setStatus(job.id, "saved");
    }
  }

  return (
    <Link
      href={`/jobs/${job.id}`}
      className="group relative flex flex-col gap-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--accent)]/40 hover:shadow-lg hover:shadow-black/[0.03]"
    >
      <button
        onClick={toggleSave}
        aria-label={entry ? "Remove from tracker" : "Save to tracker"}
        className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-md text-[var(--muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill={entry ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          className={entry ? "text-[var(--accent)]" : ""}
        >
          <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="flex items-start justify-between gap-3 pr-8">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-sm font-semibold text-[var(--accent)]">
            {companyInitials(job.company)}
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-[15px] font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)]">
              {job.title}
            </h3>
            <p className="truncate text-sm text-[var(--muted)]">{job.company}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <RegionBadge region={job.region} />
        <SeniorityBadge seniority={job.seniority} />
        {job.remote && (
          <span className="inline-flex items-center rounded-full border border-[var(--border)] px-2.5 py-1 text-xs font-medium text-[var(--muted)]">
            Remote-friendly
          </span>
        )}
        {job.live && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Live
          </span>
        )}
      </div>

      <p className="line-clamp-2 text-sm leading-relaxed text-[var(--muted)]">{job.summary}</p>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-[var(--border)] pt-3.5 text-xs text-[var(--muted)]">
        <span className="truncate">{job.location}</span>
        <span className="shrink-0">{timeAgo(job.postedDate)}</span>
      </div>

      {hydrated && entry && (
        <span
          className={`absolute -top-2 left-4 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium shadow-sm ${STATUS_STYLES[entry.status].bg} ${STATUS_STYLES[entry.status].text}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${STATUS_STYLES[entry.status].dot}`} />
          {STATUS_LABELS[entry.status]}
        </span>
      )}
    </Link>
  );
}
