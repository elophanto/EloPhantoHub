import { NextRequest, NextResponse } from "next/server"

export function proxy(request: NextRequest) {
  if (request.headers.get("host") === "docs.elophanto.com") {
    return NextResponse.redirect("https://elophanto.com/docs", 301)
  }
}
