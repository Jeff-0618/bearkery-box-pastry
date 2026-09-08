"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * The small arc a product traces toward the cart when it's added.
 *
 * This is the one place the site uses a springy easing rather than a slow
 * gentle one: it's direct feedback to a deliberate tap, so a little bounce
 * reads as satisfying rather than fidgety. Ambient motion stays calm.
 */

interface FlyPayload {
  id: number;
  image: string;
  from: { x: number; y: number };
}

interface FlyToCartValue {
  fly: (image: string, origin: DOMRect) => void;
}

const Ctx = createContext<FlyToCartValue>({ fly: () => {} });

export function useFlyToCart() {
  return useContext(Ctx);
}

export function FlyToCartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<FlyPayload[]>([]);

  const fly = useCallback((image: string, origin: DOMRect) => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = Date.now();
    setItems((prev) => [
      ...prev,
      { id, image, from: { x: origin.left + origin.width / 2, y: origin.top + origin.height / 2 } },
    ]);
    setTimeout(() => setItems((prev) => prev.filter((i) => i.id !== id)), 900);
  }, []);

  return (
    <Ctx.Provider value={{ fly }}>
      {children}
      <div className="pointer-events-none fixed inset-0 z-[90]" aria-hidden="true">
        <AnimatePresence>
          {items.map((item) => {
            // Target: the cart icon lives at the top-right of the header.
            const targetX = typeof window !== "undefined" ? window.innerWidth - 64 : 0;
            const targetY = 76;
            return (
              <motion.img
                key={item.id}
                src={item.image}
                alt=""
                initial={{
                  position: "fixed",
                  left: item.from.x - 34,
                  top: item.from.y - 34,
                  width: 68,
                  height: 68,
                  opacity: 1,
                  borderRadius: 24,
                }}
                animate={{
                  left: targetX,
                  top: targetY,
                  width: 22,
                  height: 22,
                  opacity: 0.25,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.85, ease: [0.32, 0.72, 0.35, 1] }}
                className="object-cover shadow-lifted"
              />
            );
          })}
        </AnimatePresence>
      </div>
    </Ctx.Provider>
  );
}
