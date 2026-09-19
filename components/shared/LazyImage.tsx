"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ImageOff } from "lucide-react";
import { cx } from "@/lib/utils";

export default function LazyImage({
  src,
  alt,
  className,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  // React keeps the same component instance when only `src` changes, so the
  // load/error flags have to be cleared by hand. Without this, one image that
  // fails leaves the component stuck showing the error state for every image
  // afterwards — a single missing file made the whole gallery look broken.
  useEffect(() => {
    setLoaded(false);
    setErrored(false);
  }, [src]);

  if (errored) {
    return (
      <div
        className={cx(
          "relative flex items-center justify-center overflow-hidden bg-cream",
          className
        )}
      >
        <ImageOff size={22} className="text-cocoa/25" aria-hidden="true" />
        <span className="sr-only">{alt}</span>
      </div>
    );
  }

  return (
    <div className={cx("relative overflow-hidden bg-cream", className)}>
      {!loaded && <div className="skeleton absolute inset-0" />}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        priority={priority}
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        /*
          Was a 700ms transition on blur + scale + opacity together. Blur is a
          per-pixel filter, so a grid of photos arriving at once made the phone
          re-filter several full-size images at the same moment — visible as a
          stutter just as the page settled. Opacity alone is composited on the
          GPU and costs nothing, and the shimmer underneath already covers the
          wait, so nothing is lost but the stall.
        */
        className={cx(
          "object-cover transition-opacity duration-500 ease-out",
          loaded ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
}
