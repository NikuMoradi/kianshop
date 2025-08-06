// server/api/productReviews.js
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  const id = query.p_id;

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "Missing product ID" });
  }

  try {
    const reviewsUrl = `${config.public.WP_API_BASE_URL}/wp-json/wc/v3/products/reviews?product=${id}`;

    const reviews = await $fetch(reviewsUrl, {
      query: {
        status: "approved",
        consumer_key: config.WP_CONSUMER_KEY,
        consumer_secret: config.WP_CONSUMER_SECRET,
      },
    });

    return { success: true, reviews };
  } catch (error) {
    console.error("Fetch error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch reviews",
    });
  }
});
