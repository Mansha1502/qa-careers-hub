import { Job } from "@/lib/types";

export default function StatsBar({ jobs }: { jobs: Job[] }) {
  const companies = new Set(jobs.map((j) => j.company)).size;
  const india = jobs.filter((j) => j.region === "India").length;
  const uae = jobs.filter((j) => j.region === "UAE").length;
  const egypt = jobs.filter((j) => j.region === "Egypt").length;
  const remote = jobs.filter((j) => j.region === "Remote").length;

  const stats = [
    { label: "Open roles", value: jobs.length, emphasis: true },
    { label: "Companies", value: companies },
    { label: "India", value: india, dot: "bg-amber-500" },
    { label: "UAE", value: uae, dot: "bg-emerald-500" },
    { label: "Egypt", value: egypt, dot: "bg-violet-500" },
    { label: "Remote", value: remote, dot: "bg-sky-500" },
  ];

  return (
    <div className="card-shadow grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] sm:grid-cols-6">
      {stats.map((s) => (
        <div key={s.label} className="bg-[var(--surface)] px-4 py-5 text-center sm:px-3">
          <div
            className={`font-display text-[1.9rem] font-medium tracking-tight sm:text-3xl ${
              s.emphasis ? "text-[var(--accent)]" : "text-[var(--foreground)]"
            }`}
          >
            {s.value}
          </div>
          <div className="mt-1 flex items-center justify-center gap-1.5 text-[11.5px] font-medium text-[var(--muted)]">
            {s.dot && <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />}
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
