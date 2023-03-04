

// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const previousPage = req.nextUrl.pathname;

  const session = await getToken({req,secret:process.env.NEXTAUTH_SECRET})

  if (!session) {
    return NextResponse.redirect(new URL(`/auth/login?p=${previousPage}`, req.url))
  }
  
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/checkout/:path*',
}

// import { NextRequest, NextResponse } from "next/server";
// import * as jose from "jose";

// export async function middleware(req: NextRequest) {
//   const previousPage = req.nextUrl.pathname;

//   if (req.nextUrl.pathname.startsWith("/checkout")) {
//     const token = req.cookies.get("token")?.value || '';

//     try {
//       await jose.jwtVerify(
//         token || "",
//         new TextEncoder().encode(process.env.JWT_SECRET_SEED || "")
//       );
//     //If no error is thrown, the JWT is valid, you can even the payload if necessary
//       return NextResponse.next();
//     } catch (error) {
//       console.error(`JWT Invalid or not signed in`, { error });
//       const { protocol, host, pathname } = req.nextUrl;
//       // here the instructor uses p instead of previousPath
//       return NextResponse.redirect(
//         new URL(`/auth/login?p=${previousPage}`, req.url)
//       );
//     }
//   }
// }
// // Only the paths declared in here will run the middleware
// export const config = {
//   matcher: ["/checkout/:path*"],
// };
