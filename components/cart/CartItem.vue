<template>
  <div
    :class="[
      'border-b border-[#e0e0e2] px-8 py-6',
      {
        'border-b-0': isLastItem,
      },
    ]"
  >
    <div class="grid grid-cols-[116px_1fr] gap-x-3 gap-y-4">
      <!-- image -->
      <nuxt-link
        :to="`/products/${item.parent_id === 0 ? item.id : item.parent_id}/${slugify(item.product_name)}`"
      >
        <div class="flex h-[114px] w-[114px] items-center justify-center">
          <img
            :src="item?.image?.src || item?.images?.[0]?.src || ''"
            :alt="
              item?.image?.alt ||
              item?.images?.[0]?.alt ||
              item?.product_name ||
              ''
            "
            class="h-full w-full object-contain mix-blend-multiply"
          />
        </div>
      </nuxt-link>
      <!-- info -->
      <div class="">
        <div class="justify-start-items-center flex">
          <h3 class="text-body-1-strong text-[#23254e]">
            {{ item.product_name }}
          </h3>
        </div>
        <!-- color -->
        <div
          v-if="item.attributes[0].option?.length > 0"
          class="mt-1 flex items-center gap-2"
        >
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
        <!-- price -->
        <div class="mt-5 flex flex-col justify-start gap-1">
          <div
            class="text-caption flex items-center text-[var(--color-primary)]"
          >
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
      <!-- quantity -->
      <div
        class="mx-auto flex h-[44px] w-[102px] cursor-pointer items-center justify-between rounded-lg border border-[#e0e0e2] px-2"
      >
        <div @click="cart.quantityIncreament(item)" class="flex">
          <IconPlus
            stroke="3"
            size="20px"
            color="var(--color-primary)"
            class="relative top-[1px]"
          ></IconPlus>
        </div>
        <span class="text-h5 text-[var(--color-primary)]">
          {{ toPersianDigits(item.quantity) }}
        </span>
        <div
          v-if="item.quantity < 2"
          @click="cart.removeFromCart(item)"
          class="flex"
        >
          <IconTrash
            size="20px"
            stroke="2"
            color="var(--color-primary)"
            class="relative top-[1px]"
          ></IconTrash>
        </div>
        <div v-else @click="cart.quantityDecreament(item)" class="flex">
          <IconMinus
            stroke="3"
            size="20px"
            color="var(--color-primary)"
            class="relative top-[1px]"
          ></IconMinus>
        </div>
      </div>
    </div>
    <!-- add to next buy -->
    <button class="mt-1 mr-auto flex" @click="cart.moveToNextBuy(item)">
      <div
        class="text-button-2 flex items-center justify-center gap-1 text-[#19bfd3]"
      >
        انتقال به خرید بعدی
        <div class="flex items-center">
          <svg class="h-[20px] w-[20px]" fill="#19bfd3">
            <use href="/images/sprite.svg#chevronLeft" />
          </svg>
        </div>
      </div>
    </button>
  </div>
</template>

<script setup>
import { IconPlus, IconMinus, IconTrash } from "@tabler/icons-vue";
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

// console.log("Cart item:", props.item);
// console.log("Cart item images:", props.item?.images);
// console.log("First image:", props.item?.images?.[0]);

const cart = useCartStore();
</script>
