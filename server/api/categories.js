// server/api/categories.js

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const url = `${config.public.WP_API_BASE_URL}/wp-json/wc/v3/products/categories?per_page=100&consumer_key=${config.WP_CONSUMER_KEY}&consumer_secret=${config.WP_CONSUMER_SECRET}`;

  const categories = await $fetch(url);
  return categories;
});
