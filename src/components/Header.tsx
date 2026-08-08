import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import TrackerNavLink from "./TrackerNavLink";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--surface)]/85 backdrop-blur supports-[backdrop-filter]:bg-[var(--surface)]/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)] text-sm font-bold text-[var(--accent-foreground)]">
            Q
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-[15px] font-semibold tracking-tight text-[var(--foreground)]">
              QA Careers Hub
            </span>
            <span className="hidden text-[11px] text-[var(--muted)] sm:block">
              India · UAE · Remote
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-1.5 sm:gap-3">
          <Link
            href="/#jobs"
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-[var(--muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)] sm:block"
          >
            Browse jobs
          </Link>
          <TrackerNavLink />
          <Link
            href="/about"
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-[var(--muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)] sm:block"
          >
            About
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
