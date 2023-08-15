import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

import { generateRandomString } from "@/utils/generate-random-string";

export async function GET(_req: NextRequest) {
  return NextResponse.json({ hello: "world" });
}

export async function POST(req: NextRequest) {
  try {
    const { url } = (await req.json()) as { url: string };

    new URL(url);

    const urlInDb = await kv.get(url);

    if (urlInDb) return NextResponse.json({ shortened_url_id: urlInDb });

    const shortened_url_id = generateRandomString(8);

    await kv.set(url, shortened_url_id);

    return NextResponse.json({ shortened_url_id }, { status: 201 });
  } catch (error) {
    return NextResponse.json("Error shortening URL!", { status: 400 });
  }
}
