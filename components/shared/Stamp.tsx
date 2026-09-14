import { cx } from "@/lib/utils";

/**
 * The round shop stamp, echoing the circular sticker on Bearkery's packaging.
 *
 * Sizing note: the square ratio is enforced with an inline style rather than
 * the `aspect-square` utility, because a caller's own positioning classes can
 * override the utility and stretch the circle into a capsule. Callers set the
 * width; height always follows.
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
        "relative flex items-center justify-center rounded-full border-2 border-dashed border-caramel/50 bg-surface/80",
        animate && "animate-stampDown",
        className
      )}
      style={{
        aspectRatio: "1 / 1",
        transform: animate ? undefined : "rotate(-6deg)",
      }}
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
