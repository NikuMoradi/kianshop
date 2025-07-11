//server/api/login/js
import { setResponseStatus } from "h3";

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);
  const wpApiUrl = useRuntimeConfig().public.WP_API_BASE_URL;

  try {
    const wpRes = await $fetch(`${wpApiUrl}/wp-json/jwt-auth/v1/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: { username, password },
    });

    if (!wpRes.token) {
      setResponseStatus(event, 401);
      return { success: false, message: "Unauthorized" };
    }

    setCookie(event, "jwt_token", wpRes.token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 2, // 1 day
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    return { success: true };
  } catch (err) {
    console.error("Error from WordPress:", err);
    setResponseStatus(event, 403);
    return { success: false, message: "Forbidden" };
  }
});
