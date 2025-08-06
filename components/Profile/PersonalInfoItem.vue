<template>
  <div
    class="1024:px-4 1024:py-[17px] flex items-center justify-between border-b border-[#f0f0f1] py-3"
  >
    <div class="flex flex-col">
      <div class="flex items-center gap-2">
        <p class="text-body-1 text-[#81858b]">{{ label }}</p>
      </div>
      <p class="text-subtitle-strong mt-1 text-[#3f4064]">
        {{ value }}
      </p>
    </div>
    <div
      v-if="$viewport.isGreaterOrEquals('laptop')"
      class="flex cursor-pointer"
    >
      <svg class="h-[24px] w-[24px]" fill="#3f4064" stroke-width="0">
        <use href="/images/sprite.svg#edit" />
      </svg>
    </div>
    <div v-else class="flex cursor-pointer">
      <svg class="h-[24px] w-[24px]" fill="#a1a3a8" stroke-width="0">
        <use href="/images/sprite.svg#chevronLeft" />
      </svg>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number, Object],
    required: false,
  },
});
</script>
