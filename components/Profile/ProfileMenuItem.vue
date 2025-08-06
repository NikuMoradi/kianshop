<template>
  <NuxtLink
    :to="to"
    class="flex items-center justify-between 1024:hover:bg-[#f5f5f5] 1024:px-4"
  >
    <div
      class="flex items-center justify-between w-full"
      :class="{ 'border-b border-[#f0f0f1]': !isLast }"
    >
      <div class="flex items-center py-4">
        <div class="flex ml-4">
          <svg class="w-[24px] h-[24px]" stroke-width="0">
            <use :href="`/images/sprite.svg#${icon}`" />
          </svg>
        </div>
        <div class="flex items-center justify-center">
          <p class="text-body-1-strong text-[#3f4064]">{{ label }}</p>
        </div>
      </div>
      <div class="flex 1024:hidden">
        <svg class="w-[24px] h-[24px]" fill="#a1a3a8" stroke-width="0">
          <use href="/images/sprite.svg#chevronLeft" />
        </svg>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  to: {
    type: String,
    required: false,
  },
  icon: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  isLast: {
    type: Boolean,
    default: false,
  },
});
</script>
