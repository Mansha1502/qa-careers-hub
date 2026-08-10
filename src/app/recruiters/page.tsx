"use client";

import { useMemo, useState } from "react";
import { recruiters, HiringRegion, RecruiterCategory } from "@/lib/recruiters";
import RecruiterCard from "@/components/RecruiterCard";

const REGIONS: (HiringRegion | "All")[] = ["All", "Delhi", "UAE", "Remote"];
const CATEGORIES: (RecruiterCategory | "All")[] = ["All", "Recruiting Agency", "IT Company"];

export default function RecruitersPage() {
  const [region, setRegion] = useState<HiringRegion | "All">("All");
  const [category, setCategory] = useState<RecruiterCategory | "All">("All");

  const filtered = useMemo(() => {
    return recruiters.filter((r) => {
      const regionMatch = region === "All" || r.hiresFor.includes(region);
      const categoryMatch = category === "All" || r.category === category;
      return regionMatch && categoryMatch;
    });
  }, [region, category]);

  const emailCount = recruiters.filter((r) => r.contactType === "email").length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">
        Recruiter Contacts
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
        Recruiting agencies and IT companies actively hiring for Remote, UAE, or
        Delhi-NCR roles. Every contact here is verified against the company&apos;s
        own site or a real job posting — {emailCount} of {recruiters.length} have a
        genuinely published email; the rest link to their official careers page
        because they don&apos;t publish a direct recruiter address.
      </p>

      <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
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
        Showing <span className="font-medium text-[var(--foreground)]">{filtered.length}</span> of{" "}
        {recruiters.length} contacts
      </p>

      {filtered.length === 0 ? (
        <div className="mt-4 flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border)] py-16 text-center">
          <p className="text-sm font-medium text-[var(--foreground)]">No contacts match those filters</p>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <RecruiterCard key={r.id} recruiter={r} />
          ))}
        </div>
      )}

      <div className="mt-8 rounded-xl border border-dashed border-[var(--border)] bg-[var(--surface)] p-4 text-xs leading-relaxed text-[var(--muted)]">
        We never invent recruiter emails. Where a company doesn&apos;t publish one
        (true for most large corporates, who route hiring entirely through their
        applicant portal), we link to their official careers page instead of
        guessing an address.
      </div>
    </div>
  );
}
