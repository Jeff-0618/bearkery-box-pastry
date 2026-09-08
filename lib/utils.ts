export function formatPrice(amount: number) {
  return `RM${amount.toFixed(2)}`;
}

export function addDays(base: Date, days: number) {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

export function toISODate(d: Date) {
  return d.toISOString().split("T")[0];
}

export function formatReadableDate(iso: string) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function generateOrderId() {
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `BKB-${rand}`;
}
