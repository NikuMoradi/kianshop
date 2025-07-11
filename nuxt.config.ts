// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: false },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  runtimeConfig: {
    public: {
      WP_API_BASE_URL: process.env.WP_API_BASE_URL,
    },
    WP_CONSUMER_KEY: process.env.WP_CONSUMER_KEY,
    WP_CONSUMER_SECRET: process.env.WP_CONSUMER_SECRET,
  },
  modules: ["nuxt-viewport", "@pinia/nuxt"],
  imports: {
    dirs: ["utils", "stores"],
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  viewport: {
    breakpoints: {
      mobile: 640,
      tablet: 768,
      laptop: 1024,
      desktop: 1280,
    },
  },
  app: {
    head: {
      title: "KianShop",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      link: [],
    },
  },
  plugins: ["~/plugins/disable-tls.js"],
});
