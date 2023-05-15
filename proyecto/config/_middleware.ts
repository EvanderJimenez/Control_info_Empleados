import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const isLogin = request.cookies.get('logged');

  console.log(isLogin?.value);

  if (!isLogin) {
    console.log("No ha iniciado sesión");
    if (url.pathname.startsWith('/home/EmployeeMain')) {
      console.log("Redirigiendo a /home para empleados");
      return NextResponse.rewrite(new URL("/home", request.url));
    } else if (url.pathname.startsWith('/home/AdminMain')) {
      console.log("Redirigiendo a /home para administradores");
      return NextResponse.rewrite(new URL("/home", request.url));
    }
  } else {
    const { type } = JSON.parse(isLogin.value);
    console.log(`Usuario tipo ${type} ha iniciado sesión`);
    if (type === 'employee' && url.pathname !== '/home/EmployeeMain') {
      console.log("Redirigiendo a /home/EmployeeMain");
      url.pathname = "/home/EmployeeMain";
      return NextResponse.redirect(url);
    } /* else if (type === 'admin' && url.pathname !== '/home/AdminMain') {
      console.log("Redirigiendo a /home/AdminMain");
      url.pathname = "/home/AdminMain";
      return NextResponse.redirect(url);
    } else if (type === 'boss' && url.pathname !== '/home/AdminMain') {
      console.log("Redirigiendo a /home/AdminMain");
      url.pathname = "/home/AdminMain";
      return NextResponse.redirect(url);
    } */
  }
  
  return NextResponse.next();
}
