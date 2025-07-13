export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const wpApiUrl = config.public.WP_API_BASE_URL;
  const brands = await $fetch(
    `${config.public.WP_API_BASE_URL}/wp-json/wc/v2/products/brands?consumer_key=${config.WP_CONSUMER_KEY}&consumer_secret=${config.WP_CONSUMER_SECRET}`,
  );
  return brands;
});
