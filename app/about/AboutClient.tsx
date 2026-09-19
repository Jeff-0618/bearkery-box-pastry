"use client";

import Link from "next/link";
import LazyImage from "@/components/shared/LazyImage";
import Bear from "@/components/shared/Bear";
import { useLang } from "@/lib/language";

/**
 * Our Story, in both languages.
 *
 * The eyebrows are written as plain <p className="t-eyebrow"> rather than
 * through SectionHeading. The old page passed them as `t-eyebrow="…"`, which
 * is a CSS class name used as a prop — React hands unknown hyphenated
 * attributes straight through and SectionHeading never reads one, so those
 * two eyebrows have never actually rendered. Writing the element directly
 * fixes that and drops a dependency at the same time.
 */
export default function AboutClient() {
  const { t } = useLang();

  const values = [
    { title: t("about.value1Title"), body: t("about.value1Body") },
    { title: t("about.value2Title"), body: t("about.value2Body") },
    { title: t("about.value3Title"), body: t("about.value3Body") },
  ];

  return (
    <div>
      {/* The Story Behind Bearkery */}
      <section className="bg-warm-glow py-16">
        <div className="container-bx grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="t-eyebrow mb-4">{t("about.storyEyebrow")}</p>
            <h1 className="text-4xl font-medium sm:text-5xl">
              {t("about.storyTitle1")}{" "}
              <span className="italic text-teddy">{t("about.storyTitle2")}</span>
            </h1>
            <p className="mt-5 max-w-md leading-relaxed text-taupe">
              {t("about.storyBody")}
            </p>
          </div>
          <LazyImage
            src="https://images.unsplash.com/photo-1557776959-f066eb37857f?q=80&w=1000&auto=format&fit=crop"
            alt={t("about.storyAlt")}
            sizes="(max-width: 767px) 100vw, 50vw"
            className="aspect-[4/3] w-full rounded-soft shadow-paper"
            priority
          />
        </div>
      </section>

      {/* Meet Our Teddy */}
      <section className="container-bx section">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <p className="t-eyebrow mb-4">{t("about.teddyEyebrow")}</p>
            <h2 className="text-3xl font-medium sm:text-4xl">
              {t("about.teddyTitle")}
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-taupe">
              {t("about.teddyBody")}
            </p>
          </div>
          <div className="order-1 mx-auto w-52 sm:w-60 md:order-2">
            <Bear priority />
          </div>
        </div>
      </section>

      {/* Our Kitchen */}
      <section className="bg-cream py-20">
        <div className="container-bx grid items-center gap-10 md:grid-cols-2">
          <LazyImage
            src="https://images.unsplash.com/photo-1761798355863-9b77d9002648?q=80&w=1000&auto=format&fit=crop"
            alt={t("about.kitchenAlt")}
            sizes="(max-width: 767px) 100vw, 50vw"
            className="aspect-[4/3] w-full rounded-soft shadow-paper"
          />
          <div>
            <p className="t-eyebrow mb-4">{t("about.kitchenEyebrow")}</p>
            <h2 className="text-3xl font-medium sm:text-4xl">
              {t("about.kitchenTitle")}
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-taupe">
              {t("about.kitchenBody")}
            </p>
          </div>
        </div>
      </section>

      {/* Made With Love */}
      <section className="container-bx section">
        <div className="mx-auto mb-10 max-w-xl text-center">
          <p className="t-eyebrow">{t("about.valuesEyebrow")}</p>
          <h2 className="t-heading mt-4">{t("about.valuesTitle")}</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="paper p-6 text-center">
              <h3 className="font-display text-lg font-medium">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-taupe">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Promise */}
      <section className="container-bx pb-24">
        <div className="paper flex flex-col items-center gap-4 px-8 py-14 text-center">
          <p className="t-eyebrow">{t("about.promiseEyebrow")}</p>
          <h2 className="max-w-xl text-3xl font-medium sm:text-4xl">
            {t("about.promiseTitle")}
          </h2>
          <p className="max-w-lg text-taupe">{t("about.promiseBody")}</p>
          <Link href="/collections" className="btn-primary mt-2">
            {t("about.promiseCta")}
          </Link>
        </div>
      </section>
    </div>
  );
}
