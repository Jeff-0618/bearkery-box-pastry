"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { FORMS_ENABLED, submitWeb3Form } from "@/lib/forms";
import { whatsappLink } from "@/lib/business";
import { useLang } from "@/lib/language";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const { t } = useLang();
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // No Web3Forms key configured: hand the message to WhatsApp rather than
    // showing a "sent" screen for something that went nowhere.
    if (!FORMS_ENABLED) {
      const text = [
        `Hi Bearkery Box Pastry! ${form.subject}`,
        "",
        form.message,
        "",
        `— ${form.name} (${form.email})`,
      ].join("\n");
      window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
      setStatus("success");
      return;
    }

    setStatus("submitting");
    const ok = await submitWeb3Form({
      subject: `Bearkery Box contact form: ${form.subject}`,
      from_name: form.name,
      name: form.name,
      email: form.email,
      message: form.message,
    });
    setStatus(ok ? "success" : "error");
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="paper flex flex-col items-center justify-center gap-3 p-10 text-center"
        role="status"
      >
        <CheckCircle2 size={32} className="text-teddy" aria-hidden="true" />
        <h2 className="font-display text-lg font-medium">{t("contact.sent")}</h2>
        <p className="text-sm text-taupe">
          {t("contact.thanks", { name: form.name.split(" ")[0] || t("oc.friend") })}
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="paper flex flex-col gap-4 p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="label-bx">{t("form.name")}</label>
          <input
            id="contact-name" required autoComplete="name" className="input-bx"
            value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="label-bx">{t("form.email")}</label>
          <input
            id="contact-email" type="email" required autoComplete="email" className="input-bx"
            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
      </div>
      <div>
        <label htmlFor="contact-subject" className="label-bx">{t("form.subject")}</label>
        <input
          id="contact-subject" required className="input-bx"
          value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="label-bx">{t("form.message")}</label>
        <textarea
          id="contact-message" required rows={5} className="input-bx resize-none"
          value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </div>

      {status === "error" && (
        <p className="flex items-center gap-2 text-sm text-red-600" role="alert">
          <AlertCircle size={15} aria-hidden="true" />
          {t("contact.error")}
        </p>
      )}

      <button type="submit" disabled={status === "submitting"} className="btn-primary mt-2 self-start">
        {status === "submitting"
          ? t("contact.sending")
          : FORMS_ENABLED
            ? t("contact.send")
            : t("contact.sendWhatsapp")}
      </button>
    </form>
  );
}
