import { NextResponse } from "next/server";
import { RO } from "@/lib/ro";

const ro = RO();

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: segments } = await params;
  const slug = segments.join("/");

  try {
    const page = await ro.page(slug);
    return NextResponse.json(page, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 404 });
  }
}
