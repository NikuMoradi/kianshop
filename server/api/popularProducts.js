export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const popularProducts = await $fetch(
    `${config.public.WP_API_BASE_URL}/wp-json/wc/v3/products?orderby=popularity&order=desc&consumer_key=${config.WP_CONSUMER_KEY}&consumer_secret=${config.WP_CONSUMER_SECRET}`,
  );
  return popularProducts;
});
