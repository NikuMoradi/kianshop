<template>
  <Header />

  <!-- <Breadcrumb></Breadcrumb> -->
  <div
    v-if="productPending"
    class="flex min-h-[100dvh] items-center justify-center"
  >
    <Loader />
  </div>
  <template v-else-if="product">
    <div id="container" class="container-4xl flex-col px-5 pt-[184px]">
      <div class="mt-10 flex pb-5">
        <!-- right need shrink -->
        <div class="ml-2 flex w-[36%] flex-col items-start">
          <!-- gallery -->
          <div class="flex gap-2">
            <div class="flex flex-col items-center justify-start gap-4">
              <!-- <FavoriteButton :product-id="product.id" /> -->
              <ShareButton />
            </div>
            <div
              class="w-[90%]items-center flex aspect-[1/1] h-[90%] justify-center"
            >
              <img
                :src="`${product.images[0]?.src}`"
                :alt="`${product.images[0]?.alt}`"
                class="h-full w-full rounded-2xl object-contain mix-blend-multiply"
                placeholder="blur"
              />
            </div>
          </div>
          <div class="flex w-full grow gap-2 py-5">
            <div
              v-for="image in product.images"
              class="border-complete-200 flex h-24 w-24 shrink-0 items-center justify-center rounded-lg"
            >
              <img
                :src="`${image?.src}`"
                :alt="`${image?.alt}` || `${image?.name}`"
                class="h-full w-full object-contain mix-blend-multiply"
              />
            </div>
          </div>
        </div>
        <!-- left -->
        <div class="flex grow flex-col">
          <!-- name -->
          <div class="flex w-full flex-col justify-start py-3">
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
                class="flex max-w-max shrink-0 cursor-pointer items-center gap-x-1.5 rounded-[12rem] bg-[#f2f2f2] px-2 py-1"
              >
                <span class="text-body-2-strong text-[#424750]">
                  {{ toPersianDigits(reviews.length) }} دیدگاه
                </span>
                <div class="mr-[0.5px] flex">
                  <IconChevronLeft
                    size="15px"
                    color="#424750"
                    class="relative top-[1px]"
                  ></IconChevronLeft>
                </div>
              </div>
              <!-- colors -->
              <div
                v-if="variations.length > 0"
                class="flex flex-col gap-y-4 py-5"
              >
                <div class="grow">
                  <span class="text-h5"
                    >رنگ: {{ selectedVariant?.attributes?.[0]?.option }}</span
                  >
                </div>
                <div class="flex w-full items-center gap-1.5">
                  <div
                    v-for="v in variations"
                    :key="v.id"
                    :title="v.attributes[0]?.option"
                    class="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-gray-300"
                    :class="{
                      'border-none bg-[#19bfd3]': selectedVariant?.id === v.id,
                    }"
                    @click="selectVariation(v)"
                  >
                    <div
                      class="flex items-center justify-center rounded-full border border-white"
                    >
                      <div
                        class="h-7 w-7 rounded-full border"
                        :style="{
                          backgroundColor: getColorHex(v.attributes[0]?.option),
                        }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- attributes -->
              <div class="mt-5 flex flex-col gap-y-4">
                <div class="grow py-3">
                  <span class="text-h5">ویژگی ها</span>
                </div>
                <div class="grid w-full grid-cols-3 gap-2">
                  <div
                    v-for="a in visibleAttributes"
                    :key="a.id"
                    class="flex flex-col rounded-lg bg-[#f0f0f1] p-2"
                  >
                    <div class="flex items-center justify-start">
                      <span
                        class="text-body-2 custom-ellipsis flex items-center justify-start text-[#81858b]"
                        >{{ a.name }}
                      </span>
                    </div>

                    <span class="text-body-2-strong custom-ellipsis">{{
                      a?.options[0]
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- add to cart -->
            <div
              class="border-complete-200 flex flex-col justify-between rounded-lg bg-[#F7F7F7] px-4 py-4"
            >
              <div>
                <div class="flex items-center gap-4 py-3">
                  <svg
                    class="h-[24px] w-[24px]"
                    fill="#424750"
                    stroke-width="0"
                  >
                    <use href="/images/sprite.svg#guarantee" />
                  </svg>
                  <p class="text-button-2 text-[#424750]">
                    گارانتی اصالت و سلامت فیزیکی کالا
                  </p>
                </div>

                <hr class="h-[1px] w-full border-none bg-[#e0e0e2]" />

                <div class="flex items-center gap-4 py-3">
                  <svg
                    class="mr-1 h-[20px] w-[20px]"
                    fill="#19bfd3"
                    stroke-width="0"
                  >
                    <use href="/images/sprite.svg#deliveryExpress" />
                  </svg>
                  <p class="text-button-2 text-[#424750]">
                    ارسال از ۳ روز کاری دیگر
                  </p>
                </div>
              </div>
              <div class="flex w-full flex-col gap-2 py-4">
                <div>
                  <template v-if="selectedProduct?.sale_price > 0">
                    <!-- discount value -->
                    <div class="flex items-center justify-end gap-1">
                      <div
                        class="flex h-5 w-8 items-center justify-center rounded-full bg-[var(--color-primary)] py-1"
                      >
                        <span class="text-body-2-strong text-white">
                          {{
                            toPersianDigits(
                              selectedProduct.discount_percentage,
                            )
                          }}٪</span
                        >
                      </div>

                      <!-- raw price value -->
                      <div class="text-body-2 flex items-center text-[#c0c2c5]">
                        <span class="relative line-through">
                          {{ toPersianDigits(selectedProduct?.regular_price) }}
                        </span>
                      </div>
                    </div>
                    <!-- calculated price value -->

                    <div
                      class="text-h3-bold-compact flex items-center justify-end gap-1 leading-[2.1] text-[#3f4064]"
                    >
                      <span>{{
                        toPersianDigits(selectedProduct?.sale_price)
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
                  </template>
                  <template v-else>
                    <div
                      class="text-h3-bold-compact flex items-center justify-end gap-1 leading-[2.1] text-[#3f4064]"
                    >
                      <span>{{
                        toPersianDigits(selectedProduct?.regular_price)
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
                  </template>
                </div>
                <!-- button and quantity -->
                <div class="flex w-full items-center justify-center py-4">
                  <template v-if="!currentCartItem">
                    <button
                      @click="addToCart()"
                      class="text-button-2 flex grow rounded-lg bg-[var(--color-primary)] py-3 text-white"
                      type="submit"
                    >
                      <div
                        class="relative flex grow items-center justify-center"
                      >
                        افزودن به سبد خرید
                      </div>
                    </button>
                  </template>
                  <template v-else>
                    <!-- quantity -->
                    <div
                      class="flex h-[42px] w-1/2 grow cursor-pointer items-center justify-between rounded-lg"
                      style="box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.12)"
                    >
                      <div
                        @click="cart.quantityIncreament(selectedProduct)"
                        class="flex p-3"
                      >
                        <IconPlus
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
                          size="18px"
                          color="var(--color-primary)"
                          class="relative top-[1px]"
                        ></IconMinus>
                      </div>
                    </div>
                    <div class="mr-4 flex w-1/2 flex-col">
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
        <hr class="h-[1px] w-full border-none bg-[#f5f5f5]" />

        <div class="flex flex-col gap-y-3 py-5">
          <h2 class="text-h5-compact text-[#212121]">بررسی محصول</h2>

          <div class="flex w-full flex-col items-center gap-4">
            <p class="text-body-1 text-[#23254e]">
              {{ cleanText(product?.description) }}
            </p>
          </div>
        </div>
        <!-- reviews section -->
        <hr class="h-1 w-full border-none bg-[#f5f5f5]" />

        <div class="py-6">
          <div class="flex items-center justify-start">
            <p class="text-h5 grow">امتیاز و دیدگاه کاربران</p>
          </div>
          <div class="mt-2 h-[2px] w-[70px] bg-[var(--color-primary)]"></div>
        </div>

        <div class="flex">
          <!-- rating -->
          <div class="ml-12 min-w-[260px]">
            <div class="mt-2 flex items-center justify-start">
              <p class="ml-1 text-[26px]">
                {{ toPersianDigits(averageRating) }}
              </p>
              <p class="text-[12px]">از {{ toPersianDigits(5) }}</p>
            </div>
            <div class="flex gap-3 py-3">
              <div class="flex items-center gap-x-0.5">
                <div v-for="n in 5 - (5 - Math.round(averageRating))">
                  <IconStarFilled
                    :stroke="2"
                    class="h-[20px] w-[20px]"
                    color="#FFC850"
                  />
                </div>
                <div v-for="n in 5 - Math.round(averageRating)">
                  <IconStar
                    :stroke="2"
                    class="h-[20px] w-[20px]"
                    color="#A1A3A8"
                  />
                </div>
              </div>
              <p class="text-[10px] text-[#a1a3a8]">
                از مجموع {{ toPersianDigits(reviews.length * 5) }} امتیاز
              </p>
            </div>
            <p class="text-caption py-3 text-[#3f4064]">
              شما هم درباره این کالا دیدگاه ثبت کنید
            </p>
            <button
              @click="openNewCommentModal"
              class="text-button-2 mb-2 flex w-full items-center rounded-lg border border-[var(--color-primary)] py-1.5 text-[var(--color-primary)]"
              type="submit"
            >
              <div class="relative flex grow items-center justify-center">
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

          <!-- comments -->
          <div class="flex-1" id="reviews">
            <div class="no-scrollbar flex w-full flex-col overflow-y-auto">
              <div v-for="r in reviews" :key="r.id" class="gap-y-2">
                <article
                  class="flex h-[150px] shrink-0 flex-col gap-y-4 rounded-lg px-4 py-5"
                >
                  <div class="flex flex-col gap-y-2">
                    <div class="flex items-center gap-x-2">
                      <span
                        class="text-caption whitespace-nowrap text-[#a1a3a8]"
                      >
                        {{ r.reviewer }}
                      </span>
                      <div class="h-1 w-1 rounded-full bg-[#e0e0e2]"></div>
                      <span class="text-caption text-[#81858b]">
                        {{ toPersianDate(r.date_created) }}
                      </span>
                    </div>

                    <div class="flex items-center gap-x-0.5">
                      <div
                        v-for="star in 5 - (5 - r.rating)"
                        :key="'filled-' + star"
                      >
                        <IconStarFilled
                          :stroke="2"
                          class="h-[20px] w-[20px]"
                          color="#FFC850"
                        />
                      </div>
                      <div v-for="star in 5 - r.rating" :key="'empty-' + star">
                        <IconStar
                          :stroke="2"
                          class="h-[20px] w-[20px]"
                          color="#A1A3A8"
                        />
                      </div>
                    </div>
                  </div>

                  <p class="text-body-1 text-[#3f4064]">
                    {{ cleanText(r.review) }}
                  </p>
                </article>
                <hr class="h-[1px] w-full border-none bg-[#f5f5f5]" />
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
import {
  IconChevronLeft,
  IconPlus,
  IconMinus,
  IconTrash,
  IconStarFilled,
  IconStar,
} from "@tabler/icons-vue";
//product details
const route = useRoute();
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

// Cart functionality
const cart = useCartStore();
const currentCartItem = computed(() => {
  return cart.items.find((item) => item.id === selectedProduct.value?.id);
});
const showAddedToCartModal = ref(false);

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

// Add new Comment
const auth = useAuthStore();
const showSignInFirst = ref(false);
const isNewCommentModalOpen = ref(false);

const openNewCommentModal = () => {
  if (!auth.isLoggedIn) {
    showSignInFirst.value = true;
    setTimeout(() => {
      showSignInFirst.value = false;
    }, 3000);
    return;
  }
  isNewCommentModalOpen.value = true;
  document.body.style.overflow = "hidden";
};

const closeNewCommentModal = () => {
  document.body.style.overflow = "";
  isNewCommentModalOpen.value = false;
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

const averageRating = computed(() => {
  if (!reviews.value.length) return 0;

  const total = reviews.value.reduce((sum, r) => sum + (r.rating || 0), 0);
  return (total / reviews.value.length).toFixed(1);
});

const scrollToReviews = () => {
  const reviewsEl = document.getElementById("reviews");
  reviewsEl.scrollIntoView({ behavior: "smooth" });
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
