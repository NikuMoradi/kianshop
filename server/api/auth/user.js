// server/api/auth/user.js
import { getCookie } from "h3";

export default defineEventHandler(async (event) => {
  const token = getCookie(event, "jwt_token");
  const wpApiUrl = useRuntimeConfig().public.WP_API_BASE_URL;

  if (!token) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }

  try {
    // console.log("🔍 TOKEN:", token);
    const user = await $fetch(
      `${wpApiUrl}/wp-json/wp/v2/users/me?context=edit`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return user;
  } catch (err) {
    console.error("Auth error:", err);
    throw createError({ statusCode: 401, message: "Invalid token" });
  }
});
