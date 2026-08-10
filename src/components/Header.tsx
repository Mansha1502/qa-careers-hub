import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import TrackerNavLink from "./TrackerNavLink";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md supports-[backdrop-filter]:bg-[var(--background)]/65">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[var(--foreground)] transition-transform duration-300 group-hover:-rotate-3">
            <span className="font-display text-[17px] italic leading-none text-[var(--background)]">
              Q
            </span>
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-[17px] font-medium tracking-tight text-[var(--foreground)]">
              QA Careers Hub
            </span>
            <span className="hidden text-[11px] font-medium tracking-wide text-[var(--muted-soft)] sm:block">
              INDIA · UAE · EGYPT · REMOTE
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-1.5">
          <Link
            href="/#jobs"
            className="hidden rounded-full px-3.5 py-2 text-[13.5px] font-medium text-[var(--muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)] sm:block"
          >
            Browse jobs
          </Link>
          <TrackerNavLink />
          <Link
            href="/recruiters"
            className="hidden rounded-full px-3.5 py-2 text-[13.5px] font-medium text-[var(--muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)] sm:block"
          >
            Recruiters
          </Link>
          <Link
            href="/about"
            className="hidden rounded-full px-3.5 py-2 text-[13.5px] font-medium text-[var(--muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)] sm:block"
          >
            About
          </Link>
          <span className="mx-1 hidden h-5 w-px bg-[var(--border)] sm:block" />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
