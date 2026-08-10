"use client";

import Link from "next/link";
import { jobs } from "@/lib/jobs";
import { useTracker } from "@/components/TrackerProvider";
import {
  ApplicationStatus,
  STATUS_LABELS,
  STATUS_ORDER,
  STATUS_STYLES,
} from "@/lib/tracker";
import { companyInitials, formatDate } from "@/lib/utils";

const jobsById = new Map(jobs.map((j) => [j.id, j]));

function isOverdue(dateStr: string | undefined): boolean {
  if (!dateStr) return false;
  return new Date(dateStr) < new Date(new Date().toDateString());
}

export default function TrackerPage() {
  const { tracked, hydrated, setStatus, remove } = useTracker();

  const entries = Object.values(tracked)
    .map((entry) => ({ entry, job: jobsById.get(entry.jobId) }))
    .filter((x): x is { entry: (typeof tracked)[string]; job: NonNullable<ReturnType<typeof jobsById.get>> } => Boolean(x.job));

  const grouped: Record<ApplicationStatus, typeof entries> = {
    saved: [],
    applied: [],
    interviewing: [],
    offer: [],
    rejected: [],
  };
  for (const item of entries) {
    grouped[item.entry.status].push(item);
  }
  for (const status of STATUS_ORDER) {
    grouped[status].sort((a, b) => b.entry.updatedAt.localeCompare(a.entry.updatedAt));
  }

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="h-8 w-64 animate-pulse rounded bg-[var(--surface-hover)]" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      <h1 className="font-display text-[2.1rem] font-medium tracking-tight text-[var(--foreground)] sm:text-4xl">
        My Tracker
      </h1>
      <p className="mt-2.5 text-[15px] leading-relaxed text-[var(--muted)]">
        {entries.length === 0
          ? "Nothing tracked yet — save a job from any listing to start building your pipeline."
          : `${entries.length} role${entries.length === 1 ? "" : "s"} tracked, saved privately in this browser.`}
      </p>

      {entries.length === 0 ? (
        <Link
          href="/#jobs"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-3 text-[14px] font-semibold text-[var(--background)] transition-transform duration-200 hover:-translate-y-0.5"
        >
          Browse open roles
        </Link>
      ) : (
        <div className="mt-9 space-y-9">
          {STATUS_ORDER.map((status) => {
            const items = grouped[status];
            if (items.length === 0) return null;
            const styles = STATUS_STYLES[status];
            return (
              <div key={status}>
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${styles.dot}`} />
                  <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[var(--foreground)]">
                    {STATUS_LABELS[status]}
                  </h2>
                  <span className="text-[13px] text-[var(--muted-soft)]">({items.length})</span>
                </div>

                <div className="mt-3.5 space-y-2.5">
                  {items.map(({ entry, job }) => (
                    <div
                      key={job.id}
                      className="card-shadow flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 transition-shadow hover:card-shadow-hover sm:flex-row sm:items-center sm:justify-between"
                    >
                      <Link href={`/jobs/${job.id}`} className="flex min-w-0 items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-xs font-semibold text-[var(--accent)]">
                          {companyInitials(job.company)}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-[var(--foreground)] hover:text-[var(--accent)]">
                            {job.title}
                          </p>
                          <p className="truncate text-xs text-[var(--muted)]">
                            {job.company} · {job.location}
                          </p>
                          {entry.notes && (
                            <p className="mt-1 line-clamp-1 text-xs text-[var(--muted-soft)]">
                              {entry.notes}
                            </p>
                          )}
                        </div>
                      </Link>

                      <div className="flex shrink-0 items-center gap-2 sm:pl-4">
                        {entry.followUpDate && (
                          <span
                            className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${
                              isOverdue(entry.followUpDate)
                                ? "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400"
                                : "bg-[var(--background)] text-[var(--muted)]"
                            }`}
                          >
                            Follow up {formatDate(entry.followUpDate)}
                          </span>
                        )}
                        <select
                          value={entry.status}
                          onChange={(e) => setStatus(job.id, e.target.value as ApplicationStatus)}
                          className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-2 py-1.5 text-xs text-[var(--foreground)] outline-none ring-[var(--ring)] focus:ring-2"
                        >
                          {STATUS_ORDER.map((s) => (
                            <option key={s} value={s}>
                              {STATUS_LABELS[s]}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => remove(job.id)}
                          aria-label="Remove from tracker"
                          className="rounded-full p-1.5 text-[var(--muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-red-600 dark:hover:text-red-400"
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
