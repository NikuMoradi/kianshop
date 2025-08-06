<template>
  <transition name="slide-up">
    <div id="reviews" v-if="isOpen" class="fixed inset-0 z-50 bg-white pt-13.5">
      <!-- head -->
      <div
        class="fixed inset-x-0 top-0 flex items-center gap-x-0.5 border-b border-[#f5f5f5] px-4 py-3"
      >
        <div class="cursor-pointer" @click="$emit('close')">
          <IconArrowRight color="#424750"></IconArrowRight>
        </div>
        <span class="text-h5 mr-1 text-[#424750]">
          {{ toPersianDigits(reviews?.length) }} دیدگاه
        </span>
      </div>

      <div class="no-scrollbar flex h-full w-full flex-col overflow-y-auto">
        <div v-for="r in reviews" :key="r.id" class="gap-y-2">
          <article
            class="flex h-auto shrink-0 flex-col gap-y-4 rounded-lg px-4 py-5"
          >
            <div class="flex flex-col gap-y-2">
              <div class="flex items-center gap-x-2">
                <span class="text-caption whitespace-nowrap text-[#a1a3a8]">
                  {{ r.reviewer }}
                </span>
                <div class="h-1 w-1 rounded-full bg-[#e0e0e2]"></div>
                <span class="text-caption text-[#81858b]">
                  {{ toPersianDate(r.date_created) }}
                </span>
              </div>

              <div class="flex items-center gap-x-0.5">
                <div v-for="star in 5 - (5 - r.rating)" :key="'filled-' + star">
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
          <hr class="h-1 w-full border-none bg-[#f5f5f5]" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { IconArrowRight, IconStar, IconStarFilled } from "@tabler/icons-vue";
const props = defineProps({
  reviews: {
    type: Object,
    required: true,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["close"]);
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
