export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const url = `${config.public.WP_API_BASE_URL}/wp-json/custom/v1/amazing-data`;
  const amazingInfo = await $fetch(url);
  return amazingInfo;
});
