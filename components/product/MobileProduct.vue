<template>
  <div v-if="pending" class="flex min-h-[100dvh] items-center justify-center">
    <Loader />
  </div>
  <template v-else-if="product">
    <div id="container" class="1024:hidden pt-[310px] pb-[75px]">
      <!-- header -->
      <div
        id="nav"
        class="border-complete-b fixed inset-x-0 top-0 z-10 flex w-full items-center justify-between bg-white px-2 py-1"
      >
        <div class="flex">
          <button onclick="window.location.href='/'" class="p-2">
            <IconX class="h-[22px] w-[22px] text-[#424750]" />
          </button>
        </div>
        <div class="flex">
          <button onclick="window.location.href='/search'" class="p-2">
            <svg class="h-[24px] w-[24px]" fill="#424750" stroke-width="0">
              <use href="/images/sprite.svg#searchSearch" />
            </svg>
          </button>

          <!-- Shopping cart -->
          <NuxtLink
            to="/checkout/cart"
            class="relative flex shrink-0 items-center justify-center p-2"
          >
            <div class="flex">
              <IconShoppingCart
                color="#424750"
                :stroke="2"
                class="scale-x-[-1]"
              />
              <div
                class="absolute right-1 bottom-2 flex h-[17px] w-[17px] items-center justify-center rounded-[6px] border-[1px] border-white bg-[#ef4056] text-[12px] text-white"
              >
                <div>{{ toPersianDigits(cart.totalItems) }}</div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
      <!-- gallery -->
      <div id="gallery" class="fixed top-12 left-0 z-1 w-full">
        <div class="flex h-screen justify-center bg-[#f0f0f1]">
          <swiper
            :modules="[Navigation, Pagination]"
            :pagination="{ clickable: true }"
            :navigation="true"
            class="my-custom-swiper h-[250px] w-full"
          >
            <swiper-slide
              v-for="(image, index) in product.images"
              :key="index"
              class="h-[250px] w-full bg-[#f0f0f1]"
            >
              <div class="flex items-center justify-center">
                <div class="h-[250px] w-[250px]">
                  <img
                    :src="`/images/products/${image.image_url}.webp`"
                    :alt="`image ${index + 1} : ${image.image_url}`"
                    class="h-full w-full object-contain mix-blend-multiply"
                  />
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
      <!-- content -->
      <div id="content" class="relative z-4 rounded-t-2xl bg-white">
        <section id="SPEC">
          <div class="flex items-center justify-end gap-4 px-4 pt-5">
            <ShareButton></ShareButton>
            <FavoriteButton :product-id="product.id" />
          </div>
          <!-- name -->
          <div class="flex w-full flex-col justify-start gap-y-2 px-4 py-3">
            <h1 class="text-h5">
              {{ product.name }}
            </h1>
            <div
              @click="openCommentsModal"
              class="flex max-w-max shrink-0 cursor-pointer items-center gap-x-1.5 rounded-[12rem] bg-[#f2f2f2] px-2 py-1"
            >
              <span class="text-body-2-strong text-[#424750]">
                {{ toPersianDigits(product.comments.length) }} دیدگاه
              </span>
              <div class="mr-[0.5px] flex">
                <svg class="h-[15px] w-[15px]">
                  <use
                    href="/public/images/sprite.svg#chevronLeft"
                    fill="#424750
"
                  />
                </svg>
              </div>
            </div>
          </div>
          <hr class="h-[1px] w-full border-none bg-[#f5f5f5]" />
          <!-- colors -->
          <div class="flex flex-col gap-y-4 py-5">
            <div class="flex items-center gap-1 px-4">
              <span class="text-h5"
                >رنگ انتخاب شده: {{ selectedColor.name }}</span
              >
              <div
                class="h-4 w-4 rounded-full border border-[#e0e0e2]"
                :style="{ backgroundColor: selectedColor.code }"
              ></div>
            </div>
            <div
              class="no-scrollbar flex w-full items-center gap-1.5 overflow-x-scroll pr-4"
            >
              <div
                v-for="(color, index) in product.colors"
                :key="index"
                class="border-complete-200 flex min-w-[48px] shrink-0 cursor-pointer items-center gap-x-1.5 rounded-lg py-1.5 pr-2 pl-3"
                :class="{
                  '!border-[#424750]': selectedColor === color,
                }"
                @click="selectedColor = color"
              >
                <div
                  class="h-5 w-5 rounded-full border"
                  :style="{ backgroundColor: color.code }"
                ></div>
                <span class="text-body-1-180">{{ color.name }}</span>
              </div>
            </div>
          </div>
          <hr class="h-[1px] w-full border-none bg-[#f5f5f5]" />
          <!-- attributes -->
          <div class="flex flex-col gap-y-4 py-5">
            <div class="flex items-center justify-between px-4">
              <span class="text-h5"> مشخصات کالا</span>
              <div class="flex items-center justify-center gap-1.5">
                <span class="text-button-2 text-[#424750]"> مشاهده همه</span>
                <svg class="h-[18px] w-[18px]">
                  <use
                    href="/public/images/sprite.svg#chevronLeft"
                    fill="#424750
"
                  />
                </svg>
              </div>
            </div>
            <div
              class="no-scrollbar flex w-full items-center gap-1.5 overflow-x-scroll pr-4"
            >
              <div
                v-for="(value, key) in product.attributes"
                :key="key"
                class="border-complete-200 flex flex-col gap-y-1 rounded-lg px-3 py-2"
              >
                <div class="flex items-center justify-center">
                  <span
                    class="text-body2-strong-compact flex items-center justify-start whitespace-nowrap text-[#62666d]"
                    >{{ key }}
                    <div class="flex items-center justify-center">
                      <svg class="h-[16px] w-[16px]">
                        <use
                          href="/public/images/sprite.svg#chevronLeft"
                          fill="#424750
"
                        />
                      </svg></div
                  ></span>
                </div>

                <span class="text-body1-strong-compact whitespace-nowrap">{{
                  value
                }}</span>
              </div>
            </div>
          </div>
        </section>
        <hr class="h-2 w-full border-none bg-[#f5f5f5]" />

        <section id="REVIEW">
          <div class="flex flex-col gap-y-3 px-4 py-5">
            <h2 class="text-h5-compact text-[#212121]">بررسی تخصصی</h2>

            <div class="flex w-full flex-col items-center gap-4">
              <p
                :class="[
                  'text-body-1',
                  { 'line-clamp-3': !isTechnicalReviewExpanded },
                ]"
              >
                {{ product.technical_review }}
              </p>
              <button
                @click="toggleTechnicalReview"
                class="text-button-2 flex items-center rounded-2xl bg-[#f5f5f5] py-2 pr-4 pl-3"
              >
                <div
                  class="text-body-2-strong flex items-center justify-center gap-2 text-[#424750]"
                >
                  {{
                    isTechnicalReviewExpanded
                      ? "بستن"
                      : "مشاهده ادامه بررسی تخصصی"
                  }}
                  <div class="flex items-center justify-center">
                    <svg
                      class="h-[18px] w-[18px] transition-transform duration-300"
                      :class="{ 'rotate-180': isTechnicalReviewExpanded }"
                    >
                      <use
                        href="/public/images/sprite.svg#chevronDown"
                        fill="#424750"
                      />
                    </svg>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </section>
        <hr class="h-2 w-full border-none bg-[#f5f5f5]" />
        <section id="COMMENTS">
          <div class="flex items-center justify-between px-4 py-3">
            <h2 class="text-h5 text-[#222732]">دیدگاه کاربرها</h2>
            <div
              @click="openCommentsModal"
              class="flex cursor-pointer items-center"
            >
              <span class="text-button-2 text-[#424242]"
                >مشاهده
                {{ toPersianDigits(product.comments.length) }} دیدگاه</span
              >
              <svg class="h-[18px] w-[18px]">
                <use
                  href="/public/images/sprite.svg#chevronLeft"
                  fill="#424750
"
                />
              </svg>
            </div>
          </div>
          <div
            class="no-scrollbar flex w-full items-center gap-2 overflow-x-auto pr-4 pb-4"
          >
            <article
              v-for="(comment, index) in product.comments"
              :key="index"
              class="border-complete-200 flex h-48 w-60 shrink-0 flex-col gap-y-2 rounded-lg p-4"
            >
              <div class="flex flex-col gap-y-1">
                <span
                  class="text-body-2-compact whitespace-nowrap text-[#424242]"
                >
                  {{ comment.user }}
                </span>
                <div class="flex items-center gap-x-0.5">
                  <div v-for="n in 5 - (5 - comment.rating)">
                    <IconStarFilled
                      :stroke="2"
                      class="h-[12px] w-[12px]"
                      color="#FFC850"
                    />
                  </div>
                  <div v-for="n in 5 - comment.rating">
                    <IconStar
                      :stroke="2"
                      class="h-[12px] w-[12px]"
                      color="#A1A3A8"
                    />
                  </div>
                </div>
              </div>

              <p class="text-body-1 line-clamp-3 text-[#3f4064]">
                {{ comment.comment }}
              </p>
            </article>
          </div>
          <hr class="h-[1px] w-full border-none bg-[#f5f5f5]" />
          <!-- add comment -->
          <div
            @click="openNewCommentModal"
            class="flex cursor-pointer items-center gap-x-6 px-4 py-4"
          >
            <div class="flex items-center rounded-full bg-[#f0f0f1] p-2">
              <svg class="h-[24px] w-[24px]" fill="#424750" stroke-width="0">
                <use href="/images/sprite.svg#comment" />
              </svg>
            </div>
            <div class="flex items-center gap-x-5">
              <div>
                <p class="text-body-1-strong text-[#424242]">
                  دیدگاه خود را درباره این کالا بنویسید
                </p>
              </div>
              <div class="flex items-center justify-center">
                <svg class="h-[24px] w-[24px]">
                  <use
                    href="/public/images/sprite.svg#chevronLeft"
                    fill="#424750"
                  />
                </svg>
              </div>
            </div>
          </div>
          <!-- Add New Comment Modal -->
          <transition name="slide-up">
            <div
              v-if="isNewCommentModalOpen"
              id="newComment"
              class="fixed inset-0 z-20 bg-white"
            >
              <!-- head -->
              <div class="flex items-center gap-x-0.5 px-4 py-4">
                <div class="cursor-pointer" @click="closeNewCommentModal">
                  <svg
                    class="h-[24px] w-[24px]"
                    fill="#424750"
                    stroke-width="0"
                  >
                    <use href="/images/sprite.svg#arrowRight"></use>
                  </svg>
                </div>
                <span class="text-h5 mr-1 text-[#424750]">ثبت دیدگاه</span>
              </div>
              <hr class="h-1 w-full border-none bg-[#f5f5f5]" />
              <div class="flex items-center justify-start gap-x-1 px-4">
                <div class="flex h-[100px] w-[100px] items-center">
                  <img
                    :src="`/images/products/${product.images[0].image_url}.webp`"
                    alt=""
                  />
                </div>
                <div class="itemss-center flex justify-center">
                  <span class="text-body-1-strong line-clamp-1">{{
                    product.name
                  }}</span>
                </div>
              </div>
              <hr class="h-[1px] w-full border-none bg-[#f5f5f5]" />
              <form action="" class="px-4">
                <div class="flex py-2">
                  <span class="text-subtitle-strong required_badge"
                    >متن دیدگاه:</span
                  >
                </div>
                <textarea
                  v-model="commentText"
                  class="text-subtitle w-full resize-none rounded-lg border border-[#c0c2c5] p-4 focus:outline-none"
                  rows="7"
                  placeholder="نظر خود را در مورد این کالا با کاربران دیگر به اشتراک بگذارید..."
                ></textarea>
                <div
                  class="shadow-1-top fixed inset-x-0 bottom-0 z-1 w-full px-5 py-4"
                >
                  <button
                    class="text-button-1 mb-2 flex w-full items-center rounded-lg bg-[#ef4056] py-3 text-white"
                    type="submit"
                  >
                    <div class="relative flex grow items-center justify-center">
                      ثبت دیدگاه
                    </div>
                  </button>
                  <p class="text-caption text-center">
                    ثبت دیدگاه به معنی موافقت با<a class="mx-1 text-[#19bfd3]"
                      >قوانین انتشار دیجی‌کالا</a
                    >است.
                  </p>
                </div>
              </form>
            </div>
          </transition>
          <!-- See All Comments -->
          <transition name="slide-up">
            <div
              id="reviews"
              v-if="isCommentsModalOpen"
              class="fixed inset-0 z-20 bg-white"
            >
              <!-- head -->
              <div class="flex items-center gap-x-0.5 px-4 py-4">
                <div class="cursor-pointer" @click="closeCommentsModal">
                  <svg
                    class="h-[24px] w-[24px]"
                    fill="#424750"
                    stroke-width="0"
                  >
                    <use href="/images/sprite.svg#arrowRight"></use>
                  </svg>
                </div>
                <span class="text-h5 mr-1 text-[#424750]">
                  {{ toPersianDigits(product.comments.length) }} دیدگاه
                </span>
              </div>

              <hr class="h-[1px] w-full border-none bg-[#f5f5f5]" />
              <div class="no-scrollbar flex w-full flex-col overflow-y-auto">
                <div
                  v-for="(comment, index) in product.comments"
                  :key="index"
                  class="gap-y-2"
                >
                  <article
                    class="flex h-50 shrink-0 flex-col gap-y-4 rounded-lg px-4 py-5"
                  >
                    <div class="flex flex-col gap-y-2">
                      <div class="flex items-center gap-x-2">
                        <span
                          class="text-caption whitespace-nowrap text-[#a1a3a8]"
                        >
                          {{ comment.user }}
                        </span>
                        <div class="h-1 w-1 rounded-full bg-[#e0e0e2]"></div>
                        <span class="text-caption text-[#81858b]">
                          {{ formatToPersianDate(comment.created_at) }}
                        </span>
                      </div>

                      <div class="flex items-center gap-x-0.5">
                        <div v-for="n in 5 - (5 - comment.rating)">
                          <IconStarFilled
                            :stroke="2"
                            class="h-[20px] w-[20px]"
                            color="#FFC850"
                          />
                        </div>
                        <div v-for="n in 5 - comment.rating">
                          <IconStar
                            :stroke="2"
                            class="h-[20px] w-[20px]"
                            color="#A1A3A8"
                          />
                        </div>
                      </div>
                    </div>

                    <p class="text-body-1 text-[#3f4064]">
                      {{ comment.comment }}
                    </p>
                  </article>
                  <hr class="h-1 w-full border-none bg-[#f5f5f5]" />
                </div>
              </div>
            </div>
          </transition>
        </section>
      </div>
      <!-- add to cart -->
      <div id="addToCart" class="">
        <div
          class="shadow-1-top fixed inset-x-0 bottom-0 flex w-full justify-between gap-3 bg-white p-3"
        >
          <div class="flex w-1/2 items-center justify-start">
            <template v-if="!currentCartItem">
              <button
                @click="addToCart()"
                class="text-button-2 flex w-full items-center rounded-lg bg-[#ef4056] py-3 text-white"
                type="submit"
              >
                <div class="relative flex grow items-center justify-center">
                  افزودن به سبد خرید
                </div>
              </button>
            </template>
            <template v-else>
              <!-- quantity -->
              <div
                class="flex h-[48px] grow cursor-pointer items-center justify-between rounded-lg px-2"
                style="box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.12)"
              >
                <div
                  @click="
                    cart.quantityIncreament(product.public_id, selectedColor)
                  "
                  class="flex p-3"
                >
                  <svg
                    class="h-[24px] w-[24px]"
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
                  @click="cart.removeFromCart(product.public_id, selectedColor)"
                  class="flex p-3"
                >
                  <svg
                    class="h-[24px] w-[24px]"
                    fill="#ef4056"
                    stroke-width="0"
                  >
                    <use href="/images/sprite.svg#delete" />
                  </svg>
                </div>
                <div
                  v-else
                  @click="
                    cart.quantityDecreament(product.public_id, selectedColor)
                  "
                  class="flex p-3"
                >
                  <svg
                    class="h-[18px] w-[18px]"
                    fill="#ef4056"
                    stroke-width="0"
                  >
                    <use href="/public/images/sprite.svg#removeSimple" />
                  </svg>
                </div>
              </div>
            </template>
          </div>
          <div class="flex w-1/2 flex-col items-end justify-center">
            <template v-if="product.discount > 0">
              <!-- discount value -->
              <div class="flex items-center gap-1">
                <div
                  class="flex h-5 w-8 items-center justify-center rounded-full bg-[#ef4056] py-1"
                >
                  <span class="text-body-2-strong text-white">
                    {{ toPersianDigits(product.discount) }}٪</span
                  >
                </div>

                <!-- raw price value -->
                <div class="text-body-2 flex items-center text-[#c0c2c5]">
                  <span class="relative line-through">
                    {{ toPersianDigits(product.price) }}
                  </span>
                </div>
              </div>
              <!-- calculated price value -->

              <div
                class="text-h3-bold-compact flex items-center gap-1 leading-[2.1] text-[#3f4064]"
              >
                <span>{{
                  toPersianDigits(calcPrice(product.price, product.discount))
                }}</span>
                <svg width="16" height="16" fill="#424750" color="#3f4064">
                  <use xlink:href="/images/toman.svg#toman"></use>
                </svg>
              </div>
            </template>
            <template v-else>
              <div
                class="text-h3-bold-compact flex items-center justify-end gap-1 leading-[2.1] text-[#3f4064]"
              >
                <span>{{ toPersianDigits(product.price) }}</span>
                <svg width="16" height="16" fill="#424750" color="#3f4064">
                  <use xlink:href="/images/toman.svg#toman"></use>
                </svg>
              </div>
            </template>
          </div>
        </div>
      </div></div
  ></template>
  <!-- Backdrop -->
  <div v-if="showAddedToCartModal" class="backdrop"></div>
  <!-- Modal -->
  <transition name="slide-up">
    <div
      v-if="showAddedToCartModal"
      class="fixed right-0 bottom-0 left-0 z-50 rounded-t-2xl bg-white px-4 pt-2 pb-4 shadow-lg"
    >
      <div class="flex items-center justify-between py-4">
        <h3 class="text-h5 text-[#2e7b32]">این کالا به سبد خرید اضافه شد!</h3>
        <button @click="showAddedToCartModal = !showAddedToCartModal">
          <IconX class="w-6 text-[#424750]" />
        </button>
      </div>
      <hr class="h-[1px] w-full border-none bg-[#e0e0e2]" />

      <div class="flex items-center gap-4 py-4">
        <div class="h-20 w-20 overflow-hidden rounded-lg">
          <img
            :src="`/images/products/${product.images[0].image_url}.webp`"
            :alt="product.name"
            class="h-full w-full object-cover"
          />
        </div>
        <div class="flex-1">
          <p class="text-subtitle line-clamp-1">
            {{ product.name }}
          </p>
        </div>
      </div>
      <div class="flex w-full items-center">
        <button
          @click="navigateTo('/checkout/cart')"
          class="text-button-2 w-full rounded-lg bg-[#ef4056] px-4 py-2 text-white"
        >
          برو به سبد خرید
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup>
const cart = useCartStore();

const currentCartItem = computed(() => {
  return cart.items.find(
    (item) =>
      item.public_id === product.value.public_id &&
      item.selectedColor.code === selectedColor.value.code,
  );
});
const showAddedToCartModal = ref(false);

// Function to add product to cart
const addToCart = () => {
  if (product.value && selectedColor.value) {
    cart.addToCart(product.value, selectedColor.value);

    showAddedToCartModal.value = true;
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      showAddedToCartModal.value = false;
      document.body.style.overflow = "";
    }, 4000);
  }
};

import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const route = useRoute();
const router = useRouter();

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
  { immediate: true },
);

const isTechnicalReviewExpanded = ref(false);
const commentText = ref("");

const toggleTechnicalReview = () => {
  isTechnicalReviewExpanded.value = !isTechnicalReviewExpanded.value;
};

// Add scroll position tracking
let scrollPosition = 0;

// Add new Comment
const isNewCommentModalOpen = ref(false);

const openNewCommentModal = () => {
  // Store current scroll position
  scrollPosition = window.scrollY;
  isNewCommentModalOpen.value = true;
  router.push({ hash: "#newComment" });
  document.body.style.overflow = "hidden";
};

const closeNewCommentModal = () => {
  router.push({ hash: "" });
  document.body.style.overflow = "";
  isNewCommentModalOpen.value = false;
  // Restore scroll position after modal closes
  setTimeout(() => {
    window.scrollTo(0, scrollPosition);
  }, 0);
};

// All comments
const isCommentsModalOpen = ref(false);

const openCommentsModal = () => {
  // Store current scroll position
  scrollPosition = window.scrollY;
  isCommentsModalOpen.value = true;
  router.push({ hash: "#reviews" });
  document.body.style.overflow = "hidden";
};

const closeCommentsModal = () => {
  router.push({ hash: "" });
  isCommentsModalOpen.value = false;
  document.body.style.overflow = "";
  // Restore scroll position after modal closes
  setTimeout(() => {
    window.scrollTo(0, scrollPosition);
  }, 0);
};

watch(
  () => route.hash,
  (newHash) => {
    if (newHash === "#reviews") {
      if (process.client) {
        scrollPosition = window.scrollY; // Store position before opening
        isCommentsModalOpen.value = true;
        document.body.style.overflow = "hidden";
      }
    } else if (newHash === "#newComment") {
      if (process.client) {
        scrollPosition = window.scrollY; // Store position before opening
        isNewCommentModalOpen.value = true;
        document.body.style.overflow = "hidden";
      }
    } else {
      if (process.client) {
        isCommentsModalOpen.value = false;
        isNewCommentModalOpen.value = false;
        document.body.style.overflow = "";
        // Restore scroll position when hash changes
        setTimeout(() => {
          window.scrollTo(0, scrollPosition);
        }, 0);
      }
    }
  },
  { immediate: true },
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

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}

.slide-up-enter-to,
.slide-up-leave-from {
  transform: translateY(0);
}
</style>
