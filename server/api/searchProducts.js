import { processProducts } from "~/utils/processProducts";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  const searchQuery = query.q?.toString().trim() || "";
  if (!searchQuery || searchQuery.length < 1) {
    return { products: [], success: true };
  }
  try {
    const searchUrl = `${config.public.WP_API_BASE_URL}/wp-json/wc/v3/products`;
    const products = await $fetch(searchUrl, {
      query: {
        search: searchQuery,
        consumer_key: config.WP_CONSUMER_KEY,
        consumer_secret: config.WP_CONSUMER_SECRET,
        per_page: query.per_page || 20,
        page: query.page || 1,
      },
    });

    // Process products using reusable function
    const processedProducts = await processProducts(products, config);

    return {
      products: processedProducts,
      success: true,
    };
  } catch (error) {
    console.error("API Error (search):", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to search products",
    });
  }
});
