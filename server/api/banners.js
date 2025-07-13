export default defineEventHandler(async (event) => {
  const wpApiUrl = useRuntimeConfig().public.WP_API_BASE_URL;

  const banners = await $fetch(`${wpApiUrl}/wp-json/wp/v2/banner?_embed`);
  return banners;
});
