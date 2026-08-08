import Link from "next/link";
import { Job } from "@/lib/types";
import { companyInitials, timeAgo } from "@/lib/utils";
import { RegionBadge, SeniorityBadge } from "./Badge";

export default function JobCard({ job }: { job: Job }) {
  return (
    <Link
      href={`/jobs/${job.id}`}
      className="group flex flex-col gap-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--accent)]/40 hover:shadow-lg hover:shadow-black/[0.03]"
    >
      <div className="flex items-start justify-between gap-3">
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
    </Link>
  );
}
