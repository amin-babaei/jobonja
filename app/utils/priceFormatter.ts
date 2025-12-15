export function formatCurrency(
  value: number | string | null | undefined
): string {
  if (value === null || value === undefined) return "—";

  const numericValue =
    typeof value === "string" ? Number(value) : value;

  return new Intl.NumberFormat("fa-IR", {
    style: "currency",
    currency: "IRR",
  })
    .format(numericValue)
    .replace("ریال", "")
}
