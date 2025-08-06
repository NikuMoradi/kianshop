// stores/auth.js
export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const isLoggedIn = computed(() => !!user.value);

  const setUser = (u) => {
    user.value = u;
  };

  const logout = async () => {
    await $fetch("/api/auth/logout");

    user.value = null;
  };

  return { user, isLoggedIn, setUser, logout };
});
