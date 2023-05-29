import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const tokenCookie = await request.cookies.get("token");

  if (tokenCookie) {
    NextResponse.next();
  } else {
    const requestedPage = request.nextUrl.pathname;
    const url = request.nextUrl.clone();
    url.pathname = `/home`;
    url.search = `p=${requestedPage}`;
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/home/EmployeeMain", "/home/AdminMain", "/home/BossMain"],
};