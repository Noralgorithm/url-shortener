import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma/client";

export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.url);

  const shortened_url_id = requestUrl.pathname.slice(1);

  const urlInDb = await prisma.urls.findFirst({
    where: {
      shortened_url_id,
    },
    select: {
      url: true,
      shortened_url_id: true,
    },
  });

  requestUrl.pathname = "";
  if (!urlInDb) return NextResponse.redirect(requestUrl.toString());

  return NextResponse.redirect(urlInDb.url);
}
