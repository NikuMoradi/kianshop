export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { p_id, review, rating } = await readBody(event);

  // Get user token from cookie
  const token = getCookie(event, "jwt_token");

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: "User not authenticated. Please login first.",
    });
  }

  // Validation
  if (!p_id || !review || rating == null || rating === "") {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing required fields: p_id, review, rating",
    });
  }

  if (rating < 1 || rating > 5) {
    throw createError({
      statusCode: 400,
      statusMessage: "Rating must be between 1 and 5",
    });
  }

  try {
    // Get user data from WordPress using the token
    const userResponse = await $fetch(
      `${config.public.WP_API_BASE_URL}/wp-json/wp/v2/users/me?context=edit`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const submitUrl = `${config.public.WP_API_BASE_URL}/wp-json/wc/v3/products/reviews`;

    const commentData = {
      product_id: parseInt(p_id),
      review: review,
      reviewer: userResponse.name,
      reviewer_email: userResponse.email,
      rating: parseInt(rating),
    };
    const response = await $fetch(submitUrl, {
      method: "POST",
      headers: {
        "review-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include token for authenticated request
      },
      body: commentData,
    });

    return {
      success: true,
      message: "Comment submitted successfully",
      comment: response,
      user: {
        id: userResponse.id,
        name: userResponse.name,
        email: userResponse.email,
      },
    };
  } catch (error) {
    console.error("Comment submission error:", error);

    // Handle specific WordPress errors
    if (error.data?.code === "rest_comment_duplicate") {
      throw createError({
        statusCode: 400,
        statusMessage: "Duplicate comment detected",
      });
    }

    if (error.data?.code === "rest_comment_flood") {
      throw createError({
        statusCode: 429,
        statusMessage:
          "Too many comments. Please wait before submitting another.",
      });
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Failed to submit comment",
    });
  }
});
