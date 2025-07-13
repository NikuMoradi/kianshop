<template>
  <div
    class="360:text-[15px] flex items-center gap-[2px] text-[10px] font-bold"
  >
    <div
      class="360:w-[26px] 360:h-[26px] flex h-[20px] w-[20px] items-center justify-center rounded-[4px] bg-white"
    >
      {{ String(toPersianDigits(seconds)).padStart(2, "۰") }}
    </div>
    <div class="w-1 text-white">:</div>
    <div
      class="360:w-[26px] 360:h-[26px] flex h-[20px] w-[20px] items-center justify-center rounded-[4px] bg-white"
    >
      {{ String(toPersianDigits(minutes)).padStart(2, "۰") }}
    </div>
    <div class="w-1 text-white">:</div>
    <div
      class="360:w-[26px] 360:h-[26px] flex h-[20px] w-[20px] items-center justify-center rounded-[4px] bg-white"
    >
      {{ String(toPersianDigits(hours)).padStart(2, "۰") }}
    </div>
  </div>
</template>

<script setup>
const { data: amazingInfo } = await useAsyncData("amazingInfo", () =>
  $fetch("/api/amazingInfo"),
);

// Countdown Timer
let hours = ref();
let minutes = ref();
let seconds = ref();
let timer;

watchEffect(() => {
  if (amazingInfo.value && amazingInfo.value.amazing_offers_timer) {
    const [h, m, s] = amazingInfo.value.amazing_offers_timer
      .split(":")
      .map(Number);
    hours.value = h;
    minutes.value = m;
    seconds.value = s;
  }
});
const startCountdown = () => {
  timer = setInterval(() => {
    if (seconds.value > 0) {
      seconds.value--;
    } else if (minutes.value > 0) {
      minutes.value--;
      seconds.value = 59;
    } else if (hours.value > 0) {
      hours.value--;
      minutes.value = 59;
      seconds.value = 59;
    } else {
      clearInterval(timer);
    }
  }, 1000);
};

onMounted(() => {
  startCountdown();
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style lang="scss" scoped></style>
