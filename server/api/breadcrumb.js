export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const slugs = query.slugs ? query.slugs.split(",") : [];

  if (!slugs.length) return [];

  const config = useRuntimeConfig();
  const breadcrumbs = [
    {
      label: "خانه",
      link: "/",
    },
  ];

  for (let i = 0; i < slugs.length; i++) {
    const currentSlug = slugs[i];
    const res = await $fetch(
      `${config.public.WP_API_BASE_URL}/wp-json/wc/v3/products/categories?slug=${currentSlug}&consumer_key=${config.WP_CONSUMER_KEY}&consumer_secret=${config.WP_CONSUMER_SECRET}`,
    );
    if (!res || res.length === 0) break;
    breadcrumbs.push({
      label: res[0].name,
      link: `/categories/${slugs.slice(0, i + 1).join("/")}`,
    });
  }

  return breadcrumbs;
});
