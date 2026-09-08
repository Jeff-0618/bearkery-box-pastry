"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Collection } from "@/lib/types";
import LazyImage from "@/components/shared/LazyImage";

export default function StoryCollectionCard({
  collection,
  index = 0,
}: {
  collection: Collection;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.08, 0.32) }}
      className="group"
    >
      <Link href={`/collections/${collection.slug}`} className="block">
        <div className="relative overflow-hidden rounded-soft shadow-paper transition-shadow duration-300 group-hover:shadow-paper">
          <LazyImage
            src={collection.image}
            alt={collection.name}
            className="aspect-[4/3] w-full transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cocoa/70 via-cocoa/10 to-transparent" />
        </div>
        <div className="mt-4">
          <h3 className="font-display text-xl font-medium">{collection.name}</h3>
          <p className="mt-1 font-display text-sm italic text-teddy">{collection.story}</p>
          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-cocoa transition-colors group-hover:text-teddy">
            Explore
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
