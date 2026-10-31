import { NextRequest, NextResponse } from "next/server";

/**
 * Password gate for /admin.
 *
 * The admin page reads customer names and phone numbers, so it must not be
 * reachable by simply typing the URL. This asks the browser for a username
 * and password (HTTP Basic auth); the username is ignored, the password must
 * match the ADMIN_PASSWORD environment variable.
 *
 * Fails closed: in production with no ADMIN_PASSWORD set, /admin returns 404
 * rather than being left open. Local `next dev` is left open for convenience.
 *
 * Runs on the server only — ADMIN_PASSWORD is never sent to the browser.
 * Needs a host that runs Next.js middleware (Vercel, Node hosting). It does
 * nothing on a pure static export.
 */
export const config = {
  matcher: ["/admin", "/admin/:path*"],
};

/** Compares without bailing out at the first differing character. */
function safeEqual(a: string, b: string): boolean {
  const length = Math.max(a.length, b.length);
  let diff = a.length ^ b.length;
  for (let i = 0; i < length; i++) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return diff === 0;
}

function challenge() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Bearkery admin", charset="UTF-8"',
      "Cache-Control": "no-store",
    },
  });
}

export function middleware(req: NextRequest) {
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    if (process.env.NODE_ENV === "production") {
      return new NextResponse("Not found", { status: 404 });
    }
    return NextResponse.next();
  }

  const header = req.headers.get("authorization");
  if (!header?.startsWith("Basic ")) return challenge();

  let decoded = "";
  try {
    // atob yields a binary string; re-decode it so non-ASCII passwords work.
    const bytes = Uint8Array.from(atob(header.slice(6)), (c) => c.charCodeAt(0));
    decoded = new TextDecoder().decode(bytes);
  } catch {
    return challenge();
  }

  // "username:password" — the password is everything after the first colon.
  const password = decoded.slice(decoded.indexOf(":") + 1);
  if (!safeEqual(password, expected)) return challenge();

  const res = NextResponse.next();
  res.headers.set("Cache-Control", "no-store");
  return res;
}
