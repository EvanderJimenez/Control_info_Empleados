import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const tokenCookie = await request.cookies.get("token");

  if (!tokenCookie) {
    const requestedPage = request.nextUrl.pathname;
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.search = `p=${requestedPage}`;
    return NextResponse.redirect(url);
  }

  try {
    const { payload } = await jwtVerify(tokenCookie.value, new TextEncoder().encode(process.env.REACT_APP_JWT_PASSWORD));
    return NextResponse.next();

  } catch (error) {
    const requestedPage = request.nextUrl.pathname;
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.search = `p=${requestedPage}`;
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/home/BossMain/:path*", "/home/AdminMain/:path*", "/home/EmployeeMain/:path*"],
};
