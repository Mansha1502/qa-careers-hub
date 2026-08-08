import { NextRequest, NextResponse } from "next/server";
import { fetchLiveJobs } from "@/lib/adzuna";

export async function GET(req: NextRequest) {
  const kind = req.nextUrl.searchParams.get("region");
  if (kind !== "india" && kind !== "remote") {
    return NextResponse.json(
      { configured: true, jobs: [], error: "Invalid region. Use 'india' or 'remote'." },
      { status: 400 }
    );
  }

  try {
    const jobs = await fetchLiveJobs(kind);
    return NextResponse.json({ configured: true, jobs });
  } catch (err) {
    if (err instanceof Error && err.message === "ADZUNA_NOT_CONFIGURED") {
      return NextResponse.json({ configured: false, jobs: [] });
    }
    return NextResponse.json(
      { configured: true, jobs: [], error: "Live source unavailable right now." },
      { status: 502 }
    );
  }
}
