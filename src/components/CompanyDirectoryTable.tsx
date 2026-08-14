import { DirectoryCompany } from "@/lib/companyDirectory";

export default function CompanyDirectoryTable({ rows }: { rows: DirectoryCompany[] }) {
  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border)] py-16 text-center">
        <p className="text-sm font-medium text-[var(--foreground)]">No companies match that search</p>
        <p className="mt-1 text-sm text-[var(--muted)]">Try a different term or clear the search.</p>
      </div>
    );
  }

  return (
    <div className="card-shadow overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
      <table className="w-full min-w-[720px] border-collapse text-left text-[13.5px]">
        <thead>
          <tr className="border-b border-[var(--border)] text-[11px] font-semibold uppercase tracking-wider text-[var(--muted-soft)]">
            <th className="px-4 py-3">Company</th>
            <th className="px-4 py-3">HQ Country</th>
            <th className="px-4 py-3">Remote Policy</th>
            <th className="px-4 py-3">Careers Page</th>
            <th className="px-4 py-3">Notes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface-hover)]">
              <td className="px-4 py-3 font-medium text-[var(--foreground)]">{row.company}</td>
              <td className="px-4 py-3 text-[var(--muted)]">{row.hqCountry}</td>
              <td className="px-4 py-3 text-[var(--muted)]">{row.remotePolicy}</td>
              <td className="px-4 py-3">
                {row.careersPage.startsWith("http") ? (
                  <a
                    href={row.careersPage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[var(--accent)] hover:underline"
                  >
                    Careers page
                  </a>
                ) : (
                  <span className="text-[var(--muted-soft)]">{row.careersPage}</span>
                )}
              </td>
              <td className="max-w-[320px] px-4 py-3 text-[var(--muted)]">{row.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
