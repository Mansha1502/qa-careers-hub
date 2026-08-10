export const metadata = {
  title: "About — QA Careers Hub",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <h1 className="font-display text-[2.1rem] font-medium tracking-tight text-[var(--foreground)] sm:text-4xl">
        About QA Careers Hub
      </h1>
      <div className="mt-7 space-y-4 text-[15.5px] leading-relaxed text-[var(--muted)]">
        <p>
          QA Careers Hub is a focused job board for Quality Assurance roles —
          from QA Engineer through Director of Quality Assurance — across
          four tracks: India, the UAE, Egypt, and remote positions open to
          candidates globally.
        </p>
        <p>
          Every listing links directly to its original posting so you can
          verify details and apply through the real source. Where a recruiter
          or HR email is genuinely published in a listing, it&apos;s shown on
          the job page — nothing is invented. Most roles don&apos;t publish a
          direct contact, so the apply link is the fastest path in.
        </p>
        <p>
          Listings are aggregated from public job boards, primarily Indeed
          and Himalayas, and reflect a snapshot in time. Postings can close
          or change, so always confirm current status on the original page
          before applying.
        </p>
        <p className="pt-3 text-[15px] text-[var(--foreground)]">
          Built by <span className="font-display italic text-[var(--accent)]">Mansha Mehraj</span>.
        </p>
      </div>
    </div>
  );
}
