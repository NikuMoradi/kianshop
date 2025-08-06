// composables/useUser.js
import { ref } from "vue";

export function useUser() {
  const user = ref(null);
  const loading = ref(false);
  const error = ref(null);

  async function fetchUser() {
    if (user.value) return; // اگر اطلاعات کاربر قبلاً لود شده، دوباره درخواست نده
    loading.value = true;
    try {
      const response = await useFetch("/api/auth/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.error.value) {
        throw new Error(response.error.value.message);
      }
      user.value = response.data.value;
    } catch (err) {
      error.value = err.message || "خطا در دریافت اطلاعات کاربر";
      console.error("خطا در fetchUser:", err);
    } finally {
      loading.value = false;
    }
  }
  const logout = async () => {
    await $fetch("/api/auth/logout");
    user.value = null;
  };

  // فراخوانی اولیه برای لود اطلاعات کاربر
  fetchUser();

  return {
    user,
    loading,
    error,
    fetchUser, // برای رفرش کردن دستی اطلاعات
    logout,
  };
}
