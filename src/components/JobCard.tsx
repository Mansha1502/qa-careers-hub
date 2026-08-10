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
      className="card-shadow group relative flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-all duration-200 hover:card-shadow-hover hover:-translate-y-[3px] hover:border-[var(--border-strong)]"
    >
      <button
        onClick={toggleSave}
        aria-label={entry ? "Remove from tracker" : "Save to tracker"}
        className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-[var(--muted-soft)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--accent)]"
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

      <div className="flex items-start gap-3 pr-8">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[13px] font-semibold text-[var(--accent)]">
          {companyInitials(job.company)}
        </span>
        <div className="min-w-0 pt-0.5">
          <h3 className="font-display truncate text-[16.5px] font-medium leading-snug text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)]">
            {job.title}
          </h3>
          <p className="truncate text-[13.5px] text-[var(--muted)]">{job.company}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <RegionBadge region={job.region} />
        <SeniorityBadge seniority={job.seniority} />
        {job.remote && (
          <span className="inline-flex items-center rounded-full border border-[var(--border)] px-2.5 py-1 text-[11px] font-medium text-[var(--muted)]">
            Remote-friendly
          </span>
        )}
        {job.live && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Live
          </span>
        )}
      </div>

      <p className="line-clamp-2 text-[13.5px] leading-relaxed text-[var(--muted)]">{job.summary}</p>

      {job.skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {job.skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="rounded-md bg-[var(--background-alt)] px-2 py-1 text-[11px] font-medium text-[var(--muted)]"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-[var(--border)] pt-3.5 text-[11.5px] text-[var(--muted-soft)]">
        <span className="truncate">{job.location}</span>
        <span className="shrink-0">{timeAgo(job.postedDate)}</span>
      </div>

      {hydrated && entry && (
        <span
          className={`absolute -top-2.5 left-4 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium shadow-sm ${STATUS_STYLES[entry.status].bg} ${STATUS_STYLES[entry.status].text}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${STATUS_STYLES[entry.status].dot}`} />
          {STATUS_LABELS[entry.status]}
        </span>
      )}
    </Link>
  );
}
