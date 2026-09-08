import { cx } from "@/lib/utils";

export function Badge({
  children,
  tone = "default",
  className,
}: {
  children: React.ReactNode;
  tone?: "default" | "peach" | "cocoa";
  className?: string;
}) {
  const tones: Record<string, string> = {
    default: "bg-cream text-cocoa",
    peach: "bg-peach text-cocoa",
    cocoa: "bg-cocoa text-milk",
  };

  return (
    <span
      className={cx(
        "inline-flex items-center rounded-pill px-3 py-1 text-[0.65rem] font-semibold tracking-wide",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
