export function toPersianDigits(num) {
  const parsed = Number(num);
  if (isNaN(parsed)) return "";
  return parsed.toLocaleString("fa-IR");
}
