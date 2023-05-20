import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { selectLogin } from './root/redux/selectors/employee-selector/employee.selector';
import { useSelector } from 'react-redux';

export function middleware(request: NextRequest) {

   const url = request.nextUrl.clone();
  const isLogin = request.cookies.get('logged');

  if (!isLogin) {
    if (url.pathname.startsWith('/home/EmployeeMain') || (url.pathname.startsWith('/home/BossMain') || (url.pathname.startsWith('/home/AdminMain'))) ) {
      return NextResponse.rewrite(new URL("/home", request.url));
    }
  }  else {
    const { type } = JSON.parse(isLogin.value);
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