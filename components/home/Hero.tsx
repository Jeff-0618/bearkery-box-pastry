"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import Bear from "@/components/shared/Bear";
import Stamp from "@/components/shared/Stamp";
import { Sprig } from "@/components/shared/Atmosphere";
import { useTimeOfDay } from "@/lib/use-time-of-day";
import { cx } from "@/lib/utils";

const EASE = [0.22, 0.61, 0.36, 1] as const;

/**
 * The door of the shop. Light, greeting and the highlighted product all
 * follow the real time of day, so the site feels like somewhere that is
 * currently open rather than a static page.
 */
export default function Hero() {
  const time = useTimeOfDay();

  return (
    <section className="relative overflow-hidden bg-milk">
      {/* Ambient light shifts with the hour */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${time.light} animate-driftLight transition-all duration-[2000ms]`}
      />

      <div className="container-bx relative grid items-center gap-10 pb-16 pt-12 sm:pt-16 md:grid-cols-[1.05fr_0.95fr] md:pb-24">
        <div>
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <span className={cx("t-eyebrow transition-opacity duration-500", time.ready ? "opacity-100" : "opacity-0")}>{time.greeting}</span>
            <span className="h-1 w-1 rounded-full bg-caramel/40" />
            <span className="t-eyebrow font-normal normal-case tracking-normal text-taupe">
              Seri Kembangan
            </span>
          </motion.div>

          <motion.h1
            className="t-display mt-4 max-w-[14ch]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          >
            Baked for
            <br />
            little moments.
          </motion.h1>

          <motion.p
            className="t-body mt-5 max-w-sm"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          >
            {time.line}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
          >
            {time.sandwichWindowOpen ? (
              <Link href="/collections/everyday-favourites" className="btn-primary">
                Today&apos;s Sandwiches
              </Link>
            ) : (
              <Link href="/product/pudding-burnt-cake" className="btn-primary">
                Our Pudding Burnt Cake
              </Link>
            )}
            <Link href="/about" className="btn-ghost">
              Our Story
            </Link>
          </motion.div>

          {time.sandwichWindowOpen && (
            <motion.p
              className="mt-5 inline-flex items-center gap-2 rounded-pill bg-peach px-4 py-2 text-xs font-semibold text-cocoa"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Clock size={13} /> Collection 7:00 – 11:00 AM
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
          <Sprig className="absolute -left-1 bottom-1 hidden h-24 w-16 sm:block" />
          <Bear priority className="relative w-[260px] sm:w-[330px]" />
          <Stamp className="absolute -right-1 top-2 w-20 text-base sm:w-24" />
        </motion.div>
      </div>
    </section>
  );
}
