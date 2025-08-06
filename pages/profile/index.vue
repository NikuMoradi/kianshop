<template>
  <div
    v-if="$viewport.isGreaterOrEquals('laptop')"
    class="1024:border 1024:border-[#e0e0e2] 1024:rounded-lg px-4"
  >
    <div class="flex items-center py-3">
      <div class="relative">
        <p class="text-h5 text-[#0c0c0c]">سفارش‌های من</p>
        <div
          class="absolute top-10 h-[2px] w-[80%] bg-[var(--color-primary)]"
        ></div>
      </div>
    </div>
    <!-- orders -->
    <div class="my-7 grid grid-cols-3 gap-3">
      <a href="" class="flex flex-col items-center">
        <div class="relative flex items-center justify-center">
          <img src="/public/images/status-processing.svg" alt="" />
          <div
            class="text-caption-strong absolute bottom-0 left-0 flex h-5 w-5 items-center justify-center rounded-sm bg-[#f2f2f2] text-[#3f4064]"
          >
            {{ toPersianDigits(1) }}
          </div>
        </div>
        <span class="text-body-2-strong">جاری</span>
      </a>

      <a
        href=""
        class="flex flex-col items-center border-r border-l border-[#f0f0f1]"
      >
        <div class="relative flex items-center justify-center">
          <img src="/public/images/status-delivered.svg" alt="" />
          <div
            class="text-caption-strong absolute bottom-0 left-0 flex h-5 w-5 items-center justify-center rounded-sm bg-[#f2f2f2] text-[#3f4064]"
          >
            {{ toPersianDigits(25) }}
          </div>
        </div>
        <span class="text-body-2-strong">تحویل شده</span>
      </a>
      <a href="" class="flex flex-col items-center">
        <div class="relative flex items-center justify-center">
          <img src="/public/images/status-returned.svg" alt="" />
          <div
            class="text-caption-strong absolute bottom-0 left-0 flex h-5 w-5 items-center justify-center rounded-sm bg-[#f2f2f2] text-[#3f4064]"
          >
            {{ toPersianDigits(0) }}
          </div>
        </div>
        <span class="text-body-2-strong">مرجوع شده</span>
      </a>
    </div>
  </div>
  <ProfileMenu v-else></ProfileMenu>
</template>

<script setup>
definePageMeta({
  layout: "profile",
});
</script>
