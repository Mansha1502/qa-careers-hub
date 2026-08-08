export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-md">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[var(--accent)] text-xs font-bold text-[var(--accent-foreground)]">
                Q
              </span>
              <span className="text-sm font-semibold text-[var(--foreground)]">
                QA Careers Hub
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
              A focused board for Quality Assurance roles across India, the UAE, and
              globally-open remote positions — from QA Engineer through Director of
              Quality Assurance.
            </p>
          </div>

          <div className="max-w-md text-sm leading-relaxed text-[var(--muted)]">
            <p className="font-medium text-[var(--foreground)]">A note on the data</p>
            <p className="mt-2">
              Listings are aggregated from public job boards (primarily Indeed and
              Himalayas) and reflect a snapshot from early August 2026. Postings can
              close or change at any time — always verify details and your eligibility
              on the original listing before applying.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse items-center justify-between gap-4 border-t border-[var(--border)] pt-6 sm:flex-row">
          <p className="text-xs text-[var(--muted)]">
            © 2026 QA Careers Hub. Built by{" "}
            <span className="font-medium text-[var(--foreground)]">Mansha Mehraj</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
