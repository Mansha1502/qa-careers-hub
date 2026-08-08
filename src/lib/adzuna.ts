import { Job, Region, Seniority } from "./types";

const SKILL_KEYWORDS = [
  "Selenium", "Playwright", "Cypress", "Appium", "TestNG", "JUnit", "Postman",
  "REST Assured", "JMeter", "LoadRunner", "SoapUI", "Java", "Python", "TypeScript",
  "JavaScript", "SQL", "Jira", "Jenkins", "CI/CD", "Git", "Agile", "Scrum",
  "API Testing", "Automation Testing", "Manual Testing", "ISTQB", "AWS", "Azure",
  "Docker", "Kubernetes", "Cucumber", "BDD", "Robot Framework", "k6", "Salesforce",
];

const CURRENCY_BY_COUNTRY: Record<string, string> = {
  in: "₹",
  gb: "£",
  us: "$",
};

function stripHtml(input: string | undefined): string {
  if (!input) return "";
  return input.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function deriveSeniority(title: string): Seniority {
  const t = title.toLowerCase();
  if (/(director|head of|vp\b|vice president)/.test(t)) return "Director";
  if (/(manager|avp\b)/.test(t)) return "Manager";
  if (/\blead\b/.test(t)) return "Lead";
  if (/\bsenior\b|\bsr\.?\b|\bstaff\b|\bprincipal\b/.test(t)) return "Senior";
  return "Engineer";
}

function deriveSkills(text: string): string[] {
  const found = SKILL_KEYWORDS.filter((skill) =>
    text.toLowerCase().includes(skill.toLowerCase())
  );
  return Array.from(new Set(found)).slice(0, 6);
}

function deriveEmploymentType(contractTime?: string, contractType?: string): string {
  const parts: string[] = [];
  if (contractType === "contract") parts.push("Contract");
  else if (contractType === "permanent") parts.push("Permanent");
  if (contractTime === "part_time") parts.push("Part-time");
  else if (contractTime === "full_time" && parts.length === 0) parts.push("Full-time");
  return parts.length > 0 ? parts.join(", ") : "Full-time";
}

interface AdzunaRawJob {
  id: string;
  title: string;
  company?: { display_name?: string };
  location?: { display_name?: string };
  description?: string;
  salary_min?: number;
  salary_max?: number;
  salary_is_predicted?: string;
  contract_type?: string;
  contract_time?: string;
  created?: string;
  redirect_url: string;
}

function mapAdzunaJob(raw: AdzunaRawJob, region: Region, countryCode: string): Job {
  const title = stripHtml(raw.title) || "Untitled role";
  const description = stripHtml(raw.description);
  const company = stripHtml(raw.company?.display_name) || "Unknown company";
  const location = stripHtml(raw.location?.display_name) || (region === "Remote" ? "Remote" : "India");
  const currency = CURRENCY_BY_COUNTRY[countryCode] ?? "";

  let salary: string | undefined;
  if (raw.salary_min && raw.salary_max) {
    const min = Math.round(raw.salary_min).toLocaleString("en-US");
    const max = Math.round(raw.salary_max).toLocaleString("en-US");
    salary = `${currency}${min} – ${currency}${max}${
      raw.salary_is_predicted === "1" ? " (estimated)" : ""
    }`;
  }

  return {
    id: `adzuna-${raw.id}`,
    title,
    company,
    location,
    region,
    remote: region === "Remote" || /remote/i.test(location) || /remote/i.test(title),
    seniority: deriveSeniority(title),
    employmentType: deriveEmploymentType(raw.contract_time, raw.contract_type),
    salary,
    postedDate: raw.created ? raw.created.slice(0, 10) : new Date().toISOString().slice(0, 10),
    summary: description.length > 220 ? `${description.slice(0, 217)}...` : description || "See the original listing for full details.",
    highlights: [
      description.length > 0
        ? description.slice(0, 480) + (description.length > 480 ? "..." : "")
        : "Full role details are available on the original posting.",
    ],
    skills: deriveSkills(`${title} ${description}`),
    applyUrl: raw.redirect_url,
    source: "Adzuna (live)",
    live: true,
  };
}

const QUERIES: Record<"india" | "remote", { countryCode: string; where?: string; what: string }[]> = {
  india: [
    { countryCode: "in", what: "quality assurance engineer" },
    { countryCode: "in", what: "software tester automation SDET" },
  ],
  remote: [
    { countryCode: "gb", where: "remote", what: "quality assurance engineer" },
    { countryCode: "us", where: "remote", what: "quality assurance engineer software tester" },
  ],
};

export async function fetchLiveJobs(kind: "india" | "remote"): Promise<Job[]> {
  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;
  if (!appId || !appKey) {
    throw new Error("ADZUNA_NOT_CONFIGURED");
  }

  const region: Region = kind === "india" ? "India" : "Remote";
  const queries = QUERIES[kind];

  const results = await Promise.all(
    queries.map(async (q) => {
      const params = new URLSearchParams({
        app_id: appId,
        app_key: appKey,
        what: q.what,
        results_per_page: "20",
        "content-type": "application/json",
        category: "it-jobs",
        sort_by: "date",
      });
      if (q.where) params.set("where", q.where);

      const res = await fetch(
        `https://api.adzuna.com/v1/api/jobs/${q.countryCode}/search/1?${params.toString()}`,
        { cache: "no-store" }
      );
      if (!res.ok) return [];
      const data = await res.json();
      const rawJobs: AdzunaRawJob[] = data.results ?? [];
      return rawJobs.map((raw) => mapAdzunaJob(raw, region, q.countryCode));
    })
  );

  const flat = results.flat();
  const seen = new Set<string>();
  return flat.filter((job) => {
    const key = `${job.company.toLowerCase()}::${job.title.toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
