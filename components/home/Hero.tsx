"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import Bear from "@/components/shared/Bear";
import Lanterns from "@/components/shared/Lanterns";
import { useTimeOfDay } from "@/lib/use-time-of-day";
import { cx } from "@/lib/utils";
import { useLang } from "@/lib/language";

const EASE = [0.22, 0.61, 0.36, 1] as const;

/**
 * The door of the shop. Light, greeting and the highlighted product all
 * follow the real time of day, so the site feels like somewhere that is
 * currently open rather than a static page.
 */
export default function Hero() {
  const time = useTimeOfDay();
  const { t } = useLang();

  return (
    <section className="relative overflow-hidden bg-milk">
      {/* Ambient light shifts with the hour */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${time.light} animate-driftLight transition-all duration-[2000ms]`}
      />

      <Lanterns />

      <div className="container-bx relative z-10 grid items-center gap-10 pb-16 pt-12 sm:pt-16 md:grid-cols-[1.05fr_0.95fr] md:pb-24">
        <div>
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <span className={cx("t-eyebrow transition-opacity duration-500", time.ready ? "opacity-100" : "opacity-0")}>{t(`hero.greeting${time.part.charAt(0).toUpperCase()}${time.part.slice(1)}`)}</span>
            <span className="h-1 w-1 rounded-full bg-caramel/40" />
            <span className="t-eyebrow font-normal normal-case tracking-normal text-taupe">
              {t("hero.location")}
            </span>
          </motion.div>

          <motion.h1
            className="t-display mt-4 max-w-[14ch]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          >
            {t("hero.title1")}
            <br />
            {t("hero.title2")}
          </motion.h1>

          <motion.p
            className="t-body mt-5 max-w-sm"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          >
            {t(`hero.line${time.part.charAt(0).toUpperCase()}${time.part.slice(1)}`)}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
          >
            {time.sandwichWindowOpen ? (
              <Link href="/collections/everyday-favourites" className="btn-primary">
                {t("hero.ctaSandwiches")}
              </Link>
            ) : (
              <Link href="/product/pudding-burnt-cake" className="btn-primary">
                {t("hero.ctaCake")}
              </Link>
            )}
            <Link href="/about" className="btn-ghost">
              {t("hero.ctaStory")}
            </Link>
          </motion.div>

          {time.sandwichWindowOpen && (
            <motion.p
              className="mt-5 inline-flex items-center gap-2 rounded-pill bg-peach px-4 py-2 text-xs font-semibold text-cocoa"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Clock size={13} /> {t("hero.collection")}
            </motion.p>
          )}
        </div>

        <motion.div
          className="relative mx-auto flex w-full max-w-sm justify-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.25, ease: EASE }}
        >
          <div
            aria-hidden="true"
            className="absolute bottom-4 left-1/2 h-6 w-2/3 -translate-x-1/2 rounded-[50%] bg-cocoa/[0.09] blur-xl"
          />
          <Bear priority className="relative w-[260px] sm:w-[330px]" />
        </motion.div>
      </div>
    </section>
  );
}
