import Link from "next/link";
import { notFound } from "next/navigation";
import { jobs } from "@/lib/jobs";
import { companyInitials, formatDate, timeAgo } from "@/lib/utils";
import { RegionBadge, SeniorityBadge, Chip } from "@/components/Badge";
import JobCard from "@/components/JobCard";
import JobTrackerPanel from "@/components/JobTrackerPanel";

export function generateStaticParams() {
  return jobs.map((j) => ({ id: j.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = jobs.find((j) => j.id === id);
  if (!job) return {};
  return {
    title: `${job.title} at ${job.company} — QA Careers Hub`,
    description: job.summary,
  };
}

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = jobs.find((j) => j.id === id);
  if (!job) notFound();

  const related = jobs
    .filter((j) => j.id !== job.id && (j.region === job.region || j.company === job.company))
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <Link
        href="/#jobs"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to all jobs
      </Link>

      <div className="mt-5 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
        {/* Main column */}
        <div>
          <div className="flex items-start gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-lg font-semibold text-[var(--accent)]">
              {companyInitials(job.company)}
            </span>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl">
                {job.title}
              </h1>
              <p className="mt-1 text-base text-[var(--muted)]">{job.company}</p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-1.5">
            <RegionBadge region={job.region} />
            <SeniorityBadge seniority={job.seniority} />
            <Chip>{job.employmentType}</Chip>
            {job.remote && <Chip>Remote-friendly</Chip>}
          </div>

          <p className="mt-6 text-[15px] leading-relaxed text-[var(--foreground)]">{job.summary}</p>

          <div className="mt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
              Role highlights
            </h2>
            <ul className="mt-3 space-y-2.5">
              {job.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-[var(--foreground)]">
                  <svg
                    className="mt-1 h-3.5 w-3.5 shrink-0 text-[var(--accent)]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
              Skills &amp; tools
            </h2>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {job.skills.map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-dashed border-[var(--border)] bg-[var(--surface)] p-4 text-xs leading-relaxed text-[var(--muted)]">
            Sourced via {job.source} on {formatDate(job.postedDate)}. Job details can change
            or postings can close at any time — please verify current status,
            full requirements, and your eligibility on the original listing before
            applying.
          </div>
        </div>

        {/* Sidebar */}
        <div className="h-fit space-y-4 lg:sticky lg:top-24">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <a
              href={job.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-[var(--accent-foreground)] transition-colors hover:bg-[var(--accent-hover)]"
            >
              Apply to this role
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17 17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <div className="mt-4 space-y-3 border-t border-[var(--border)] pt-4 text-sm">
              <Fact label="Location" value={job.location} />
              <Fact label="Employment type" value={job.employmentType} />
              {job.salary && <Fact label="Compensation" value={job.salary} />}
              <Fact label="Posted" value={`${formatDate(job.postedDate)} · ${timeAgo(job.postedDate)}`} />
            </div>

            <div className="mt-4 border-t border-[var(--border)] pt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                HR / recruiter contact
              </p>
              {job.hrEmail ? (
                <a
                  href={`mailto:${job.hrEmail}`}
                  className="mt-2 flex items-center gap-2 rounded-lg border border-[var(--border)] px-3 py-2.5 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface-hover)]"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-[var(--accent)]">
                    <path d="M3 6h18v12H3z" strokeLinejoin="round" />
                    <path d="m3 7 9 6 9-6" strokeLinejoin="round" />
                  </svg>
                  <span className="truncate">{job.hrEmail}</span>
                </a>
              ) : (
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  No direct HR email is publicly listed for this role — apply via
                  the button above, which takes you straight to the official
                  posting.
                </p>
              )}
            </div>
          </div>

          <JobTrackerPanel jobId={job.id} />
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-14">
          <h2 className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
            More roles you might like
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((j) => (
              <JobCard key={j.id} job={j} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="text-[var(--muted)]">{label}</span>
      <span className="text-right font-medium text-[var(--foreground)]">{value}</span>
    </div>
  );
}
