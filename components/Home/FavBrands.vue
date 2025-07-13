<template>
  <div class="container-2xl 1024:px-4 mx-auto">
    <div
      class="1024:rounded-xl 1024:py-6 shadow-custom flex flex-col items-center bg-white"
    >
      <div class="flex items-center justify-center">
        <div class="ml-2 flex">
          <svg class="h-[24px] w-[24px]" fill="#f9bc00" stroke-width="0">
            <use href="public/images/sprite.svg#topBrands" />
          </svg>
        </div>
        <div class="flex items-center justify-center">
          <p class="text-h3">محبوب‌ترین برندها</p>
        </div>
      </div>
      <div class="mt-3 w-full">
        <div class="no-scrollbar flex items-center overflow-x-auto">
          <div
            v-for="(brand, index) in brands"
            :key="brand.id"
            class="flex items-center"
          >
            <nuxt-link
              to=""
              class="flex items-center justify-center gap-1 px-4 py-1"
            >
              <div
                class="1024:w-[150px] 1024:h-[110px] flex h-[70px] w-[70px] items-center justify-center"
              >
                <img :src="brand.image?.src || ''" alt="" />
              </div>
            </nuxt-link>
            <span
              v-if="index !== brands.length - 1"
              class="h-[90px] w-[.7px] bg-[#F0F0F1]"
            ></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: brands } = await useAsyncData("brands", () =>
  $fetch("/api/brands"),
);
</script>
