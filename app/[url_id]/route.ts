import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.url);

  const shortened_url_id = requestUrl.pathname.slice(1);

  const allUrls = await kv.keys("*");

  for (const url of allUrls) {
    const id = await kv.get(url);
    if (id === shortened_url_id) return NextResponse.redirect(url);
  }

  requestUrl.pathname = "";
  return NextResponse.redirect(requestUrl.toString());
}
