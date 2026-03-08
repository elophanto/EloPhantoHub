import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  if (request.headers.get("host") === "docs.elophanto.com") {
    return NextResponse.redirect(
      "https://github.com/elophanto/EloPhanto/tree/main/docs",
      301
    )
  }
}
