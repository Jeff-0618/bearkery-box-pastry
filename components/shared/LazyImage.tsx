"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const imgRef = useRef<HTMLImageElement | null>(null);

  /*
    An <img> that is already finished when React attaches its handlers never
    fires `load`, so `onLoad` alone leaves the component stuck at opacity 0 —
    a photo that downloaded perfectly well but is painted invisible.

    This is not hypothetical here. On a product page the main photo is
    `priority`, so the browser starts it during HTML parsing, and the first
    thumbnail points at that same optimised URL. By the time React hydrates,
    both are already complete: no event, no fade-in, two blank boxes — while
    the same file renders fine in a collection grid, where it loads lazily
    after hydration and the event does fire.

    So ask the DOM node what happened instead of waiting to be told. The
    check runs both when the node is attached and whenever `src` changes,
    because those are two different moments and a cached image can win
    either race.
  */
  const settleFromNode = useCallback((node: HTMLImageElement | null) => {
    if (!node || !node.complete) return;
    if (node.naturalWidth > 0) setLoaded(true);
    else setErrored(true);
  }, []);

  const attachRef = useCallback(
    (node: HTMLImageElement | null) => {
      imgRef.current = node;
      settleFromNode(node);
    },
    [settleFromNode]
  );

  // React keeps the same component instance when only `src` changes, so the
  // load/error flags have to be cleared by hand. Without this, one image that
  // fails leaves the component stuck showing the error state for every image
  // afterwards — a single missing file made the whole gallery look broken.
  useEffect(() => {
    setLoaded(false);
    setErrored(false);
    settleFromNode(imgRef.current);
  }, [src, settleFromNode]);

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
        ref={attachRef}
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
