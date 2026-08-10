"use client";

import { useMemo, useState } from "react";
import { recruiters, HiringRegion, RecruiterCategory } from "@/lib/recruiters";
import RecruiterCard from "@/components/RecruiterCard";

const REGIONS: (HiringRegion | "All")[] = ["All", "Delhi", "UAE", "Remote"];
const CATEGORIES: (RecruiterCategory | "All")[] = ["All", "Recruiting Agency", "IT Company"];

const REGION_ORDER: HiringRegion[] = ["UAE", "Delhi", "Remote"];
const REGION_LABELS: Record<HiringRegion, string> = {
  UAE: "United Arab Emirates",
  Delhi: "India · Delhi-NCR",
  Remote: "Remote / Global",
};

export default function RecruitersPage() {
  const [region, setRegion] = useState<HiringRegion | "All">("All");
  const [category, setCategory] = useState<RecruiterCategory | "All">("All");
  const [query, setQuery] = useState("");

  const emailCount = recruiters.filter((r) => r.contactType === "email").length;
  const agencyCount = recruiters.filter((r) => r.category === "Recruiting Agency").length;
  const companyCount = recruiters.filter((r) => r.category === "IT Company").length;

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();

    function matches(r: (typeof recruiters)[number]) {
      const categoryMatch = category === "All" || r.category === category;
      if (!categoryMatch) return false;
      if (!q) return true;
      return (
        r.company.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q) ||
        (r.contactType === "email" && r.contactValue.toLowerCase().includes(q))
      );
    }

    const regions = region === "All" ? REGION_ORDER : [region];

    return regions.map((r) => {
      const contacts = recruiters
        .filter((c) => c.hiresFor.includes(r) && matches(c))
        .sort((a, b) => {
          if (a.contactType !== b.contactType) return a.contactType === "email" ? -1 : 1;
          return a.company.localeCompare(b.company);
        });
      return { region: r, contacts };
    });
  }, [region, category, query]);

  const totalShown = groups.reduce((sum, g) => sum + g.contacts.length, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      <h1 className="font-display text-[2.1rem] font-medium tracking-tight text-[var(--foreground)] sm:text-4xl">
        Recruiter Contacts
      </h1>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[var(--muted)]">
        Recruiting agencies and IT companies actively hiring for Remote, UAE, or
        Delhi-NCR roles. Every contact is verified against the company&apos;s own
        site or a real job posting we sourced — never guessed.
      </p>

      <div className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] sm:grid-cols-4">
        <div className="bg-[var(--surface)] px-4 py-4 text-center">
          <div className="font-display text-2xl font-medium tracking-tight text-[var(--foreground)]">
            {recruiters.length}
          </div>
          <div className="mt-0.5 text-[11.5px] font-medium text-[var(--muted)]">Total contacts</div>
        </div>
        <div className="bg-[var(--surface)] px-4 py-4 text-center">
          <div className="font-display text-2xl font-medium tracking-tight text-emerald-600 dark:text-emerald-400">
            {emailCount}
          </div>
          <div className="mt-0.5 text-[11.5px] font-medium text-[var(--muted)]">Direct emails</div>
        </div>
        <div className="bg-[var(--surface)] px-4 py-4 text-center">
          <div className="font-display text-2xl font-medium tracking-tight text-[var(--foreground)]">
            {agencyCount}
          </div>
          <div className="mt-0.5 text-[11.5px] font-medium text-[var(--muted)]">Recruiting agencies</div>
        </div>
        <div className="bg-[var(--surface)] px-4 py-4 text-center">
          <div className="font-display text-2xl font-medium tracking-tight text-[var(--foreground)]">
            {companyCount}
          </div>
          <div className="mt-0.5 text-[11.5px] font-medium text-[var(--muted)]">IT companies</div>
        </div>
      </div>

      <div className="card-shadow mt-6 flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
        <div className="relative">
          <svg
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-soft)]"
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
            placeholder="Search by company, location, or email"
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] py-2.5 pl-10 pr-4 text-[14px] text-[var(--foreground)] placeholder:text-[var(--muted-soft)] outline-none ring-[var(--ring)] focus:ring-2"
          />
        </div>

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
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                category === c
                  ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                  : "border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-5 text-sm text-[var(--muted)]">
        Showing <span className="font-medium text-[var(--foreground)]">{totalShown}</span> contact
        {totalShown === 1 ? "" : "s"} · grouped by country · direct emails shown first
      </p>

      {totalShown === 0 ? (
        <div className="mt-4 flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border)] py-16 text-center">
          <p className="text-sm font-medium text-[var(--foreground)]">No contacts match those filters</p>
          <p className="mt-1 text-sm text-[var(--muted)]">Try clearing a filter or searching a different term.</p>
        </div>
      ) : (
        <div className="mt-8 space-y-10">
          {groups.map(({ region: r, contacts }) =>
            contacts.length === 0 ? null : (
              <div key={r}>
                <div className="flex items-baseline gap-2.5 border-b border-[var(--border)] pb-3">
                  <h2 className="font-display text-xl font-medium tracking-tight text-[var(--foreground)]">
                    {REGION_LABELS[r]}
                  </h2>
                  <span className="text-[13px] text-[var(--muted-soft)]">
                    {contacts.length} contact{contacts.length === 1 ? "" : "s"}
                  </span>
                </div>
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {contacts.map((r) => (
                    <RecruiterCard key={r.id} recruiter={r} />
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      )}

      <div className="mt-9 rounded-2xl border border-dashed border-[var(--border)] bg-[var(--background-alt)] p-4 text-[12.5px] leading-relaxed text-[var(--muted)]">
        We never invent recruiter emails. Where a company doesn&apos;t publish one
        (true for most large corporates, who route hiring entirely through their
        applicant portal), we link to their official careers page instead of
        guessing an address. A few boutique agencies only publish one
        consultant&apos;s personal email rather than a general inbox — those are
        labeled accordingly since that contact could change over time.
      </div>
    </div>
  );
}
