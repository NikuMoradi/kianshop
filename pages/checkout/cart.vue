<template>
  <Header v-if="$viewport.isGreaterOrEquals('laptop')" />

  <client-only>
    <div class="1024:px-6 1024:pt-[184px] flex w-full flex-col">
      <!-- tabs -->
      <ul
        class="1024:justify-start flex w-full items-center justify-center border-b border-[#e0e0e2] bg-white"
      >
        <!-- سبد خربد -->
        <li
          @click="cart.activeTab = 'cart'"
          class="1024:grow-0 relative flex grow cursor-pointer items-center justify-center px-4 py-2"
        >
          <div class="flex items-center justify-center gap-2">
            <span
              class="text-subtitle-strong"
              :class="
                cart.activeTab === 'cart'
                  ? 'text-[var(--color-primary)]'
                  : 'text-[#a1a3a8]'
              "
              >سبد خرید</span
            >
            <span
              v-if="cart.totalItems > 0"
              class="flex h-[20px] w-[20px] items-center justify-center rounded-[6px] border-[1px] border-white text-[12px] text-white"
              :class="
                cart.activeTab === 'cart'
                  ? 'bg-[var(--color-primary)]'
                  : 'bg-[#a1a3a8]'
              "
            >
              <div>{{ toPersianDigits(cart.totalItems) }}</div>
            </span>
          </div>
          <div
            v-if="cart.activeTab === 'cart'"
            class="absolute bottom-0 h-1 w-[90%] rounded-t-lg bg-[var(--color-primary)]"
          ></div>
        </li>
        <!-- خرید بعدی -->
        <li
          @click="cart.activeTab = 'nextBuy'"
          class="1024:grow-0 relative flex grow cursor-pointer items-center justify-center px-4 py-2"
        >
          <div class="flex items-center justify-center gap-2">
            <span
              class="text-subtitle-strong"
              :class="
                cart.activeTab === 'nextBuy'
                  ? 'text-[var(--color-primary)]'
                  : 'text-[#a1a3a8]'
              "
              >خرید بعدی</span
            >
            <span
              v-if="cart.nextBuyItems.length > 0"
              class="flex h-[20px] w-[20px] items-center justify-center rounded-[6px] border-[1px] border-white bg-[#a1a3a8] text-[12px] text-white"
              :class="
                cart.activeTab === 'nextBuy'
                  ? 'bg-[var(--color-primary)]'
                  : 'bg-[#a1a3a8]'
              "
            >
              <div>{{ toPersianDigits(cart.nextBuyItems.length) }}</div>
            </span>
          </div>
          <div
            v-if="cart.activeTab === 'nextBuy'"
            class="absolute bottom-0 h-1 w-[90%] rounded-t-lg bg-[var(--color-primary)]"
          ></div>
        </li>
      </ul>
      <!-- contents -->
      <ul class="1024:pb-0 not-1024:mx-auto w-[95%] pt-6 pb-[160px]">
        <!-- سبد خربد -->
        <li v-if="cart.activeTab === 'cart'">
          <template v-if="cart.items.length">
            <div
              class="1024:flex-row flex flex-col items-start justify-center gap-6"
            >
              <!-- list of items -->
              <section class="w-full rounded-lg border border-[#e0e0e2]">
                <div v-for="(item, index) in cart.items" :key="index">
                  <CartItem
                    :item="item"
                    :is-last-item="index === cart.items.length - 1"
                  />
                </div>
              </section>
              <!-- total prices -->
              <div class="1024:flex-1/2 w-full">
                <PostInfo></PostInfo>
              </div>
            </div>
          </template>

          <template v-else>
            <div class="flex flex-col items-center py-6">
              <div class="flex">
                <img
                  src="/public/images/empty-cart.svg"
                  alt="empty cart"
                  class="mb-4 h-52 w-52 object-contain"
                />
              </div>
              <div class="flex">
                <p class="text-h4 text-[#23254e]">سبد خرید شما خالی است!</p>
              </div>
            </div>
          </template>
        </li>
        <!-- خرید بعدی -->
        <li v-if="cart.activeTab === 'nextBuy'">
          <template v-if="cart.nextBuyItems.length">
            <div class="1024:flex 1024:items-start 1024:relative">
              <!-- list of items -->
              <section
                class="1024:border 1024:rounded-lg 1024:border-[#e0e0e2] ml-3 grow pb-2"
              >
                <div
                  class="360:px-4 flex items-center justify-between px-3 pt-2 pb-6"
                >
                  <p class="text-h5 text-[#0c0c0c]">لیست خرید بعدی شما</p>
                  <button class="flex" @click="cart.moveAllToCart()">
                    <div
                      class="text-button-2 flex items-center justify-center gap-1 text-[#19bfd3]"
                    >
                      انتقال همه به سبد خرید
                      <div class="flex items-center">
                        <IconChevronLeft
                          class="360:w-[16px] 360:h-[16px] relative top-[1px] h-[14px] w-[14px]"
                          stroke="3"
                          color="#19bfd3"
                        ></IconChevronLeft>
                      </div>
                    </div>
                  </button>
                </div>

                <div v-for="(item, index) in cart.nextBuyItems" :key="index">
                  <NextBuyItem
                    :item="item"
                    :is-last-item="index === cart.nextBuyItems.length - 1"
                  />
                </div>
              </section>
              <!-- aside -->
              <aside class="1024:block sticky top-[180px] hidden">
                <div
                  class="flex w-[300px] flex-col items-center gap-2 rounded-lg border border-[#e0e0e2] bg-white px-4 py-4"
                >
                  <span class="text-body-2-strong text-[#0c0c0c]"
                    >{{ toPersianDigits(cart.nextBuyItems.length) }} کالا
                  </span>
                  <button
                    @click="cart.moveToCart(item)"
                    class="flex w-full items-center justify-center rounded-lg border border-[var(--color-primary)] px-4 py-2"
                  >
                    <svg
                      width="20"
                      height="20"
                      fill="var(--color-primary)"
                      color="var(--color-primary)"
                    >
                      <use href="public/images/sprite.svg#moveToCart"></use>
                    </svg>
                    <span
                      class="text-button-1 mr-3 text-[var(--color-primary)]"
                    >
                      انتقال همه به سبد خرید
                    </span>
                  </button>
                </div>
              </aside>
            </div>
          </template>

          <template v-else>
            <div class="flex flex-col items-center py-6">
              <div class="flex">
                <img
                  src="/public/images/empty-sfl.webp"
                  alt="empty cart"
                  class="mb-4 h-52 w-52 object-contain"
                />
              </div>
              <div class="flex">
                <p class="text-h4 text-[#23254e]">
                  لیست خرید بعدی شما خالی است!
                </p>
              </div>
            </div>
          </template>
        </li>
      </ul>
    </div>
  </client-only>
  <Footer v-if="$viewport.isGreaterOrEquals('laptop')" />
  <MobileNavigation v-if="$viewport.isLessThan('laptop')" />
</template>

<script setup>
import { IconChevronLeft } from "@tabler/icons-vue";
const route = useRoute();
const cart = useCartStore();
const auth = useAuthStore();
</script>
