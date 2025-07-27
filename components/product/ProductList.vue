<template>
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
              <h3 class="text-body-2-strong line-clamp-2 text-[#3f4064]">
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
                    <svg width="16" height="16" fill="#424750" color="#3f4064">
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
                  <svg width="16" height="16" fill="#424750" color="#3f4064">
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
  <div v-else>
    <NotFound />
  </div>
</template>

<script setup>
defineProps({
  products: {
    type: Array,
    required: true,
  },
});
</script>
<style scoped>
/* 2 cols */
@media (min-width: 640px) {
  .item-grid-divider > * {
    border-left: 1px solid #f0f0f1;
    border-bottom: 1px solid #f0f0f1;
  }
  .item-grid-divider > :nth-child(2n) {
    border-left: none;
  } /* box-shadow: offset-x offset-y blur-radius spread-radius color;*/

  .product-card:hover {
    box-shadow: 0px 0px 19px 1px rgba(0, 0, 0, 0.12);
  }
}

/* 3 cols */
@media (min-width: 1280px) {
  .item-grid-divider > :nth-child(2n) {
    border-left: 1px solid #f0f0f1;
  }
  .item-grid-divider > :nth-child(3n) {
    border-left: none;
  }
}
</style>
