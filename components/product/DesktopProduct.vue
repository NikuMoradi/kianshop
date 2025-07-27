<template>
  <DesktopHeader />

  <div v-if="pending" class="flex justify-center items-center min-h-[100dvh]">
    <Loader />
  </div>
  <template v-else-if="product">
    <div id="container" class="container-4xl pt-[184px] px-5 flex-col">
      <div class="flex pb-5">
        <!-- right need shrink -->
        <div class="flex flex-col items-start w-[36%] ml-2">
          <!-- gallery -->
          <div class="flex">
            <div class="flex flex-col items-center justify-start gap-4">
              <FavoriteButton :product-id="product.id" />
              <ShareButton />
            </div>
            <div
              class="aspect-[1/1] w-full flex items-center justify-center h-full"
            >
              <NuxtImg
                :src="`/images/products/${product.images[0].image_url}.webp`"
                :alt="`image of ${product.images[0].image_url}`"
                class="w-full h-full object-contain mix-blend-multiply"
                placeholder="blur"
              />
            </div>
          </div>
          <div class="w-full flex gap-2 py-5 grow">
            <div
              v-for="image in product.images"
              class="flex justify-center items-center w-24 h-24 border-complete-200 rounded-lg shrink-0"
            >
              <img
                :src="`/images/products/${image.image_url}.webp`"
                :alt="`image of ${image.image_url}`"
                class="w-full h-full object-contain mix-blend-multiply"
              />
            </div>
          </div>
        </div>
        <!-- left -->
        <div class="flex flex-col grow">
          <!-- name -->
          <div class="w-full flex flex-col justify-start py-3">
            <h1 class="text-h4">
              {{ product.name }}
            </h1>
          </div>
          <div class="grid grid-cols-[3fr_2fr] gap-x-3">
            <!-- info -->
            <div>
              <!-- comments -->
              <div
                @click="scrollToReviews"
                class="flex items-center px-2 py-1 gap-x-1.5 bg-[#f2f2f2] rounded-[12rem] cursor-pointer shrink-0 max-w-max"
              >
                <span class="text-body-2-strong text-[#424750]">
                  {{ formatPrice(product.comments.length) }} دیدگاه
                </span>
                <div class="flex mr-[0.5px]">
                  <svg class="w-[15px] h-[15px]">
                    <use
                      href="/public/images/sprite.svg#chevronLeft"
                      fill="#424750
"
                    />
                  </svg>
                </div>
              </div>
              <!-- colors -->
              <div class="flex flex-col py-5 gap-y-4">
                <div class="grow">
                  <span class="text-h5">رنگ: {{ selectedColor.name }}</span>
                </div>
                <div class="flex items-center gap-1.5 w-full">
                  <div
                    v-for="(color, index) in product.colors"
                    :key="index"
                    class="border border-gray-300 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
                    :class="{
                      ' bg-[#19bfd3]  border-none': selectedColor === color,
                    }"
                    @click="selectedColor = color"
                  >
                    <div
                      class="flex items-center justify-center rounded-full border border-white"
                    >
                      <div
                        class="rounded-full w-7 h-7 border"
                        :style="{ backgroundColor: color.code }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- attributes -->
              <div class="flex flex-col mt-5 gap-y-4">
                <div class="grow py-3">
                  <span class="text-h5">ویژگی ها</span>
                </div>
                <div class="grid grid-cols-3 gap-2 w-full">
                  <div
                    v-for="(value, key) in product.attributes"
                    :key="key"
                    class="flex flex-col p-2 bg-[#f0f0f1] rounded-lg"
                  >
                    <div class="flex items-center justify-start">
                      <span
                        class="flex justify-start items-center text-body-2 text-[#81858b] custom-ellipsis"
                        >{{ key }}
                      </span>
                    </div>

                    <span class="text-body-2-strong custom-ellipsis">{{
                      value
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- add to cart -->
            <div
              class="flex flex-col justify-between px-4 py-4 bg-[#F7F7F7] rounded-lg border-complete-200"
            >
              <div>
                <div class="flex">
                  <h3 class="text-h5 text-[#0c0c0c]">فروشنده</h3>
                </div>

                <div class="flex gap-3 py-3 items-center">
                  <div class="flex">
                    <svg
                      class="w-[24px] h-[24px]"
                      fill="#424750"
                      stroke-width="5"
                    >
                      <use href="/images/sprite.svg#seller" />
                    </svg>
                  </div>
                  <p class="text-subtitle text-[#3f4064]">دیجی‌کالا</p>
                </div>
                <hr class="w-full bg-[#e0e0e2] border-none h-[1px]" />
                <div class="flex items-center gap-4 py-3">
                  <svg
                    class="w-[24px] h-[24px]"
                    fill="#424750"
                    stroke-width="0"
                  >
                    <use href="/images/sprite.svg#guarantee" />
                  </svg>
                  <p class="text-[#424750] text-button-2">
                    گارانتی اصالت و سلامت فیزیکی کالا
                  </p>
                </div>

                <hr class="w-full bg-[#e0e0e2] border-none h-[1px]" />

                <div class="flex items-center gap-4 py-3">
                  <svg
                    class="w-[20px] h-[20px]"
                    fill="#19bfd3"
                    stroke-width="0"
                  >
                    <use href="/images/sprite.svg#deliveryExpress" />
                  </svg>
                  <p class="text-[#424750] text-button-2">
                    ارسال دیجی‌کالا از ۳ روز کاری دیگر
                  </p>
                </div>
              </div>
              <div class="w-full flex flex-col gap-2 py-4">
                <!-- Price -->
                <div>
                  <template v-if="product.discount > 0">
                    <!-- discount value -->
                    <div class="flex items-center justify-end gap-1">
                      <div
                        class="bg-[#ef4056] flex justify-center items-center py-1 h-5 w-8 rounded-full"
                      >
                        <span class="text-white text-body-2-strong">
                          {{ formatPrice(product.discount) }}٪</span
                        >
                      </div>

                      <!-- raw price value -->
                      <div class="flex items-center text-[#c0c2c5] text-body-2">
                        <span class="relative line-through">
                          {{ formatPrice(product.price) }}
                        </span>
                      </div>
                    </div>
                    <!-- calculated price value -->

                    <div
                      class="flex items-center justify-end gap-1 text-[#3f4064] text-h3-bold-compact leading-[2.1]"
                    >
                      <span>{{
                        formatPrice(calcPrice(product.price, product.discount))
                      }}</span>
                      <svg
                        width="16"
                        height="16"
                        fill="#424750"
                        color="#3f4064"
                      >
                        <use xlink:href="/images/toman.svg#toman"></use>
                      </svg>
                    </div>
                  </template>
                  <template v-else>
                    <div
                      class="flex items-center justify-end gap-1 text-[#3f4064] text-h3-bold-compact leading-[2.1]"
                    >
                      <span>{{ formatPrice(product.price) }}</span>
                      <svg
                        width="16"
                        height="16"
                        fill="#424750"
                        color="#3f4064"
                      >
                        <use xlink:href="/images/toman.svg#toman"></use>
                      </svg>
                    </div>
                  </template>
                </div>
                <!-- button and quantity -->
                <div class="w-full flex items-center justify-center py-4">
                  <template v-if="!currentCartItem">
                    <button
                      @click="addToCart()"
                      class="grow flex text-button-2 py-3 rounded-lg bg-[#ef4056] text-white"
                      type="submit"
                    >
                      <div
                        class="flex items-center justify-center relative grow"
                      >
                        افزودن به سبد خرید
                      </div>
                    </button>
                  </template>
                  <template v-else>
                    <!-- quantity -->
                    <div
                      class="w-1/2 flex items-center justify-between rounded-lg h-[42px] cursor-pointer grow"
                      style="box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.12)"
                    >
                      <div
                        @click="
                          cart.quantityIncreament(
                            product.public_id,
                            selectedColor
                          )
                        "
                        class="flex p-3"
                      >
                        <svg
                          class="w-[24px] h-[24px]"
                          fill="#ef4056"
                          stroke-width="0"
                        >
                          <use href="/images/sprite.svg#addSimple" />
                        </svg>
                      </div>
                      <span class="text-h4 text-[#ef4056]">
                        {{ toPersianDigits(currentCartItem?.quantity) }}
                      </span>
                      <div
                        v-if="currentCartItem?.quantity < 2"
                        @click="
                          cart.removeFromCart(product.public_id, selectedColor)
                        "
                        class="flex p-3"
                      >
                        <svg
                          class="w-[24px] h-[24px]"
                          fill="#ef4056"
                          stroke-width="0"
                        >
                          <use href="/images/sprite.svg#delete" />
                        </svg>
                      </div>
                      <div
                        v-else
                        @click="
                          cart.quantityDecreament(
                            product.public_id,
                            selectedColor
                          )
                        "
                        class="flex p-3"
                      >
                        <svg
                          class="w-[18px] h-[18px]"
                          fill="#ef4056"
                          stroke-width="0"
                        >
                          <use href="/public/images/sprite.svg#removeSimple" />
                        </svg>
                      </div>
                    </div>
                    <div class="w-1/2 flex flex-col mr-4">
                      <p class="text-body-1 text-[#3f4064]">در سبد شما</p>
                      <p class="text-body-2">
                        مشاهده
                        <nuxt-link to="/checkout/cart" class="text-[#19bfd3]"
                          >سبد خرید</nuxt-link
                        >
                      </p>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="px-2">
        <!-- technical introdcution -->
        <hr class="w-full bg-[#f5f5f5] border-none h-[1px]" />

        <div class="flex flex-col py-5 gap-y-3">
          <h2 class="text-h5-compact text-[#212121]">بررسی تخصصی</h2>

          <div class="flex flex-col w-full items-center gap-4">
            <p class="text-body-1 text-[#23254e]">
              {{ product.technical_review }}
            </p>
          </div>
        </div>
        <!-- reviews section -->
        <hr class="w-full bg-[#f5f5f5] border-none h-1" />

        <div class="py-6">
          <div class="flex items-center justify-start">
            <p class="text-h5 grow">امتیاز و دیدگاه کاربران</p>
          </div>
          <div class="w-[70px] h-[2px] mt-2 bg-[#ef394e]"></div>
        </div>

        <div class="flex">
          <!-- rating -->
          <div class="min-w-[260px] ml-12">
            <div class="mt-2 flex justify-start items-center">
              <p class="text-[26px] ml-1">
                {{ toPersianDigits(averageRating) }}
              </p>
              <p class="text-[12px]">از {{ toPersianDigits(5) }}</p>
            </div>
            <div class="py-3 flex gap-3">
              <div class="flex items-center gap-x-0.5">
                <div v-for="n in 5 - (5 - Math.round(averageRating))">
                  <IconStarFilled
                    :stroke="2"
                    class="w-[20px] h-[20px]"
                    color="#FFC850"
                  />
                </div>
                <div v-for="n in 5 - Math.round(averageRating)">
                  <IconStar
                    :stroke="2"
                    class="w-[20px] h-[20px]"
                    color="#A1A3A8"
                  />
                </div>
              </div>
              <p class="text-[#a1a3a8] text-[10px]">
                از مجموع {{ toPersianDigits(sumOfRating) }} امتیاز
              </p>
            </div>
            <p class="py-3 text-caption text-[#3f4064]">
              شما هم درباره این کالا دیدگاه ثبت کنید
            </p>
            <button
              @click="openNewCommentModal"
              class="w-full flex items-center text-button-2 py-1.5 rounded-lg mb-2 border border-[#ef4056] text-[#ef4056]"
              type="submit"
            >
              <div class="flex items-center justify-center relative grow">
                ثبت دیدگاه
              </div>
            </button>
          </div>
          <!-- add new commnet -->
          <div
            v-if="isNewCommentModalOpen"
            @click="closeNewCommentModal"
            class="backdrop"
          ></div>
          <div
            v-if="isNewCommentModalOpen"
            id="newComment"
            class="fixed top-[50%] right-[50%] translate-x-[50%] -translate-y-[50%] bg-white z-50 w-[460px] h-[650px] rounded-lg"
          >
            <!-- head -->
            <div class="flex gap-x-0.5 items-center px-4 py-4">
              <div class="cursor-pointer" @click="closeNewCommentModal">
                <svg class="w-[24px] h-[24px]" fill="#424750" stroke-width="0">
                  <use href="/images/sprite.svg#arrowRight"></use>
                </svg>
              </div>
              <span class="text-h5 mr-1 text-[#424750]">ثبت دیدگاه</span>
            </div>
            <hr class="w-full bg-[#f5f5f5] border-none h-1" />
            <div class="flex justify-start items-center gap-x-1 px-4">
              <div class="w-[100px] h-[100px] flex items-center">
                <img
                  :src="`/images/products/${product.images[0].image_url}.webp`"
                  alt=""
                />
              </div>
              <div class="flex itemss-center justify-center">
                <span class="text-body-1-strong line-clamp-1">{{
                  product.name
                }}</span>
              </div>
            </div>
            <hr class="w-full bg-[#f5f5f5] border-none h-[1px]" />
            <form action="" class="px-4">
              <div class="flex py-2">
                <span class="text-subtitle-strong required_badge"
                  >متن دیدگاه:</span
                >
              </div>
              <textarea
                v-model="commentText"
                class="w-full p-4 border border-[#c0c2c5] text-subtitle rounded-lg resize-none focus:outline-none"
                rows="7"
                placeholder="نظر خود را در مورد این کالا با کاربران دیگر به اشتراک بگذارید..."
              ></textarea>
              <div
                class="w-full z-1 px-5 py-4 bottom-0 shadow-1-top fixed inset-x-0"
              >
                <button
                  class="w-full flex items-center text-button-1 py-3 rounded-lg mb-2 bg-[#ef4056] text-white"
                  type="submit"
                >
                  <div class="flex items-center justify-center relative grow">
                    ثبت دیدگاه
                  </div>
                </button>
                <p class="text-caption text-center">
                  ثبت دیدگاه به معنی موافقت با<a class="text-[#19bfd3] mx-1"
                    >قوانین انتشار دیجی‌کالا</a
                  >است.
                </p>
              </div>
            </form>
          </div>
          <!-- comments -->
          <div class="flex-1" id="reviews">
            <div class="w-full flex flex-col overflow-y-auto no-scrollbar">
              <div
                v-for="(comment, index) in product.comments"
                :key="index"
                class="gap-y-2"
              >
                <article
                  class="flex flex-col gap-y-4 rounded-lg px-4 py-5 h-[150px] shrink-0"
                >
                  <div class="flex flex-col gap-y-2">
                    <div class="flex items-center gap-x-2">
                      <span
                        class="text-caption text-[#a1a3a8] whitespace-nowrap"
                      >
                        {{ comment.user }}
                      </span>
                      <div class="bg-[#e0e0e2] w-1 h-1 rounded-full"></div>
                      <span class="text-caption text-[#81858b]">
                        {{ formatToPersianDate(comment.created_at) }}
                      </span>
                    </div>

                    <div class="flex items-center gap-x-0.5">
                      <div v-for="n in 5 - (5 - comment.rating)">
                        <IconStarFilled
                          :stroke="2"
                          class="w-[20px] h-[20px]"
                          color="#FFC850"
                        />
                      </div>
                      <div v-for="n in 5 - comment.rating">
                        <IconStar
                          :stroke="2"
                          class="w-[20px] h-[20px]"
                          color="#A1A3A8"
                        />
                      </div>
                    </div>
                  </div>

                  <p class="text-body-1 text-[#3f4064]">
                    {{ comment.comment }}
                  </p>
                </article>
                <hr class="w-full bg-[#f5f5f5] border-none h-[1px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <Footer />
</template>

<script setup>
const cart = useCartStore();

const currentCartItem = computed(() => {
  return cart.items.find(
    (item) =>
      item.public_id === product.value.public_id &&
      item.selectedColor.code === selectedColor.value.code
  );
});
const showAddedToCartModal = ref(false);

// Function to add product to cart
const addToCart = () => {
  if (product.value && selectedColor.value) {
    cart.addToCart(product.value, selectedColor.value);

    showAddedToCartModal.value = true;
    setTimeout(() => {
      showAddedToCartModal.value = false;
    }, 4000);
  }
};
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper/modules";
import { computed } from "vue";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const { product, pending, error, noResult } = useProduct();

// Initialize with a default value
const selectedColor = ref();

// Update selectedColor when product data is available
watch(
  () => product.value,
  (val) => {
    if (val?.colors?.length > 0) {
      selectedColor.value = val.colors[0];
    }
  },
  { immediate: true }
);

const isTechnicalReviewExpanded = ref(false);
const commentText = ref("");

// Add new Comment
const isNewCommentModalOpen = ref(false);

const openNewCommentModal = () => {
  isNewCommentModalOpen.value = true;
  document.body.style.overflow = "hidden";
};

const closeNewCommentModal = () => {
  document.body.style.overflow = "";
  isNewCommentModalOpen.value = false;
};

// All comments

const scrollToReviews = () => {
  const reviewsEl = document.getElementById("reviews");
  reviewsEl.scrollIntoView({ behavior: "smooth" });
};
const averageRating = ref(null);
const sumOfRating = ref(null);

watch(
  () => product.value?.comments,
  (comments) => {
    if (comments && comments.length > 0) {
      sumOfRating.value = comments.reduce((acc, c) => acc + (c.rating || 0), 0);
      averageRating.value = (sumOfRating.value / comments.length).toFixed(1);
    }
  },
  { immediate: true }
);
</script>
<style scoped>
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  opacity: 0;
}
/* Pagination container */
:deep(.swiper-pagination) {
  background-color: #676767;
  border-radius: 15px;
  padding-left: 4px;
  padding-right: 4px;
  width: 60px;
  height: 20px;
  display: flex;
  align-items: center;
  position: absolute;
  left: 10px;
  overflow: auto;
}
:deep(.swiper-pagination-bullet) {
  width: 7px;
  height: 7px;
  border-radius: 15px;
  background-color: #fffcfc;
}

:deep(.swiper-pagination-bullet-active) {
  background-color: #fff;
  width: 16px;
}

/* chnage buttons position */
</style>
