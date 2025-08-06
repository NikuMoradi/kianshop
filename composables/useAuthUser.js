// composables/useAuth.js
export const useAuthUser = async () => {
  const auth = useAuthStore();
  const token = useCookie("jwt_token", { sameSite: "strict" });
  const loading = ref(false);
  const error = ref(null);
  try {
    if (token.value) {
      loading.value = true;
      const { data } = await useFetch("/api/auth/user", {
        server: true,
        headers: {
          "Content-Type": "application/json",
          ...(token.value ? { Authorization: `Bearer ${token.value}` } : {}),
        },
      });

      if (data.value) {
        auth.setUser(data.value);
      }
    }
  } catch (err) {
    // کاربر لاگین نیست، نیازی نیست ارور بدیم
    auth.setUser(null);
  } finally {
    loading.value = false;
  }
};
