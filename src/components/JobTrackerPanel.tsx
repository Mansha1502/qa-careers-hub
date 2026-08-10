"use client";

import { useState, useEffect } from "react";
import { useTracker } from "./TrackerProvider";
import { ApplicationStatus, STATUS_LABELS, STATUS_ORDER, STATUS_STYLES } from "@/lib/tracker";

export default function JobTrackerPanel({ jobId }: { jobId: string }) {
  const { tracked, hydrated, setStatus, setNotes, setFollowUpDate, remove } = useTracker();
  const entry = tracked[jobId];
  const [notesDraft, setNotesDraft] = useState(entry?.notes ?? "");
  const [savedFlash, setSavedFlash] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- resync local draft when the stored entry changes externally
    setNotesDraft(entry?.notes ?? "");
  }, [entry?.notes]);

  function handleStatusClick(status: ApplicationStatus) {
    setStatus(jobId, status);
  }

  function handleNotesBlur() {
    if (notesDraft !== (entry?.notes ?? "")) {
      setNotes(jobId, notesDraft);
      setSavedFlash(true);
      window.setTimeout(() => setSavedFlash(false), 1500);
    }
  }

  if (!hydrated) {
    return (
      <div className="card-shadow rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
        <div className="h-5 w-32 animate-pulse rounded bg-[var(--surface-hover)]" />
      </div>
    );
  }

  return (
    <div className="card-shadow rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted-soft)]">
          My tracker
        </p>
        {entry && (
          <button
            onClick={() => remove(jobId)}
            className="text-xs font-medium text-[var(--muted)] transition-colors hover:text-red-600 dark:hover:text-red-400"
          >
            Remove
          </button>
        )}
      </div>

      <div className="mt-3.5 flex flex-wrap gap-1.5">
        {STATUS_ORDER.map((status) => {
          const active = entry?.status === status;
          const styles = STATUS_STYLES[status];
          return (
            <button
              key={status}
              onClick={() => handleStatusClick(status)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                active
                  ? `border-transparent ${styles.bg} ${styles.text}`
                  : "border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${active ? styles.dot : "bg-[var(--border)]"}`} />
              {STATUS_LABELS[status]}
            </button>
          );
        })}
      </div>

      {entry && (
        <div className="mt-4 space-y-3.5 border-t border-[var(--border)] pt-4">
          <div>
            <label htmlFor="followup" className="text-xs font-medium text-[var(--muted)]">
              Follow-up date
            </label>
            <input
              id="followup"
              type="date"
              value={entry.followUpDate ?? ""}
              onChange={(e) => setFollowUpDate(jobId, e.target.value || undefined)}
              className="mt-1.5 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] outline-none ring-[var(--ring)] focus:ring-2"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="notes" className="text-xs font-medium text-[var(--muted)]">
                Notes
              </label>
              {savedFlash && <span className="text-xs text-emerald-600 dark:text-emerald-400">Saved</span>}
            </div>
            <textarea
              id="notes"
              value={notesDraft}
              onChange={(e) => setNotesDraft(e.target.value)}
              onBlur={handleNotesBlur}
              rows={4}
              placeholder="Recruiter contact, interview prep, referral name..."
              className="mt-1.5 w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-soft)] outline-none ring-[var(--ring)] focus:ring-2"
            />
          </div>
        </div>
      )}

      {!entry && (
        <p className="mt-3 text-xs leading-relaxed text-[var(--muted)]">
          Pick a status above to start tracking this application — notes and
          follow-up reminders are saved privately in this browser.
        </p>
      )}
    </div>
  );
}
