import { RecruiterContact } from "@/lib/recruiters";
import { companyInitials } from "@/lib/utils";

const regionStyles: Record<string, string> = {
  Remote: "bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400",
  UAE: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  Delhi: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
};

export default function RecruiterCard({ recruiter }: { recruiter: RecruiterContact }) {
  return (
    <div className="flex flex-col gap-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-sm font-semibold text-[var(--accent)]">
          {companyInitials(recruiter.company)}
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-[15px] font-semibold text-[var(--foreground)]">
            {recruiter.company}
          </h3>
          <p className="truncate text-sm text-[var(--muted)]">{recruiter.location}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <span className="inline-flex items-center rounded-full border border-[var(--border)] px-2.5 py-1 text-xs font-medium text-[var(--muted)]">
          {recruiter.category}
        </span>
        {recruiter.hiresFor.map((region) => (
          <span
            key={region}
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${regionStyles[region]}`}
          >
            {region}
          </span>
        ))}
      </div>

      {recruiter.note && (
        <p className="text-sm leading-relaxed text-[var(--muted)]">{recruiter.note}</p>
      )}

      <div className="mt-auto pt-1">
        {recruiter.contactType === "email" ? (
          <a
            href={`mailto:${recruiter.contactValue}`}
            className="flex items-center gap-2 rounded-lg border border-[var(--border)] px-3 py-2.5 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface-hover)]"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-[var(--accent)]">
              <path d="M3 6h18v12H3z" strokeLinejoin="round" />
              <path d="m3 7 9 6 9-6" strokeLinejoin="round" />
            </svg>
            <span className="truncate">{recruiter.contactValue}</span>
          </a>
        ) : (
          <a
            href={recruiter.contactValue}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-[var(--border)] px-3 py-2.5 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface-hover)]"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-[var(--accent)]">
              <path d="M7 17 17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="truncate">Visit careers page</span>
          </a>
        )}
        {recruiter.contactLabel && (
          <p className="mt-1.5 text-xs text-[var(--muted)]">{recruiter.contactLabel}</p>
        )}
      </div>
    </div>
  );
}
