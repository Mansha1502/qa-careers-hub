import { jobs } from "@/lib/jobs";
import StatsBar from "@/components/StatsBar";
import JobBoard from "@/components/JobBoard";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--background)] px-3 py-1 text-xs font-medium text-[var(--muted)]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Snapshot updated August 8, 2026
            </span>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl">
              Quality Assurance jobs,
              <br />
              curated for where you work.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              From QA Engineer to Director of Quality Assurance — real, verified
              openings across India and the UAE, plus remote roles open to
              candidates globally. Every listing links straight to the apply page.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mb-8">
          <StatsBar jobs={jobs} />
        </div>
        <JobBoard jobs={jobs} />
      </div>
    </div>
  );
}
