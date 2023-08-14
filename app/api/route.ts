import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma/client";
import { generateRandomString } from "@/utils/generate-random-string";

export async function GET(_req: NextRequest) {
  return NextResponse.json({ Connection: true });
}

export async function POST(req: NextRequest) {
  try {
    const { url } = (await req.json()) as { url: string };

    new URL(url);

    const urlInDb = await prisma.urls.findFirst({
      where: { url: url },
      select: { url: true, shortened_url_id: true },
    });

    if (urlInDb) return NextResponse.json(urlInDb);

    const shortened_url_id = generateRandomString(8);

    const newUrl = await prisma.urls.create({
      data: { url, shortened_url_id },
      select: { url: true, shortened_url_id: true },
    });
    return NextResponse.json(newUrl, { status: 201 });
  } catch (error) {
    return NextResponse.json("Error shortening URL!", { status: 400 });
  }
}

export async function DELETE(_req: NextRequest) {
  await prisma.urls.deleteMany();

  return NextResponse.json("Hello world from DELETE request!");
}
