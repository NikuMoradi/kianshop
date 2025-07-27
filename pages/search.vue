<template>
  <div>
    <!-- search input -->
    <div class="fixed inset-x-0 top-0 z-50 w-full bg-white p-4">
      <div class="flex items-center rounded-lg bg-[#F0F0F1] px-3 py-2">
        <div @click="goBack" class="cursor-pointer">
          <IconArrowRight
            class="h-[28px] w-[28px]"
            fill="#81858b"
          ></IconArrowRight>
        </div>
        <input
          v-model="searchTerm"
          type="text"
          name="serach-input"
          autocomplete="off"
          class="text-button-1 h-5 w-full bg-[#F0F0F1] px-2 text-[#23254e]"
        />
        <div v-if="searchTerm" @click="cleanSearchInput" class="cursor-pointer">
          <IconX color="#81858b" width="22" height="22" stroke="2.5" />
        </div>
      </div>
    </div>
    <div class="h-16"></div>
    <!-- trend searches -->
    <div v-if="products?.length === 0">
      <div class="w-full p-4">
        <div class="flex items-center gap-2 text-[#3f4064]">
          <IconFlame></IconFlame>
          <span class="text-subtitle-strong">جستجوهای پرطرفدار</span>
        </div>
      </div>
      <div
        class="no-scrollbar flex h-14 w-full items-center gap-2 overflow-x-auto"
      >
        <div
          @click="searchKeyword(keyword)"
          v-for="(keyword, index) in keywords"
          :key="index"
          class="text-body-2 flex shrink-0 cursor-pointer items-center rounded-[12rem] border border-[#e0e0e2] bg-white px-2 py-1 text-[#3f4064] first:mr-4"
        >
          <span class="text-subtitle-strong text-[#3f4064]">
            {{ keyword }}
          </span>
          <div class="mr-1 flex">
            <IconChevronLeft
              color="#3f4064"
              stroke="3"
              size="15"
            ></IconChevronLeft>
          </div>
        </div>
      </div>
    </div>
    <!-- Result List -->
    <div class="flex flex-col px-5 pt-3 pb-14">
      <!-- Products Counter -->
      <div
        v-if="products?.length !== 0"
        class="flex items-center justify-between py-3 pt-3 text-[#81858b]"
      >
        <span class="text-body-1-strong">نتیجه جستجو </span>
        <span class="text-body-2"
          >{{ toPersianDigits(products?.length) }} کالا</span
        >
      </div>
      <!-- Products Preview -->
      <div class="product-list-container-sm w-full">
        <!-- Skeleton -->
        <template v-if="pending">
          <SkeletonProductsList />
        </template>
        <template v-else-if="result && searchQuery">
          <div
            v-if="products?.length"
            class="640:grid 640:grid-cols-2 1024:grid-cols-3 1280:grid-cols-4 640:gap-3 w-full"
          >
            <div
              v-for="product in products"
              class="640:px-2 product-card 640:rounded-2xl 640:shadow-custom 640:border border-complete-b flex w-full"
            >
              <nuxt-link
                :to="`/products/${product.id}/${slugify(product.name)}`"
                class="flex w-full items-center py-3"
              >
                <article class="640:flex-col 640:gap-y-3 flex w-full">
                  <div class="h-8"></div>

                  <div
                    class="640:w-[240px] 640:h-[240px] 640:mx-auto h-[118px] w-[118px] shrink-0"
                  >
                    <img
                      v-if="product.images?.[0]"
                      :src="product.images[0].src"
                      :alt="product.name"
                      class="h-full w-full object-contain"
                    />
                  </div>
                  <div class="h-8"></div>

                  <div class="w-full">
                    <div>
                      <h3
                        class="text-body-2-strong line-clamp-2 text-[#3f4064]"
                      >
                        {{ product.name }}
                      </h3>
                    </div>
                    <div class="flex flex-col pt-4">
                      <template v-if="product?.display_sale_price">
                        <div class="flex items-center justify-between">
                          <!-- discount value -->
                          <div
                            class="flex h-5 w-8 items-center justify-center rounded-full bg-[var(--color-primary)] py-1"
                          >
                            <span class="text-body-2-strong text-white">
                              {{
                                toPersianDigits(
                                  calcDiscount(
                                    product.display_price,
                                    product.display_sale_price,
                                  )?.discount,
                                )
                              }}٪</span
                            >
                          </div>
                          <!-- calculated price value -->
                          <div
                            class="text-h5 mr-auto flex items-center gap-1 leading-[2.1] font-bold text-[#3f4064]"
                          >
                            <span>{{
                              toPersianDigits(product.display_sale_price)
                            }}</span>
                            <svg
                              width="16"
                              height="16"
                              fill="#424750"
                              color="#3f4064"
                            >
                              <use href="/images/toman.svg#toman"></use>
                            </svg>
                          </div>
                        </div>
                        <!-- raw price value -->
                        <div
                          class="text-body-2 flex items-center justify-end pl-5 text-[#c0c2c5]"
                        >
                          <span class="relative line-through">
                            {{ toPersianDigits(product.display_price) }}
                          </span>
                        </div>
                      </template>
                      <template v-else>
                        <div
                          class="text-h5 mr-auto flex items-center justify-end gap-1 leading-[2.1] font-bold text-[#3f4064]"
                        >
                          <span>{{ toPersianDigits(product.price) }}</span>
                          <svg
                            width="16"
                            height="16"
                            fill="#424750"
                            color="#3f4064"
                          >
                            <use href="/images/toman.svg#toman"></use>
                          </svg>
                        </div>
                      </template>
                    </div>
                  </div>
                </article>
              </nuxt-link>
            </div>
          </div>
          <div
            v-else-if="searchQuery && !pending"
            class="flex w-full justify-center"
          >
            <NotFound />
          </div>
        </template>
      </div>
    </div>
  </div>
  <MobileNavigation v-if="$viewport.isLessThan('laptop')" />
</template>

<script setup>
definePageMeta({ layout: "default" });

import {
  IconArrowRight,
  IconChevronLeft,
  IconFlame,
  IconX,
} from "@tabler/icons-vue";

import { watchDebounced } from "@vueuse/core";

const searchTerm = ref("");
const searchQuery = ref("");

watchDebounced(
  searchTerm,
  (val) => {
    if (val.trim().length >= 2) {
      searchQuery.value = val.trim();
    }
  },
  { debounce: 1000 },
);

const {
  data: result,
  pending,
  error,
} = await useFetch(
  `/api/searchProducts`,
  {
    query: { q: searchQuery },
    watch: [searchQuery],
    default: () => ({ products: [] }),
    server: false,
    lazy: true,
    skip: () => !searchQuery.value || searchQuery.value.trim().length < 1,
  },
  {
    immediate: false,
  },
);

const products = computed(() => result.value?.products || []);

const cleanSearchInput = () => {
  searchTerm.value = "";
  searchQuery.value = null;
};

const keywords = ["تراش", "کیف", "مداد رنگی", "کیمدی"];

const searchKeyword = (keyword) => {
  searchTerm.value = keyword;
  searchQuery.value = keyword;
};
</script>
<style scoped></style>
