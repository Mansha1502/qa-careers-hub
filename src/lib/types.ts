export type Region = "India" | "UAE" | "Egypt" | "Remote";

export type Seniority = "Engineer" | "Senior" | "Lead" | "Manager" | "Director";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  region: Region;
  remote: boolean;
  seniority: Seniority;
  employmentType: string;
  salary?: string;
  postedDate: string; // YYYY-MM-DD
  summary: string;
  highlights: string[];
  skills: string[];
  applyUrl: string;
  hrEmail?: string;
  source: string;
  live?: boolean;
}
