// server/api/profile.js
import { getCookie } from "h3";

export default defineEventHandler(async (event) => {
  const token = getCookie(event, "jwt_token");
  const config = useRuntimeConfig();
  const wpApiUrl = config.public.WP_API_BASE_URL;

  if (!token) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }

  try {
    // Fetch user profile data from WordPress
    const user = await $fetch(
      `${wpApiUrl}/wp-json/wp/v2/users/me?context=edit`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    // Format the response to match the expected structure in the frontend
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      mobile_number: user.meta?.mobile_number || "",
      national_code: user.meta?.national_code || "",
      birth_date: user.meta?.birth_date || "",
    };
  } catch (err) {
    console.error("Profile fetch error:", err);
    throw createError({ statusCode: 401, message: "Failed to fetch profile data" });
  }
});