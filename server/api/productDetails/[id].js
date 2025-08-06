//api/productDetails/[id].js
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const id = event.context.params.id;

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing product ID",
    });
  }

  try {
    const productUrl = `${config.public.WP_API_BASE_URL}/wp-json/wc/v3/products/${id}`;
    const product = await $fetch(productUrl, {
      query: {
        consumer_key: config.WP_CONSUMER_KEY,
        consumer_secret: config.WP_CONSUMER_SECRET,
      },
    });

    // If product is variable, get variations
    let variations = [];
    if (product.type === "variable") {
      const variationsUrl = `${config.public.WP_API_BASE_URL}/wp-json/wc/v3/products/${id}/variations`;
      variations = await $fetch(variationsUrl, {
        query: {
          consumer_key: config.WP_CONSUMER_KEY,
          consumer_secret: config.WP_CONSUMER_SECRET,
        },
      });
    }

    return {
      success: true,
      product,
      variations,
    };
  } catch (error) {
    console.error("Product fetch error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch product",
    });
  }
});
