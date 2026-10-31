import { cx } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  level = 2,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  /** Use 1 for the heading that titles the whole page; every page needs exactly one. */
  level?: 1 | 2;
}) {
  const Heading = level === 1 ? "h1" : "h2";

  return (
    <div
      className={cx("mb-12 max-w-2xl", align === "center" && "mx-auto text-center", className)}
    >
      {eyebrow && <p className="t-eyebrow">{eyebrow}</p>}
      <Heading className="t-heading mt-4">{title}</Heading>
      {description && <p className="t-body mt-4">{description}</p>}
    </div>
  );
}
