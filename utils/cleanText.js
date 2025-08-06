export function cleanText(text) {
  if (!text) return "";
  return text
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(h[1-6]|p|li|div)>/gi, "\n") // convert block tags to newlines
    .replace(/<[^>]*>/g, "") // remove all other tags
    .replace(/\n{2,}/g, "\n") // cleanup multiple empty lines
    .trim();
}
