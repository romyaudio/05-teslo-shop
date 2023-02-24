
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export async function middleware(req: NextRequest) {
  const previousPage = req.nextUrl.pathname;

  if (req.nextUrl.pathname.startsWith("/checkout")) {
    const token = req.cookies.get("token")?.value || '';

    try {
      await jose.jwtVerify(
        token || "",
        new TextEncoder().encode(process.env.JWT_SECRET_SEED || "")
      );
    //If no error is thrown, the JWT is valid, you can even the payload if necessary
      return NextResponse.next();
    } catch (error) {
      console.error(`JWT Invalid or not signed in`, { error });
      const { protocol, host, pathname } = req.nextUrl;
      // here the instructor uses p instead of previousPath
      return NextResponse.redirect(
        new URL(`/auth/login?p=${previousPage}`, req.url)
      );
    }
  }
}
// Only the paths declared in here will run the middleware
export const config = {
  matcher: ["/checkout/:path*"],
};
