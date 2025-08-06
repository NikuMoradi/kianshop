<template>
  <div class="container-2xl 1024:px-4 mx-auto">
    <div
      class="1024:rounded-2xl 1024:pl-0 flex flex-col items-center bg-[var(--color-primary)] py-5"
    >
      <!-- ردیف اول -->
      <div class="w-full" v-if="$viewport.isLessThan('desktop')">
        <div class="mb-3 flex w-full items-center justify-between px-5">
          <!-- سمت راست -->
          <div class="flex items-center justify-center gap-2">
            <div>
              <img src="/images/percent-smile.svg" class="h-6 w-6" alt="" />
            </div>
            <div>
              <img src="/images/amazing.svg" alt="Incredible Word" />
            </div>
            <AmazingTimer></AmazingTimer>
          </div>
        </div>
      </div>

      <!-- ردیف دوم -->
      <div
        class="no-scrollbar flex w-full items-stretch gap-2 overflow-x-auto overflow-y-hidden px-5"
      >
        <div
          v-if="$viewport.isGreaterOrEquals('desktop')"
          class="1024:w-[142px] mx-4 flex h-full w-[114px] flex-col px-4"
        >
          <div class="flex flex-col items-center justify-center gap-4">
            <div>
              <img src="public/images/amazing-offers.svg" alt="Amazing Offer" />
            </div>
            <AmazingTimer></AmazingTimer>
            <div>
              <img
                src="/public/images/percent-smile.svg"
                class="h-20 w-20"
                alt=""
              />
            </div>
          </div>
        </div>

        <nuxt-link
          v-for="product in products"
          :key="product.id"
          :to="`/products/${product.id}/${slugify(product.name)}`"
          class="block rounded-2xl bg-white p-2"
          :class="{
            'rounded-r-md': product.id === 1,
          }"
        >
          <article
            class="1024:w-[142px] flex h-full w-[114px] flex-col transition duration-500 hover:scale-103"
          >
            <div class="relative h-40 rounded-2xl">
              <picture>
                <source :srcset="product.images[0]?.src" />
                <img
                  :src="product.images[0]?.src"
                  :alt="product.name"
                  class="h-full w-full rounded-xl object-cover"
                />
              </picture>
              <span
                v-if="$viewport.isLessThan('desktop')"
                class="absolute bottom-0 left-0 flex h-5 w-8 items-center justify-center rounded-full bg-[var(--color-primary)] px-1 py-1 text-xs text-white"
                >{{ toPersianDigits(product.discount_percentage) }}٪</span
              >
            </div>
            <div class="flex flex-col gap-2">
              <h3
                class="mt-2 line-clamp-2 h-[40px] text-[12px] leading-[20px] font-normal text-[#62666d]"
              >
                {{ product.name }}
              </h3>
              <div>
                <!-- sale price -->
                <div class="1280:justify-between flex justify-end">
                  <span
                    v-if="$viewport.isGreaterOrEquals('desktop')"
                    class="flex h-5 w-8 items-center justify-center rounded-full bg-[var(--color-primary)] px-1 py-1 text-xs text-white"
                    >{{
                      toPersianDigits(
                        calcDiscount(
                          product.display_price,
                          product.display_sale_price,
                        )?.discount,
                      )
                    }}٪</span
                  >
                  <div
                    class="flex items-center justify-end gap-1 text-[14px] leading-[18px] font-bold text-[#3f4064]"
                  >
                    <span>{{
                      toPersianDigits(product.display_sale_price)
                    }}</span>
                    <svg width="16" height="16" fill="#424750" color="#3f4064">
                      <use href="/images/toman.svg#toman"></use>
                    </svg>
                  </div>
                </div>
                <!--  price -->
                <div
                  class="1024:text-[12px] 1024:leading-[21px] flex items-center justify-end pl-5 text-[11px] leading-[15px] text-[#c0c2c5] line-through"
                >
                  {{ toPersianDigits(product.display_price) }}
                </div>
              </div>
            </div>
          </article>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: products } = await useAsyncData("amazings", () =>
  $fetch("/api/amazingProducts"),
);
</script>

<style></style>
