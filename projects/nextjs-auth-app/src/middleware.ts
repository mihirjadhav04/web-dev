import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 // you can run this middleware funtion anywhere between while running a route mentioned in matcher.
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname //to get the current path

    const isPathPublic = path === "/login" || path === "/signup"  || path === "/verifyemail"

    const token = request.cookies.get('token')?.value || ""

    if(isPathPublic && token) {
        return NextResponse.redirect(new URL('/', request.url))
    }
    if(!isPathPublic && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }



}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/profile",
    "/logout",
    "/verifyemail"

  ],
}