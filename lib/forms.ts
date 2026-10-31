/**
 * Contact-form and newsletter delivery via Web3Forms (free; emails the owner).
 *
 * Get a key at https://web3forms.com (just enter your email) and set
 * NEXT_PUBLIC_WEB3FORMS_KEY. The key is meant to be public — Web3Forms uses
 * it as an alias for your inbox, not as a secret credential.
 *
 * With no key the site does NOT pretend to send anything: the contact form
 * hands the message to WhatsApp instead, and the newsletter box is hidden.
 */
export const WEB3FORMS_KEY = (process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "").trim();

export const FORMS_ENABLED = WEB3FORMS_KEY !== "";

/** Resolves true only if Web3Forms confirms it accepted the submission. */
export async function submitWeb3Form(fields: Record<string, string>): Promise<boolean> {
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ access_key: WEB3FORMS_KEY, ...fields }),
    });
    const result = await response.json();
    return Boolean(result.success);
  } catch {
    return false;
  }
}
