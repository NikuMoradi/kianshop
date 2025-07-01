// server/api/categories.js
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const url = `${config.WP_API_BASE_URL}/wp-json/wc/v3/products/users?consumer_key=${config.WP_CONSUMER_KEY}&consumer_secret=${config.WP_CONSUMER_SECRET}`;

  const categories = await $fetch(url);
  return categories;
});
