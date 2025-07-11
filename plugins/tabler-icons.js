import * as TablerIconsVue from "@tabler/icons-vue";

export default defineNuxtPlugin((nuxtApp) => {
  for (const [key, component] of Object.entries(TablerIconsVue)) {
    nuxtApp.vueApp.component(key, component);
  }
});
