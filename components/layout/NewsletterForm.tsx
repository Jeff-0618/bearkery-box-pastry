"use client";

import { useState } from "react";
import { submitWeb3Form } from "@/lib/forms";
import { useLang } from "@/lib/language";

type Status = "idle" | "submitting" | "done" | "error";

/** Only rendered when a Web3Forms key is configured — see Footer. */
export default function NewsletterForm() {
  const { t } = useLang();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    const ok = await submitWeb3Form({
      subject: "Bearkery Box newsletter signup",
      from_name: "Newsletter signup",
      email,
      message: `Please add ${email} to the newsletter list.`,
    });
    setStatus(ok ? "done" : "error");
    if (ok) setEmail("");
  };

  if (status === "done") {
    return (
      <p className="text-sm text-cocoa" role="status">
        {t("newsletter.thanks")}
      </p>
    );
  }

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={handleSubmit}
      aria-label={t("newsletter.aria")}
    >
      <div className="flex gap-2">
        <label htmlFor="newsletter-email" className="sr-only">{t("newsletter.label")}</label>
        <input
          id="newsletter-email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@email.com"
          className="input-bx"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary shrink-0 px-4"
        >
          {t("newsletter.join")}
        </button>
      </div>
      {status === "error" && (
        <p className="text-xs text-red-600" role="alert">{t("newsletter.error")}</p>
      )}
    </form>
  );
}
