/**
 * The public address of the site, used for the sitemap, canonical links and
 * social-share previews. Set NEXT_PUBLIC_SITE_URL in .env.local / the host's
 * environment settings once the real domain exists.
 */
const PLACEHOLDER = "https://bearkerybox.example";

function clean(url: string) {
  const trimmed = url.trim().replace(/\/+$/, "");
  // A value typed without its scheme ("example.com") would make `new URL()`
  // throw and fail the whole build, so assume https.
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export const SITE_URL = clean(process.env.NEXT_PUBLIC_SITE_URL || PLACEHOLDER);

/** True until a real domain is configured — search engines shouldn't index the placeholder. */
export const SITE_URL_IS_PLACEHOLDER = SITE_URL === PLACEHOLDER;
