export function toPersianDigits(num) {
  if (typeof num !== "number") return "";
  return num.toLocaleString("fa-IR");
}
