import { processProducts } from "~/utils/processProducts";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  try {
    const url = `${config.public.WP_API_BASE_URL}/wp-json/wc/v3/products?featured=true&consumer_key=${config.WP_CONSUMER_KEY}&consumer_secret=${config.WP_CONSUMER_SECRET}`;
    const products = await $fetch(url);

    // Process products using reusable function
    const processedProducts = await processProducts(products, config);

    return processedProducts;
  } catch (error) {
    console.error("API Error (amazingProducts):", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch amazing products",
    });
  }
});
