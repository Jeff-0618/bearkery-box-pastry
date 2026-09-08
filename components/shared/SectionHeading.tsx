import { cx } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cx("mb-12 max-w-2xl", align === "center" && "mx-auto text-center", className)}
    >
      {eyebrow && <p className="t-eyebrow">{eyebrow}</p>}
      <h2 className="t-heading mt-4">{title}</h2>
      {description && <p className="t-body mt-4">{description}</p>}
    </div>
  );
}
