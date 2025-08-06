<template>
  <div>
    <div id="container" class="1024:hidden pt-[310px] pb-18">
      <header
        id="nav"
        class="border-complete-b fixed inset-x-0 top-0 z-10 flex w-full items-center justify-between bg-white px-2 py-1"
      >
        <div class="flex">
          <button onclick="window.location.href='/'" class="p-2">
            <IconX class="h-[22px] w-[22px]" color="#424750" />
          </button>
        </div>
        <div class="flex">
          <button onclick="window.location.href='/search'" class="p-2">
            <IconSearch color="#424750"></IconSearch>
          </button>

          <!-- Shopping cart -->
          <NuxtLink
            to="/checkout/cart"
            class="relative flex shrink-0 items-center justify-center p-2"
          >
            <div class="flex">
              <IconShoppingCart color="#424750" class="scale-x-[-1]" />
              <div
                v-if="cart.totalItems > 0"
                class="absolute right-1 bottom-2 flex h-[17px] w-[17px] items-center justify-center rounded-[6px] border-[1px] border-white bg-[var(--color-primary)] text-[12px] text-white"
              >
                {{ toPersianDigits(cart.totalItems) }}
              </div>
            </div>
          </NuxtLink>
        </div>
      </header>
      <div id="gallery" class="fixed top-12 left-0 z-1 w-full">
        <div class="flex h-screen justify-center bg-[#f0f0f1]">
          <swiper
            :modules="[Navigation, Pagination]"
            :pagination="
              product.images?.length > 1 ? { clickable: true } : false
            "
            :navigation="product.images?.length > 1"
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
                    :src="`${image?.src}`"
                    :alt="`${image?.alt}` || `${image?.name}`"
                    class="h-full w-full object-contain mix-blend-multiply"
                  />
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
      <div id="content" class="relative z-4 rounded-t-2xl bg-white">
        <section id="SPEC">
          <div class="flex items-center justify-end gap-4 px-4 pt-5">
            <ShareButton></ShareButton>
            <!-- <FavoriteButton :product-id="product.id" /> -->
          </div>
          <!-- name -->
          <div class="flex w-full flex-col justify-start gap-y-2 px-4 py-3">
            <h1 class="text-h5">
              {{ product?.name }}
            </h1>
            <div
              @click="openCommentsModal"
              class="flex max-w-max shrink-0 cursor-pointer items-center gap-x-1.5 rounded-[12rem] bg-[#f2f2f2] px-2 py-1"
            >
              <span class="text-body-2-strong text-[#424750]">
                {{ toPersianDigits(reviews.length) }} دیدگاه
              </span>
              <div class="mr-[0.5px] flex">
                <IconChevronLeft
                  size="15px"
                  stroke="3"
                  color="#424750"
                  class="relative top-[1px]"
                ></IconChevronLeft>
              </div>
            </div>
          </div>
          <hr class="h-[1px] w-full border-none bg-[#f5f5f5]" />
          <!-- colors -->
          <div v-if="variations.length > 0" class="flex flex-col gap-y-4 py-5">
            <div class="flex items-center gap-1 px-4">
              <span class="text-h5"
                >رنگ انتخاب شده:
                {{ selectedVariant?.attributes?.[0]?.option }}</span
              >
              <div
                class="h-4 w-4 rounded-full border border-[#e0e0e2]"
                :style="{
                  backgroundColor: getColorHex(
                    selectedVariant?.attributes?.[0]?.option,
                  ),
                }"
              ></div>
            </div>
            <div
              class="no-scrollbar flex w-full items-center gap-1.5 overflow-x-scroll pr-4"
            >
              <div
                v-for="v in variations"
                :key="v.id"
                :title="v.attributes[0]?.option"
                :class="{
                  '!border-[#424750]': selectedVariant?.id === v.id,
                }"
                @click="selectVariation(v)"
                class="border-complete-200 flex min-w-[48px] shrink-0 cursor-pointer items-center gap-x-1.5 rounded-lg py-1.5 pr-2 pl-3"
              >
                <div
                  class="h-5 w-5 rounded-full border border-[#e0e0e2]"
                  :style="{
                    backgroundColor: getColorHex(v.attributes[0]?.option),
                  }"
                ></div>
                <span class="text-body-1-180">{{
                  v.attributes[0]?.option
                }}</span>
              </div>
            </div>
          </div>
          <hr class="h-[1px] w-full border-none bg-[#f5f5f5]" />
          <!-- attributes -->
          <div class="flex flex-col gap-y-4 py-5">
            <div class="flex items-center justify-between px-4">
              <span class="text-h5"> مشخصات کالا</span>
            </div>
            <div
              class="no-scrollbar flex w-full items-center gap-1.5 overflow-x-scroll pr-4"
            >
              <div
                v-for="a in visibleAttributes"
                :key="a.id"
                class="border-complete-200 flex flex-col gap-y-2 rounded-lg px-4 py-2"
              >
                <div class="flex items-center justify-start">
                  <span
                    class="text-body2-strong-compact flex items-center justify-start gap-[2px] whitespace-nowrap text-[#62666d]"
                    >{{ a.name }}
                    <div class="relative top-[1px]">
                      <IconChevronLeft
                        size="12px"
                        stroke="3"
                        color="#62666d"
                      ></IconChevronLeft></div
                  ></span>
                </div>

                <span class="text-body1-strong-compact whitespace-nowrap">{{
                  a?.options[0]
                }}</span>
              </div>
            </div>
          </div>
        </section>
        <hr class="h-2 w-full border-none bg-[#f5f5f5]" />
        <section id="REVIEW">
          <div class="flex flex-col gap-y-3 px-4 py-5">
            <h2 class="text-h5-compact text-[#212121]">بررسی محصول</h2>

            <div class="flex w-full flex-col items-center gap-4">
              <p
                :class="[
                  'text-body-1',
                  { 'line-clamp-3': !isTechnicalReviewExpanded },
                ]"
              >
                {{ cleanText(product?.description) }}
              </p>
              <button
                @click="toggleTechnicalReview"
                class="text-button-2 flex items-center rounded-2xl bg-[#f5f5f5] py-2 pr-4 pl-3"
              >
                <div
                  class="text-body-2-strong flex items-center justify-center gap-2 text-[#424750]"
                >
                  {{
                    isTechnicalReviewExpanded ? "بستن" : "مشاهده ادامه بررسی "
                  }}
                  <div class="flex items-center justify-center">
                    <IconChevronDown
                      size="15px"
                      stroke="3"
                      color="#424750"
                      :class="{ 'rotate-180': isTechnicalReviewExpanded }"
                      class="relative top-[1px] transition-transform duration-300"
                    >
                    </IconChevronDown>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </section>
        <section id="COMMENTS">
          <div class="flex items-center justify-between px-4 py-3">
            <h2 class="text-h5 text-[#222732]">دیدگاه کاربرها</h2>
            <div
              @click="openCommentsModal"
              class="flex cursor-pointer items-center gap-1"
            >
              <span class="text-button-2 text-[#424242]"
                >مشاهده {{ toPersianDigits(reviews.length) }} دیدگاه</span
              >

              <IconChevronLeft
                stroke="3"
                size="14"
                color="#424750"
                class="relative top-[1px]"
              ></IconChevronLeft>
            </div>
          </div>
          <div
            class="no-scrollbar flex w-full items-center gap-2 overflow-x-auto pr-4 pb-4"
          >
            <article
              v-for="r in reviews"
              :key="r.id"
              class="border-complete-200 flex h-48 w-60 shrink-0 flex-col gap-y-2 rounded-lg p-4"
            >
              <div class="flex flex-col gap-y-1">
                <span
                  class="text-body-2-compact whitespace-nowrap text-[#424242]"
                >
                  {{ r.reviewer }}
                </span>
                <div class="flex items-center gap-x-0.5">
                  <!-- Filled Stars -->
                  <div v-for="star in r.rating" :key="'filled-' + star">
                    <IconStarFilled
                      :stroke="2"
                      class="h-[12px] w-[12px]"
                      color="#FFC850"
                    />
                  </div>

                  <!-- Empty Stars -->
                  <div v-for="star in 5 - r.rating" :key="'empty-' + star">
                    <IconStar
                      :stroke="2"
                      class="h-[12px] w-[12px]"
                      color="#A1A3A8"
                    />
                  </div>
                </div>
              </div>

              <p class="text-body-1 line-clamp-3 text-[#3f4064]">
                {{ cleanText(r.review) }}
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
              <IconMessageDots
                stroke="2"
                color="#424750"
                class="relative top-[1px]"
              ></IconMessageDots>
            </div>
            <div class="flex items-center gap-x-5">
              <div>
                <p class="text-body-1-strong text-[#424242]">
                  دیدگاه خود را درباره این کالا بنویسید
                </p>
              </div>
              <div class="flex items-center justify-center">
                <IconChevronLeft
                  stroke="3"
                  size="14px"
                  color="#424750"
                  class="relative top-[1px]"
                ></IconChevronLeft>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div id="addToCart" class="">
        <div
          class="shadow-1-top fixed inset-x-0 bottom-0 z-10 flex w-full justify-between gap-3 bg-white p-3"
        >
          <div class="flex w-1/2 items-center justify-start">
            <template v-if="!currentCartItem">
              <button
                @click="addToCart()"
                class="text-button-2 flex w-full items-center rounded-lg bg-[var(--color-primary)] py-3 text-white"
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
                  @click="cart.quantityIncreament(selectedProduct)"
                  class="flex p-3"
                >
                  <IconPlus
                    stroke="3"
                    color="var(--color-primary)"
                    class="relative top-[1px]"
                  ></IconPlus>
                </div>
                <span class="text-h4 text-[var(--color-primary)]">
                  {{ toPersianDigits(currentCartItem?.quantity) }}
                </span>
                <div
                  v-if="currentCartItem?.quantity < 2"
                  @click="cart.removeFromCart(selectedProduct)"
                  class="flex p-3"
                >
                  <IconTrash
                    stroke="2"
                    color="var(--color-primary)"
                    class="relative top-[1px]"
                  ></IconTrash>
                </div>
                <div
                  v-else
                  @click="cart.quantityDecreament(selectedProduct)"
                  class="flex p-3"
                >
                  <IconMinus
                    stroke="3"
                    color="var(--color-primary)"
                    class="relative top-[1px]"
                  ></IconMinus>
                </div>
              </div>
            </template>
          </div>
          <div class="flex w-1/2 flex-col items-end justify-center">
            <template v-if="selectedProduct?.sale_price > 0">
              <!-- discount  value -->
              <div class="flex items-center gap-1">
                <div
                  class="flex h-5 w-8 items-center justify-center rounded-full bg-[var(--color-primary)] py-1"
                >
                  <span class="text-body-2-strong text-white">
                    {{
                      toPersianDigits(selectedProduct.discount_percentage)
                    }}٪</span
                  >
                </div>

                <!-- regular price value -->
                <div class="text-body-2 flex items-center text-[#c0c2c5]">
                  <span class="relative line-through">
                    {{ toPersianDigits(selectedProduct?.regular_price) }}
                  </span>
                </div>
              </div>
              <!-- sale price value -->

              <div
                class="text-h3-bold-compact flex items-center gap-1 leading-[2.1] text-[#3f4064]"
              >
                <span>{{ toPersianDigits(selectedProduct?.sale_price) }}</span>
                <svg width="16" height="16" fill="#424750" color="#3f4064">
                  <use href="/images/toman.svg#toman"></use>
                </svg>
              </div>
            </template>
            <template v-else>
              <div
                class="text-h3-bold-compact flex items-center justify-end gap-1 leading-[2.1] text-[#3f4064]"
              >
                <span>{{
                  toPersianDigits(selectedProduct?.regular_price)
                }}</span>
                <svg width="16" height="16" fill="#424750" color="#3f4064">
                  <use href="/images/toman.svg#toman"></use>
                </svg>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <ProductReviews
      :reviews="reviews"
      :is-open="isCommentsModalOpen"
      @close="closeCommentsModal"
    />
    <!-- SubmitReview Component -->
    <SubmitReview
      :product="product"
      :is-open="isNewCommentModalOpen"
      @close="closeNewCommentModal"
    />

    <!-- BaseToast for sign in message -->
    <BaseToast
      :is-visible="showSignInFirst"
      message="ابتدا وارد حساب کاربری خود شوید"
      @close="showSignInFirst = false"
    />
  </div>
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
            :src="
              selectedProduct.image?.src ||
              selectedProduct?.images?.[0]?.src ||
              ''
            "
            :alt="
              selectedProduct.image?.alt ||
              selectedProduct?.images?.[0]?.alt ||
              selectedProduct?.name ||
              ''
            "
            class="h-full w-full object-cover"
          />
        </div>
        <div class="flex-1">
          <p class="text-subtitle line-clamp-1">
            {{ selectedProduct.product_name }}
          </p>
        </div>
      </div>
      <div class="flex w-full items-center">
        <button
          @click="navigateTo('/checkout/cart')"
          class="text-button-2 w-full rounded-lg bg-[var(--color-primary)] px-4 py-2 text-white"
        >
          برو به سبد خرید
        </button>
      </div>
    </div>
  </transition>
</template>
<script setup>
import {
  IconShoppingCart,
  IconSearch,
  IconX,
  IconChevronLeft,
  IconChevronDown,
  IconMessageDots,
  IconPlus,
  IconMinus,
  IconTrash,
  IconStarFilled,
  IconStar,
} from "@tabler/icons-vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const route = useRoute();
const router = useRouter();

const {
  data: productData,
  pending: productPending,
  error: productError,
} = await useAsyncData(`productData-${route.params.id}`, () =>
  $fetch(`/api/productDetails/${route.params.id}`, {}),
);
const product = computed(() => productData.value?.product || {});
const variations = computed(() => productData.value?.variations || []);
const selectedVariant = ref(null);

function selectVariation(variation) {
  selectedVariant.value = variation;
}
const selectedProduct = computed(() => {
  return productData.value?.variations?.length > 0
    ? selectedVariant.value
    : product.value;
});

watch(
  variations,
  (newVal) => {
    if (newVal?.length > 0) {
      selectedVariant.value = newVal[0];
    }
  },
  { immediate: true },
);
const visibleAttributes = computed(() =>
  product.value.attributes.filter((attr) => attr.visible),
);

const isTechnicalReviewExpanded = ref(false);

const toggleTechnicalReview = () => {
  isTechnicalReviewExpanded.value = !isTechnicalReviewExpanded.value;
};

//New Comment
let scrollPosition = 0;
const isNewCommentModalOpen = ref(false);
const showSignInFirst = ref(false);
const auth = useAuthStore();
const openNewCommentModal = async () => {
  if (!auth.isLoggedIn) {
    showSignInFirst.value = true;
    setTimeout(() => {
      showSignInFirst.value = false;
    }, 3000);
    return;
  }
  scrollPosition = window.scrollY;
  isNewCommentModalOpen.value = true;
  router.push({ hash: "#newComment" });
  document.body.style.overflow = "hidden";
};

const closeNewCommentModal = () => {
  router.replace({ hash: "" });
  document.body.style.overflow = "";
  isNewCommentModalOpen.value = false;
  // Restore scroll position after modal closes
  setTimeout(() => {
    window.scrollTo(0, scrollPosition);
  }, 0);
};

// All comments

const {
  data: reviewsData,
  pending: reviewsPending,
  error: reviewsError,
} = await useAsyncData(`productReviews-${route.params.id}`, () =>
  $fetch(`/api/productReviews?p_id=${route.params.id}`),
);
const reviews = computed(() => reviewsData.value?.reviews || []);
const isCommentsModalOpen = ref(false);
const openCommentsModal = () => {
  scrollPosition = window.scrollY;
  isCommentsModalOpen.value = true;
  router.push({ hash: "#reviews" });
  document.body.style.overflow = "hidden";
};

const closeCommentsModal = () => {
  router.replace({ hash: "" });
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
// Cart functionality
const cart = useCartStore();
const currentCartItem = computed(() => {
  return cart.items.find((item) => item.id === selectedProduct.value?.id);
});
const showAddedToCartModal = ref(false);

// Function to add product to cart
const addToCart = () => {
  if (selectedProduct.value) {
    cart.addToCart(selectedProduct.value);
    showAddedToCartModal.value = true;
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      showAddedToCartModal.value = false;
      document.body.style.overflow = "";
    }, 4000);
  }
};
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
  height: 20px;
  width: fit-content; /* This will let it grow as needed! */

  display: flex;
  align-items: center;
  position: absolute;
  left: 10px;
  overflow-x: auto;
  scrollbar-width: none;
}
:deep(.swiper-pagination-bullet) {
  width: 7px;
  height: 7px;
  border-radius: 15px;
  background-color: #fffcfc;
  flex-shrink: 0;
}

:deep(.swiper-pagination-bullet-active) {
  background-color: #fff;
  width: 16px;
}
</style>
