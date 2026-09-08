"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle } from "lucide-react";

// Get a free access key at https://web3forms.com (just enter your email,
// no account needed) and paste it here. It's meant to be public/client-side
// — Web3Forms uses it as an alias to your inbox, not a secret credential.
const WEB3FORMS_ACCESS_KEY = "PASTE_YOUR_ACCESS_KEY_HERE";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Bearkery Box contact form: ${form.subject}`,
          from_name: form.name,
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const result = await response.json();
      setStatus(result.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="paper flex flex-col items-center justify-center gap-3 p-10 text-center"
      >
        <CheckCircle2 size={32} className="text-teddy" />
        <h2 className="font-display text-lg font-medium">Message sent</h2>
        <p className="text-sm text-taupe">
          Thank you, {form.name.split(" ")[0] || "friend"} — we'll get back to you within
          one business day.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="paper flex flex-col gap-4 p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="label-bx">Name</label>
          <input
            id="contact-name" required className="input-bx"
            value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="label-bx">Email</label>
          <input
            id="contact-email" type="email" required className="input-bx"
            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
      </div>
      <div>
        <label htmlFor="contact-subject" className="label-bx">Subject</label>
        <input
          id="contact-subject" required className="input-bx"
          value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="label-bx">Message</label>
        <textarea
          id="contact-message" required rows={5} className="input-bx resize-none"
          value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </div>

      {status === "error" && (
        <p className="flex items-center gap-2 text-sm text-red-600" role="alert">
          <AlertCircle size={15} />
          Something went wrong sending that — please try again, or call us directly.
        </p>
      )}

      <button type="submit" disabled={status === "submitting"} className="btn-primary mt-2 self-start">
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
