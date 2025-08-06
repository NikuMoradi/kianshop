<template>
  <div
    :class="[
      'border-b border-[#e0e0e2] px-8 py-4',
      {
        '1024:border-b-0': isLastItem,
      },
    ]"
  >
    <div class="grid grid-cols-[116px_1fr] gap-x-3 gap-y-4">
      <!-- image -->
      <nuxt-link
        :to="`/products/${item.parent_id}/${slugify(item.product_name)}`"
      >
        <div class="flex h-[114px] w-[114px] items-center justify-center">
          <img
            :src="`${item?.image?.src || ''} `"
            :alt="`${item?.image?.alt || ''}`"
            class="h-full w-full object-contain mix-blend-multiply"
          />
        </div>
      </nuxt-link>
      <!-- info -->
      <div>
        <div class="justify-start-items-center flex">
          <h3 class="text-body-1-strong text-[#23254e]">
            {{ item.name }}
          </h3>
        </div>
        <div class="mt-1 flex items-center gap-2">
          <div
            class="h-[18px] w-[18px] rounded-full border border-[#e0e0e2]"
            :style="{
              backgroundColor: getColorHex(item.attributes[0]?.option),
            }"
          ></div>
          <p class="text-body-2 text-[#62666d]">
            {{ item.attributes[0]?.option }}
          </p>
        </div>
        <div class="mt-1 flex items-center gap-2">
          <div class="flex">
            <svg class="h-[18px] w-[18px]" fill="#a1a3a8" stroke-width="0">
              <use href="/images/sprite.svg#guarantee" />
            </svg>
          </div>
          <p class="text-body-2 custom-ellipsis text-[#62666d]">
            سرویس ویژه دیجی کالا: 7 روز تضمین بازگشت کالا
          </p>
        </div>
        <div class="mt-1 flex items-center gap-2">
          <div class="flex">
            <svg class="h-[18px] w-[18px]" fill="#a1a3a8" stroke-width="0">
              <use href="/images/sprite.svg#seller" />
            </svg>
          </div>
          <p class="text-body-2 text-[#62666d]">دیجی کالا</p>
        </div>
        <div class="mt-1 flex items-center gap-2">
          <div class="flex">
            <svg class="h-[17px] w-[17px]" fill="#81858b" stroke-width="0">
              <use href="/images/sprite.svg#deliveryExpress" />
            </svg>
          </div>

          <p class="text-body-2 custom-ellipsis text-[#81858b]">
            ارسال دیجی‌کالا از ۳ روز کاری دیگر
          </p>
        </div>
      </div>
      <div class="flex flex-col"></div>
      <!-- price -->
      <div class="flex flex-col justify-start gap-1">
        <div class="text-caption flex items-center text-[var(--color-primary)]">
          <span class="mr-1">{{
            toPersianDigits(
              (item.regular_price - item.sale_price) * item.quantity,
            )
          }}</span>
          <svg width="16" height="16" fill="currentColor">
            <use xlink:href="/images/toman.svg#toman"></use>
          </svg>
          <span class="mr-1"> تخفیف </span>
        </div>
        <div class="flex items-center">
          <span class="text-h4 text-[#23254e]">{{
            toPersianDigits(item.price * item.quantity)
          }}</span>
          <svg width="16" height="16" fill="#424750" color="#3f4064">
            <use xlink:href="/images/toman.svg#toman"></use>
          </svg>
        </div>
      </div>
    </div>

    <div class="mt-6 flex items-center gap-6">
      <button
        @click="cart.removeFromNextBuyItems(item)"
        class="flex items-center rounded-lg border border-[#e0e0e2] px-4 py-2"
      >
        <IconTrash
          size="24px"
          stroke="2"
          color="#81858b"
          class="relative top-[1px]"
        ></IconTrash>
        <span class="text-button-2 mr-1 text-[#81858b]"> حذف </span>
      </button>
      <button
        @click="cart.moveToCart(item)"
        class="flex items-center rounded-lg border border-[var(--color-primary)] px-4 py-2"
      >
        <svg
          width="24"
          height="24"
          fill="var(--color-primary)"
          color="var(--color-primary)"
        >
          <use href="/images/sprite.svg#moveToCart"></use>
        </svg>
        <span class="text-button-2 mr-1 text-[var(--color-primary)]">
          افزودن به سبد
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { IconTrash } from "@tabler/icons-vue";
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  isLastItem: {
    type: Boolean,
    default: false,
  },
});

const cart = useCartStore();
</script>
