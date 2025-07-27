// server/api/productsByCategory.js
// [slug از کوئری میاد] →
// [دریافت ID دسته] →
// [دریافت محصولات با ID دسته] →
// [برگرداندن داده‌ها به کلاینت]

import { processProducts } from "~/utils/processProducts";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  const slug = query.slug;

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing category slug",
    });
  }

  try {
    const getCatUrl = `${config.public.WP_API_BASE_URL}/wp-json/wc/v3/products/categories`;
    const catRes = await $fetch(getCatUrl, {
      query: {
        slug: slug,
        consumer_key: config.WP_CONSUMER_KEY,
        consumer_secret: config.WP_CONSUMER_SECRET,
      },
    });

    if (!catRes || catRes.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: "Category not found",
      });
    }

    const categoryId = catRes[0].id;

    // گرفتن محصولات
    const getPrUrl = `${config.public.WP_API_BASE_URL}/wp-json/wc/v3/products`;
    const products = await $fetch(getPrUrl, {
      query: {
        category: categoryId,
        consumer_key: config.WP_CONSUMER_KEY,
        consumer_secret: config.WP_CONSUMER_SECRET,
        per_page: query.per_page || 20,
        page: query.page || 1,
      },
    });

    // Process products using reusable function
    const processedProducts = await processProducts(products, config);

    return {
      category: catRes[0],
      products: processedProducts,
      success: true,
    };
  } catch (error) {
    console.error("API Error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch products",
    });
  }
});
