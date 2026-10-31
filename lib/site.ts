/**
 * The public address of the site, used for the sitemap, canonical links and
 * social-share previews.
 *
 * Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL, set by hand once the real domain exists.
 *   2. VERCEL_PROJECT_PRODUCTION_URL, which Vercel fills in with the project's
 *      own production address (e.g. my-site.vercel.app) when system
 *      environment variables are exposed to the build.
 *   3. A placeholder — and while that is in use, anything that would publish
 *      an address (canonical link, structured-data urls) is left out rather
 *      than pointing search engines at a domain that isn't ours.
 */
const PLACEHOLDER = "https://bearkerybox.example";

function clean(url: string) {
  const trimmed = url.trim().replace(/\/+$/, "");
  // A value typed without its scheme ("example.com") would make `new URL()`
  // throw and fail the whole build, so assume https.
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

const configured =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() ||
  "";

export const SITE_URL = clean(configured || PLACEHOLDER);

/** True until a real address is known — don't publish SITE_URL anywhere while this holds. */
export const SITE_URL_IS_PLACEHOLDER = configured === "";

/** An absolute URL on this site, or undefined while the address is still a placeholder. */
export function absoluteUrl(path: string): string | undefined {
  return SITE_URL_IS_PLACEHOLDER ? undefined : `${SITE_URL}${path}`;
}
