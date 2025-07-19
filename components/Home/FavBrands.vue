<template>
  <div class="container-2xl 1024:px-4 mx-auto">
    <div
      class="1024:rounded-xl 1024:py-6 shadow-custom flex flex-col items-center bg-white py-3"
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
        <div
          class="no-scrollbar flex items-center justify-around overflow-x-auto"
        >
          <div
            v-for="(brand, index) in brands"
            :key="brand.id"
            class="flex items-center"
          >
            <div class="overflow-hidden">
              <nuxt-link
                to=""
                class="flex items-center justify-center gap-1 px-4 py-1 transition duration-500 hover:scale-108"
              >
                <div
                  class="1024:w-[120px] 1024:h-[120px] 700:h-[110px] 700:w-[110px] flex h-[80px] w-[80px] items-center justify-center overflow-hidden"
                >
                  <img :src="brand.image?.src || ''" alt="" claas="" />
                </div>
              </nuxt-link>
            </div>
            <span
              v-if="index !== brands.length - 1"
              class="h-[100px] w-[.7px] bg-[#F0F0F1]"
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
