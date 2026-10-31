"use client";

import Link from "next/link";
import Stamp from "@/components/shared/Stamp";
import { useLang } from "@/lib/language";

export default function NotFound() {
  const { t } = useLang();

  return (
    <div className="container-bx page-center flex flex-col items-center gap-4">
      <Stamp className="w-24 text-lg" />
      <h1 className="text-3xl font-medium">{t("nf.title")}</h1>
      <p className="max-w-sm text-taupe">{t("nf.body")}</p>
      <Link href="/" className="btn-primary mt-2">{t("common.backHome")}</Link>
    </div>
  );
}
