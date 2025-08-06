// server/api/profile/update.js
import { getCookie } from "h3";

export default defineEventHandler(async (event) => {
  const token = getCookie(event, "jwt_token");
  const config = useRuntimeConfig();
  const wpApiUrl = config.public.WP_API_BASE_URL;

  if (!token) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }

  try {
    // Get the profile data from the request body
    const profileData = await readBody(event);

    // First, get the current user data to get the user ID
    const user = await $fetch(
      `${wpApiUrl}/wp-json/wp/v2/users/me?context=edit`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    // Prepare the data for WordPress update
    const updateData = {
      first_name: profileData.first_name,
      last_name: profileData.last_name,
      // Add meta fields for custom user data
      meta: {
        mobile_number: profileData.mobile_number,
        national_code: profileData.national_code,
        birth_date: profileData.birth_date,
      },
    };

    // Update the user profile in WordPress
    const response = await $fetch(
      `${wpApiUrl}/wp-json/wp/v2/users/${user.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: updateData,
      },
    );

    return {
      success: true,
      message: "Profile updated successfully",
    };
  } catch (err) {
    console.error("Profile update error:", err);
    throw createError({
      statusCode: 500,
      message: "Failed to update profile data",
    });
  }
});