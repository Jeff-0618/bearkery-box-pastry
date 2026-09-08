import { cx } from "@/lib/utils";

/**
 * The round shop stamp.
 *
 * Taken from the real circular sticker on Bearkery's packaging — reusing it
 * on screen is what ties the website to the box the customer actually holds.
 * It recurs as a badge, a section marker, and the confirmation "stamp".
 */
export default function Stamp({
  label = "BEARKERY BOX",
  sub = "PASTRY",
  className,
  animate = false,
}: {
  label?: string;
  sub?: string;
  className?: string;
  animate?: boolean;
}) {
  return (
    <div
      className={cx(
        "relative flex aspect-square items-center justify-center rounded-full border-2 border-dashed border-caramel/50 bg-surface/80",
        animate && "animate-stampDown",
        className
      )}
      style={{ transform: animate ? undefined : "rotate(-6deg)" }}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center leading-none">
        <span className="font-display text-[0.55em] font-semibold tracking-wide text-caramel">
          {label}
        </span>
        <span className="mt-[0.15em] font-display text-[0.42em] tracking-[0.3em] text-caramel/75">
          {sub}
        </span>
      </div>
    </div>
  );
}
