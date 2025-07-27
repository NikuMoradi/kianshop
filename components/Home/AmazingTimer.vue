<template>
  <client-only>
    <div class="flex items-center gap-2 text-[15px] font-bold text-white">
      <span
        class="flex h-[26px] w-[26px] items-center justify-center rounded-[4px] bg-white text-black"
      >
        {{ String(toPersianDigits(seconds)).padStart(2, "۰") }}
      </span>
      :
      <span
        class="flex h-[26px] w-[26px] items-center justify-center rounded-[4px] bg-white text-black"
      >
        {{ String(toPersianDigits(minutes)).padStart(2, "۰") }}
      </span>
      :
      <span
        class="flex h-[26px] w-[26px] items-center justify-center rounded-[4px] bg-white text-black"
      >
        {{ String(toPersianDigits(hours)).padStart(2, "۰") }}
      </span>
    </div>
  </client-only>
</template>

<script setup>
import { ref, watchEffect, onMounted, onUnmounted } from "vue";

const { data: amazingInfo } = await useAsyncData("amazingInfo", () =>
  $fetch("/api/amazingInfo"),
);

const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
let timer;

function updateCountdown() {
  if (!amazingInfo.value?.amazing_offers_timer) return;

  const target = new Date(
    amazingInfo.value.amazing_offers_timer.replace(" ", "T"),
  );
  const now = new Date();
  let diff = target - now;

  if (diff < 0) diff = 0;

  hours.value = Math.floor(diff / (1000 * 60 * 60));
  minutes.value = Math.floor((diff / (1000 * 60)) % 60);
  seconds.value = Math.floor((diff / 1000) % 60);
}

watchEffect(() => {
  updateCountdown();
});

onMounted(() => {
  timer = setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>
