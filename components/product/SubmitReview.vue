<template>
  <ClientOnly>
    <transition name="slide-up">
      <div
        v-if="isOpen"
        id="newComment"
        class="fixed inset-0 z-50 h-full bg-white pt-13.5 pb-26"
      >
        <!-- head -->
        <div
          class="fixed inset-x-0 top-0 flex items-center gap-x-0.5 border-b border-[#f5f5f5] bg-white px-4 py-3"
        >
          <div class="cursor-pointer" @click="$emit('close')">
            <IconArrowRight color="#424750"></IconArrowRight>
          </div>
          <span class="text-h5 mr-1 text-[#424750]">ثبت دیدگاه</span>
        </div>
        <div class="h-full overflow-y-auto">
          <div class="flex items-center justify-start gap-x-1 px-4">
            <div class="flex h-[100px] w-[100px] items-center">
              <img
                :src="`${product.images[0]?.src}`"
                :alt="`${product.images[0]?.alt}`"
              />
            </div>
            <div class="itemss-center flex justify-center">
              <span class="text-body-1-strong line-clamp-1">{{
                product.name
              }}</span>
            </div>
          </div>
          <hr class="h-[1px] w-full border-none bg-[#f5f5f5]" />
          <form @submit.prevent="submitComment" class="px-4">
            <!-- Star Rating Section -->
            <div class="mb-6">
              <div class="flex py-2">
                <span class="text-subtitle-strong required_badge"
                  >امتیاز شما:</span
                >
              </div>
              <div class="flex items-center gap-2">
                <div class="flex items-center gap-1">
                  <div
                    v-for="star in 5"
                    :key="star"
                    class="transform cursor-pointer transition-all duration-200 hover:scale-110"
                    @click="rating = star"
                    @mouseenter="hoveredRating = star"
                    @mouseleave="hoveredRating = 0"
                  >
                    <IconStar
                      :class="[
                        'h-8 w-8 drop-shadow-sm transition-all duration-200',
                        star <= (hoveredRating || rating)
                          ? 'fill-current text-yellow-400 drop-shadow-md'
                          : 'text-gray-300 hover:text-yellow-200',
                      ]"
                      :stroke="star <= (hoveredRating || rating) ? 0 : 2"
                    />
                  </div>
                </div>
                <span class="text-body-1 mr-2 text-gray-600">
                  {{ rating > 0 ? `${rating} از 5` : "امتیاز دهید" }}
                </span>
              </div>
              <div class="mt-2 text-xs text-gray-500">
                <span v-if="rating === 1">خیلی بد</span>
                <span v-else-if="rating === 2">بد</span>
                <span v-else-if="rating === 3">متوسط</span>
                <span v-else-if="rating === 4">خوب</span>
                <span v-else-if="rating === 5">عالی</span>
                <span v-else>امتیاز خود را انتخاب کنید</span>
              </div>
            </div>

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
              :disabled="isSubmitting"
            ></textarea>
            <div
              class="shadow-1-top fixed inset-x-0 bottom-0 z-1 w-full bg-white px-5 py-4"
            >
              <button
                class="text-button-1 mb-2 flex w-full items-center rounded-lg bg-[var(--color-primary)] py-3 text-white disabled:opacity-50"
                type="submit"
                :disabled="isSubmitting || rating === 0 || !commentText"
              >
                <div class="relative flex grow items-center justify-center">
                  <span v-if="isSubmitting">در حال ارسال...</span>
                  <span v-else>ثبت دیدگاه</span>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>

    <!-- BaseToast outside modal -->
    <BaseToast
      :is-visible="showSuccesComment"
      message="دیدگاه شما ثبت شد و در انتظار تایید است!"
      @close="showSuccesComment = false"
    />
  </ClientOnly>
</template>
<script setup>
import { IconArrowRight, IconStar } from "@tabler/icons-vue";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close", "success"]);

const route = useRoute();

// Form state
const commentText = ref("");
const isSubmitting = ref(false);
const rating = ref(0);
const hoveredRating = ref(0);

// Success state
const showSuccesComment = ref(false);
let succesCommentTimer = ref();

// Submit comment function
const submitComment = async () => {
  if (!commentText.value.trim() || rating.value === 0) {
    return;
  }

  isSubmitting.value = true;

  try {
    const response = await $fetch("/api/submitReview", {
      method: "POST",
      body: {
        p_id: route.params.id,
        review: commentText.value.trim(),
        rating: rating.value,
      },
    });

    // Show success message
    showSuccesComment.value = true;

    // Clear any existing timer
    if (succesCommentTimer) {
      clearTimeout(succesCommentTimer);
    }

    succesCommentTimer = setTimeout(() => {
      showSuccesComment.value = false;
    }, 3000);

    // Clear form and close modal
    commentText.value = "";
    rating.value = 0;
    hoveredRating.value = 0;
    emit("close");
  } catch (error) {
    console.error("Failed to submit comment:", error);
  } finally {
    isSubmitting.value = false;
  }
};

// Cleanup timer on component unmount
onUnmounted(() => {
  if (succesCommentTimer) {
    clearTimeout(succesCommentTimer);
  }
});

// Watch for modal close to reset form
watch(
  () => props.isOpen,
  (newVal) => {
    if (!newVal) {
      // Reset form when modal closes
      commentText.value = "";
      rating.value = 0;
      hoveredRating.value = 0;
    }
  },
);
</script>

<style scoped>
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
