"use client";

import { useMemo, useState } from "react";
import { Job, Region, Seniority } from "@/lib/types";
import { seniorityOrder } from "@/lib/utils";
import JobCard from "./JobCard";

const REGIONS: (Region | "All")[] = ["All", "India", "UAE", "Remote"];
type SortKey = "newest" | "oldest" | "company";
type RefreshState = "idle" | "loading" | "done" | "error";

function dedupeJobs(jobs: Job[]): Job[] {
  const seen = new Set<string>();
  return jobs.filter((job) => {
    const key = `${job.company.toLowerCase().trim()}::${job.title.toLowerCase().trim()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export default function JobBoard({ jobs: initialJobs }: { jobs: Job[] }) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [region, setRegion] = useState<Region | "All">("All");
  const [seniorities, setSeniorities] = useState<Set<Seniority>>(new Set());
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("newest");
  const [refreshState, setRefreshState] = useState<RefreshState>("idle");
  const [refreshMessage, setRefreshMessage] = useState("");
  const [liveUnconfigured, setLiveUnconfigured] = useState(false);

  function toggleSeniority(s: Seniority) {
    setSeniorities((prev) => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s);
      else next.add(s);
      return next;
    });
  }

  async function handleRefresh() {
    setRefreshState("loading");
    try {
      const [staticRes, indiaLiveRes, remoteLiveRes] = await Promise.all([
        fetch("/api/jobs", { cache: "no-store" }),
        fetch("/api/jobs/live?region=india", { cache: "no-store" }),
        fetch("/api/jobs/live?region=remote", { cache: "no-store" }),
      ]);

      if (!staticRes.ok) throw new Error("Request failed");
      const staticData: { jobs: Job[]; updatedAt: string } = await staticRes.json();
      const indiaLive: { configured: boolean; jobs: Job[] } = indiaLiveRes.ok
        ? await indiaLiveRes.json()
        : { configured: true, jobs: [] };
      const remoteLive: { configured: boolean; jobs: Job[] } = remoteLiveRes.ok
        ? await remoteLiveRes.json()
        : { configured: true, jobs: [] };

      const isConfigured = indiaLive.configured && remoteLive.configured;
      setLiveUnconfigured(!isConfigured);

      const merged = dedupeJobs([...staticData.jobs, ...indiaLive.jobs, ...remoteLive.jobs]);
      const previousIds = new Set(jobs.map((j) => j.id));
      const newCount = merged.filter((j) => !previousIds.has(j.id)).length;
      const liveCount = indiaLive.jobs.length + remoteLive.jobs.length;

      setJobs(merged);
      if (!isConfigured) {
        setRefreshMessage(
          `Curated snapshot refreshed · ${staticData.jobs.length} roles. Live India/Remote refresh isn't configured yet.`
        );
      } else if (newCount > 0) {
        setRefreshMessage(
          `Loaded ${newCount} new role${newCount === 1 ? "" : "s"} · ${liveCount} live from Adzuna · ${merged.length} total`
        );
      } else {
        setRefreshMessage(`You're up to date · ${merged.length} roles · ${liveCount} checked live just now`);
      }
      setRefreshState("done");
    } catch {
      setRefreshMessage("Couldn't reach the server — check your connection and try again.");
      setRefreshState("error");
    } finally {
      window.setTimeout(() => setRefreshState("idle"), 4200);
    }
  }

  const filtered = useMemo(() => {
    let result = jobs;

    if (region !== "All") {
      result = result.filter((j) => j.region === region);
    }
    if (seniorities.size > 0) {
      result = result.filter((j) => seniorities.has(j.seniority));
    }
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q) ||
          j.location.toLowerCase().includes(q) ||
          j.skills.some((sk) => sk.toLowerCase().includes(q))
      );
    }

    const sorted = [...result];
    if (sort === "newest") {
      sorted.sort((a, b) => b.postedDate.localeCompare(a.postedDate));
    } else if (sort === "oldest") {
      sorted.sort((a, b) => a.postedDate.localeCompare(b.postedDate));
    } else {
      sorted.sort((a, b) => a.company.localeCompare(b.company));
    }
    return sorted;
  }, [jobs, region, seniorities, query, sort]);

  return (
    <div id="jobs" className="scroll-mt-20">
      <div className="flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
        {/* search + refresh row */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <svg
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, company, or skill (e.g. Playwright, Selenium)"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] py-2.5 pl-10 pr-4 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] outline-none ring-[var(--ring)] focus:ring-2"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none ring-[var(--ring)] focus:ring-2"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="company">Company A–Z</option>
            </select>

            <button
              onClick={handleRefresh}
              disabled={refreshState === "loading"}
              title="Re-check the server for the latest published listings"
              className="relative inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-[var(--border)] px-3 py-2.5 text-sm font-medium text-[var(--muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)] disabled:opacity-60"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={refreshState === "loading" ? "animate-spin" : ""}
              >
                <path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="hidden sm:inline">
                {refreshState === "loading" ? "Refreshing…" : "Refresh"}
              </span>
              {refreshState === "done" && (
                <span className="absolute -bottom-10 right-0 z-10 w-72 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-left text-xs leading-relaxed text-[var(--foreground)] shadow-lg">
                  {refreshMessage}
                </span>
              )}
              {refreshState === "error" && (
                <span className="absolute -bottom-10 right-0 z-10 w-72 rounded-lg border border-red-300 bg-[var(--surface)] px-3 py-2 text-left text-xs leading-relaxed text-red-600 shadow-lg dark:border-red-800 dark:text-red-400">
                  {refreshMessage}
                </span>
              )}
            </button>
          </div>
        </div>

        {liveUnconfigured && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-3.5 py-2.5 text-xs leading-relaxed text-amber-800 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400">
            Live refresh for India &amp; Remote isn&apos;t configured yet — add{" "}
            <code className="rounded bg-black/5 px-1 py-0.5 font-mono dark:bg-white/10">
              ADZUNA_APP_ID
            </code>{" "}
            and{" "}
            <code className="rounded bg-black/5 px-1 py-0.5 font-mono dark:bg-white/10">
              ADZUNA_APP_KEY
            </code>{" "}
            (free at developer.adzuna.com) to enable it. Showing the curated snapshot instead.
          </div>
        )}

        {/* region tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          {REGIONS.map((r) => (
            <button
              key={r}
              onClick={() => setRegion(r)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                region === r
                  ? "bg-[var(--accent)] text-[var(--accent-foreground)]"
                  : "bg-[var(--background)] text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {r}
            </button>
          ))}

          <span className="mx-1 hidden h-5 w-px bg-[var(--border)] sm:block" />

          {seniorityOrder.map((s) => {
            const active = seniorities.has(s);
            return (
              <button
                key={s}
                onClick={() => toggleSeniority(s)}
                className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                    : "border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p className="text-sm text-[var(--muted)]">
          Showing <span className="font-medium text-[var(--foreground)]">{filtered.length}</span>{" "}
          of {jobs.length} roles
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-4 flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border)] py-16 text-center">
          <p className="text-sm font-medium text-[var(--foreground)]">No roles match those filters</p>
          <p className="mt-1 text-sm text-[var(--muted)]">Try clearing a filter or searching a different term.</p>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
