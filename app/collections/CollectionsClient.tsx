"use client";

import { VISIBLE_COLLECTIONS } from "@/lib/data";
import StoryCollectionCard from "@/components/product/StoryCollectionCard";
import { useLang } from "@/lib/language";

/**
 * The heading is written out here rather than passed to SectionHeading,
 * because the old call passed the eyebrow as `t-eyebrow="All collections"` —
 * a CSS class name in a prop slot that SectionHeading never reads, so that
 * eyebrow has never appeared on the page.
 */
export default function CollectionsClient() {
  const { t } = useLang();

  return (
    <div className="container-bx page">
      <div className="mx-auto mb-10 max-w-xl text-center">
        <p className="t-eyebrow">{t("collections.eyebrow")}</p>
        <h1 className="t-heading mt-4">{t("collections.title")}</h1>
        <p className="t-body mt-4">{t("collections.description")}</p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {VISIBLE_COLLECTIONS.map((c, i) => (
          <StoryCollectionCard key={c.slug} collection={c} index={i} />
        ))}
      </div>
    </div>
  );
}
