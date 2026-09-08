"use client";

export default function NewsletterForm() {
  return (
    <form
      className="flex gap-2"
      onSubmit={(e) => e.preventDefault()}
      aria-label="Newsletter subscription"
    >
      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="you@email.com"
        className="input-bx"
      />
      <button type="submit" className="btn-primary shrink-0 px-4">Join</button>
    </form>
  );
}
