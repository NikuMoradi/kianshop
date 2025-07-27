<template>
  <div v-if="$viewport.isLessThan('laptop')">
    <!--custom Header -->
    <div class="fixed top-0 right-0 left-0 z-50 bg-white">
      <div class="flex items-center justify-between px-5 py-4">
        <div class="flex items-center">
          <div
            @click="goBack"
            class="relative top-[2px] flex cursor-pointer items-center"
          >
            <IconArrowRight color="#424750"></IconArrowRight>
          </div>
          <h1 class="text-h4 mr-5">
            {{ category.name }}
          </h1>
        </div>
        <div class="flex items-center">
          <!-- <SearchButton /> -->
          <nuxt-link to="/search">
            <svg class="ml-6 h-[24px] w-[24px]" fill="#424750" stroke-width="0">
              <use :href="'/images/sprite.svg#searchSearch'" />
            </svg>
          </nuxt-link>
          <ShareButton />
        </div>
      </div>
    </div>
    <div class="flex flex-col overflow-y-auto px-5 pt-16 pb-15">
      <!-- Nav breadcrumbPath -->
      <Breadcrumb></Breadcrumb>
      <!-- Products List Preview -->
      <div class="flex flex-col">
        <!-- Products Counter -->
        <div
          v-if="products.length !== 0"
          class="flex items-center justify-between py-3 text-[#81858b]"
        >
          <span class="text-body-1-strong">همه کالاها</span>
          <div class="1024:hidden block">
            <span class="text-body-2"
              >{{ toPersianDigits(products.length) }} کالا</span
            >
          </div>
        </div>

        <!-- Products Preview -->
        <div class="product-list-container-sm flex w-full justify-center">
          <!-- Skeleton -->
          <template v-if="pending">
            <SkeletonProductsList />
          </template>
          <template v-else>
            <ProductList :products="products" :noResult="error"></ProductList>
          </template>
        </div>
      </div>
    </div>
    <Footer></Footer>
    <MobileNavigation />
  </div>
  <div v-else>
    <Header />
    <div class="flex flex-col px-8 pt-[180px]">
      <Breadcrumb></Breadcrumb>
      <div class="flex flex-row gap-x-6">
        <section class="flex grow flex-col">
          <h1 class="text-h5 1024:mr-0 1024:my-3 mr-5">
            {{ category.name }}
          </h1>

          <div class="product-list-container-sm flex w-full justify-center">
            <template v-if="pending">
              <SkeletonProductsList />
            </template>
            <template v-else>
              <ProductList :products="products" :noResult="error"></ProductList>
            </template>
          </div>
        </section>
      </div>
    </div>
    <Footer class="border-t border-gray-200" />
  </div>
</template>
<script setup>
import { IconArrowRight } from "@tabler/icons-vue";

const route = useRoute();

const slugs = route.params.slugs;
const categorySlug = slugs.at(-1);

const {
  data: result,
  pending,
  error,
} = await useFetch(`/api/productsByCategory`, {
  query: { slug: categorySlug },
  default: () => ({ products: [], category: null }),
  watch: [() => route.params.slugs],
});

// Computed properties
const products = computed(() => result.value?.products || []);
const category = computed(() => result.value?.category);
</script>
