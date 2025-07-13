process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const url = `${config.public.WP_API_BASE_URL}/wp-json/wc/v3/products?featured=true&consumer_key=${config.WP_CONSUMER_KEY}&consumer_secret=${config.WP_CONSUMER_SECRET}`;
  const products = await $fetch(url);

  // Process each product to handle variations
  const processedProducts = await Promise.all(
    products.map(async (product) => {
      // If product has variations, fetch variation data
      if (product.variations && product.variations.length > 0) {
        try {
          const variationsUrl = `${config.public.WP_API_BASE_URL}/wp-json/wc/v3/products/${product.id}/variations?consumer_key=${config.WP_CONSUMER_KEY}&consumer_secret=${config.WP_CONSUMER_SECRET}`;
          const variations = await $fetch(variationsUrl);

          // Calculate price range from variations
          const prices = variations
            .map((v) => parseFloat(v.regular_price))
            .filter((p) => !isNaN(p));

          const salePrices = variations
            .map((v) => parseFloat(v.sale_price))
            .filter((p) => !isNaN(p) && p > 0);

          // Add price range to product
          product.price_range = {
            min: Math.min(...prices),
            max: Math.max(...prices),
            min_sale: salePrices.length > 0 ? Math.min(...salePrices) : null,
            max_sale: salePrices.length > 0 ? Math.max(...salePrices) : null,
          };

          // Set a display price (you can choose min, max, or average)
          product.display_price = Math.min(...prices);
          product.display_sale_price =
            salePrices.length > 0 ? Math.min(...salePrices) : null;

          // Mark as variable product
          product.is_variable = true;
        } catch (error) {
          console.error(
            `Error fetching variations for product ${product.id}:`,
            error,
          );
          // Fallback to original product data
          product.is_variable = false;
        }
      } else {
        // Simple product - use existing price data
        product.is_variable = false;
        product.display_price = parseFloat(product.regular_price);
        product.display_sale_price = product.sale_price
          ? parseFloat(product.sale_price)
          : null;
      }

      return product;
    }),
  );

  return processedProducts;
});
