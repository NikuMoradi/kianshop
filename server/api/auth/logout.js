// server/api/logout.post.ts
import { deleteCookie } from "h3";

export default defineEventHandler(async (event) => {
  deleteCookie(event, "jwt_token");
  return { success: true };
});
