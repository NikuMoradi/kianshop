<template>
  <div class="container-2xl 1024:px-5 mx-auto px-4">
    <div class="700:grid-cols-4 grid grid-cols-2 flex-wrap gap-5">
      <NuxtLink
        v-for="(cat, index) in featuredCategories"
        :key="index"
        class="group shadow-custom block w-full cursor-pointer rounded-2xl"
      >
        <div class="overflow-hidden rounded-2xl">
          <img
            :src="cat.image?.src || ''"
            :alt="cat.image?.alt || cat.name"
            class="h-full w-full transition duration-500 group-hover:scale-106"
          />
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { data: flatCategories } = await useAsyncData("categories", () =>
  $fetch("/api/categories"),
);

const featuredCategories = computed(() =>
  (flatCategories.value || []).filter(
    (cat) => cat.acf_data && cat.acf_data.featured_category === true,
  ),
);
</script>
