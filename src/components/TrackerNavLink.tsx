"use client";

import Link from "next/link";
import { useTracker } from "./TrackerProvider";

export default function TrackerNavLink() {
  const { tracked, hydrated } = useTracker();
  const count = Object.keys(tracked).length;

  return (
    <Link
      href="/tracker"
      className="relative hidden items-center rounded-lg px-3 py-2 text-sm font-medium text-[var(--muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)] sm:flex"
    >
      My Tracker
      {hydrated && count > 0 && (
        <span className="ml-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--accent)] px-1 text-[11px] font-semibold text-[var(--accent-foreground)]">
          {count}
        </span>
      )}
    </Link>
  );
}
