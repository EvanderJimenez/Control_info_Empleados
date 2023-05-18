import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const isLogin = request.cookies.get('logged');

  if (!isLogin) {
    if (url.pathname.startsWith('/home/EmployeeMain') || (url.pathname.startsWith('/home/AdminMain') || (url.pathname.startsWith('/home/AdminMain'))) ) {
      return NextResponse.rewrite(new URL("/home", request.url));
    }
  }  else {//TODO: You should not use else or simplify the complex with reverse if
    const { type } = JSON.parse(isLogin.value);//TODO: You can make a better form to express your ideas in the code
    if (type === 'employee' && url.pathname !== '/home/EmployeeMain') {
      url.pathname = "/home/EmployeeMain";
      return NextResponse.redirect(url);
    }  else if (type === 'admin' && url.pathname !== '/home/AdminMain') {
      url.pathname = "/home/AdminMain";
      return NextResponse.redirect(url);
    } else if (type === 'boss' && url.pathname !== '/home/BossMain') {
      url.pathname = "/home/BossMain";
      return NextResponse.redirect(url);
    } 
  } 

  return NextResponse.next();
}

export const config = {
  matcher: ['/home','/home/EmployeeMain','/home/AdminMain','/home/BossMain',]
}