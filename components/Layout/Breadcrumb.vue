<script setup>
const route = useRoute();
const slugs = computed(() => route.params.slugs);
const { data: breadcrumbs } = await useFetch(
  `/api/breadcrumb?slugs=${slugs.value.join(",")}`,
  {
    watch: [slugs],
    default: () => [],
  },
);
</script>

<template>
  <nav
    class="text-body-2 no-scrollbar flex grow gap-2 overflow-x-auto py-3 text-[#81858b]"
  >
    <template v-for="(crumb, index) in breadcrumbs" :key="crumb.link">
      <NuxtLink :to="crumb.link">{{ crumb.label }}</NuxtLink>
      <span v-if="index < breadcrumbs.length - 1"> / </span>
    </template>
  </nav>
</template>
