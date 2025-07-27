export const slugify = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/[^\u0600-\u06FF\w\-]+/g, ""); // remove special chars except Persian/Latin
};
