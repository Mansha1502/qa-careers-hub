import { jobs } from "@/lib/jobs";
import StatsBar from "@/components/StatsBar";
import JobBoard from "@/components/JobBoard";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="noise-texture relative overflow-hidden border-b border-[var(--border)] bg-[var(--background-alt)]">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full opacity-[0.07] blur-3xl"
          style={{ background: "var(--accent)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 bottom-0 h-[320px] w-[320px] rounded-full opacity-[0.06] blur-3xl"
          style={{ background: "var(--accent)" }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-2xl animate-fade-up">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Snapshot updated August 10, 2026
            </span>

            <h1 className="font-display mt-6 text-[2.75rem] font-medium leading-[1.05] tracking-tight text-[var(--foreground)] sm:text-6xl">
              Quality Assurance jobs,
              <br />
              curated for where you work.
            </h1>

            <p className="mt-6 max-w-lg text-[16.5px] leading-relaxed text-[var(--muted)] sm:text-lg">
              From QA Engineer to Director of Quality Assurance — real, verified
              openings across India, the UAE, and Egypt, plus remote roles open
              to candidates globally. Every listing links straight to the apply
              page.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#jobs"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-3 text-[14px] font-semibold text-[var(--background)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                Browse open roles
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="/recruiters"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] px-5 py-3 text-[14px] font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface)]"
              >
                Recruiter contacts
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mb-10">
          <StatsBar jobs={jobs} />
        </div>
        <JobBoard jobs={jobs} />
      </div>
    </div>
  );
}
