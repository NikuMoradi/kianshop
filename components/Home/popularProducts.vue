<template>
  <div class="container-2xl 1024:px-4 mx-auto px-2">
    <div
      class="items-between shadow-custom 1024:rounded-xl 1024:py-6 1024:px-4 flex flex-col rounded-2xl bg-white px-2 py-4"
    >
      <div class="flex items-center justify-center">
        <div class="flex items-center justify-center">
          <div class="ml-2 flex">
            <svg class="h-[24px] w-[24px]" fill="#f9bc00" stroke-width="0">
              <use href="public/images/sprite.svg#searchTrend" />
            </svg>
          </div>
          <div class="flex items-center justify-center">
            <h3 class="text-h3">پرفروش‌ترین کالاها</h3>
          </div>
        </div>
      </div>
      <div class="no-scrollbar mt-4 w-full overflow-x-auto p-2">
        <div class="flex w-full gap-5">
          <div
            v-for="(group, groupIndex) in groupedProducts"
            :key="groupIndex"
            class="1024:w-[300px] flex w-[280px] shrink-0 flex-col gap-y-3"
          >
            <NuxtLink
              v-for="(item, itemIndex) in group"
              :key="item.id"
              to=""
              class="shadow-custom flex w-full rounded-2xl"
            >
              <div
                class="flex w-full items-center justify-center gap-3 px-2 py-2 transition duration-500 hover:scale-105"
              >
                <div
                  class="flex h-[86px] w-[86px] shrink-0 items-center justify-center rounded-2xl"
                >
                  <img
                    class="rounded-2xl"
                    :src="item.images?.[0]?.src"
                    :alt="item.images?.[0]?.alt"
                  />
                </div>
                <span
                  class="flex h-full items-center text-[22px] leading-[2.1] font-extrabold text-[#19bfd3]"
                >
                  {{ groupIndex * 3 + itemIndex + 1 }}
                </span>
                <div class="relative flex h-full grow flex-col justify-center">
                  <p class="text-[11px] leading-[2.17] text-[#3f4064]">
                    {{ item.name }}
                  </p>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: popularProducts } = await useAsyncData("popularProducts", () =>
  $fetch("/api/popularProducts"),
);

const groupedProducts = computed(() => {
  const groups = [];
  for (let i = 0; i < popularProducts.value.length; i += 3) {
    groups.push(popularProducts.value.slice(i, i + 3));
  }
  return groups;
});
</script>

<style scoped></style>
