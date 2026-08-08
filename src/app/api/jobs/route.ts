import { NextResponse } from "next/server";
import { jobs } from "@/lib/jobs";

export async function GET() {
  return NextResponse.json({ jobs, updatedAt: "2026-08-08" });
}
