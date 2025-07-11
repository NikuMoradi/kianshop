import { defineStore } from "pinia";
export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
  },
  actions: {
    async logout() {
      await $fetch("/api/auth/logout", { method: "POST" });
      this.user = null;
      navigateTo("/users/login");
    },
  },
});
