export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-[var(--foreground)]">
                <span className="font-display text-[15px] italic leading-none text-[var(--background)]">
                  Q
                </span>
              </span>
              <span className="font-display text-[15px] font-medium tracking-tight text-[var(--foreground)]">
                QA Careers Hub
              </span>
            </div>
            <p className="mt-4 text-[13.5px] leading-relaxed text-[var(--muted)]">
              A focused board for Quality Assurance roles across India, the UAE, Egypt, and
              globally-open remote positions — from QA Engineer through Director of
              Quality Assurance.
            </p>
          </div>

          <div className="max-w-md text-[13.5px] leading-relaxed text-[var(--muted)]">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted-soft)]">
              A note on the data
            </p>
            <p className="mt-2.5">
              Listings are aggregated from public job boards (primarily Indeed and
              Himalayas) and reflect a snapshot from early August 2026. Postings can
              close or change at any time — always verify details and your eligibility
              on the original listing before applying.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col-reverse items-center justify-between gap-4 border-t border-[var(--border)] pt-7 sm:flex-row">
          <p className="text-xs text-[var(--muted-soft)]">
            © 2026 QA Careers Hub. Built by{" "}
            <span className="font-medium text-[var(--muted)]">Mansha Mehraj</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
