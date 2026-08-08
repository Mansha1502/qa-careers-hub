import { Job } from "@/lib/types";

export default function StatsBar({ jobs }: { jobs: Job[] }) {
  const companies = new Set(jobs.map((j) => j.company)).size;
  const india = jobs.filter((j) => j.region === "India").length;
  const uae = jobs.filter((j) => j.region === "UAE").length;
  const remote = jobs.filter((j) => j.region === "Remote").length;

  const stats = [
    { label: "Open roles", value: jobs.length },
    { label: "Companies", value: companies },
    { label: "India", value: india },
    { label: "UAE", value: uae },
    { label: "Remote", value: remote },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3.5 text-center"
        >
          <div className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
            {s.value}
          </div>
          <div className="mt-0.5 text-xs font-medium text-[var(--muted)]">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
