import { NextResponse } from "next/server";
import { jobs } from "@/lib/jobs";
import { SITE_UPDATED_AT } from "@/lib/utils";

export async function GET() {
  return NextResponse.json({ jobs, updatedAt: SITE_UPDATED_AT });
}
