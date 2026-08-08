"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { ApplicationStatus, TrackedApplication, TRACKER_STORAGE_KEY } from "@/lib/tracker";

type TrackerMap = Record<string, TrackedApplication>;

interface TrackerContextValue {
  tracked: TrackerMap;
  hydrated: boolean;
  setStatus: (jobId: string, status: ApplicationStatus) => void;
  setNotes: (jobId: string, notes: string) => void;
  setFollowUpDate: (jobId: string, date: string | undefined) => void;
  remove: (jobId: string) => void;
}

const TrackerContext = createContext<TrackerContextValue | null>(null);

function loadFromStorage(): TrackerMap {
  try {
    const raw = window.localStorage.getItem(TRACKER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveToStorage(data: TrackerMap) {
  try {
    window.localStorage.setItem(TRACKER_STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage unavailable (private browsing, quota) — tracking silently no-ops
  }
}

export function TrackerProvider({ children }: { children: ReactNode }) {
  const [tracked, setTracked] = useState<TrackerMap>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from browser state unavailable during SSR
    setTracked(loadFromStorage());
    setHydrated(true);
  }, []);

  function update(jobId: string, patch: Partial<TrackedApplication>) {
    setTracked((prev) => {
      const base: TrackedApplication = prev[jobId] ?? {
        jobId,
        status: "saved",
        notes: "",
        followUpDate: undefined,
        updatedAt: new Date().toISOString(),
      };
      const next: TrackedApplication = {
        ...base,
        ...patch,
        updatedAt: new Date().toISOString(),
      };
      const nextMap = { ...prev, [jobId]: next };
      saveToStorage(nextMap);
      return nextMap;
    });
  }

  function setStatus(jobId: string, status: ApplicationStatus) {
    update(jobId, { status });
  }

  function setNotes(jobId: string, notes: string) {
    update(jobId, { notes });
  }

  function setFollowUpDate(jobId: string, date: string | undefined) {
    update(jobId, { followUpDate: date });
  }

  function remove(jobId: string) {
    setTracked((prev) => {
      const next = { ...prev };
      delete next[jobId];
      saveToStorage(next);
      return next;
    });
  }

  return (
    <TrackerContext.Provider value={{ tracked, hydrated, setStatus, setNotes, setFollowUpDate, remove }}>
      {children}
    </TrackerContext.Provider>
  );
}

export function useTracker() {
  const ctx = useContext(TrackerContext);
  if (!ctx) throw new Error("useTracker must be used within TrackerProvider");
  return ctx;
}
