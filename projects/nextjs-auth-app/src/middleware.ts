// Import necessary modules from Next.js for handling requests and responses.
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Middleware function to control access based on user authentication status.
// This function can be marked as `async` if using `await` inside it.
export function middleware(request: NextRequest) {
    // Get the current path from the request URL.
    const path = request.nextUrl.pathname

    console.log(path);
    
    // Define public paths where users don't need to be authenticated.
    const isPathPublic = path === "/login" || path === "/signup" || path === "/verifyemail"

    // Retrieve the token from the cookies. If it doesn’t exist, assign an empty string.
    const token = request.cookies.get('token')?.value || ""

    // If the user is trying to access a public path but has a token (authenticated),
    // redirect them to the home page, as they are already logged in.
    if (isPathPublic && token) {
        return NextResponse.redirect(new URL('/profile', request.url))
    }

    // If the user is trying to access a restricted path without a token (not authenticated),
    // redirect them to the login page.
    if (!isPathPublic && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

// Configure which paths the middleware should apply to.
export const config = {
  matcher: [
    "/",           // Home page
    "/login",      // Login page
    "/signup",     // Signup page
    "/profile",    // User profile page
    "/logout",     // Logout page
    "/verifyemail" // Email verification page
  ],
}
