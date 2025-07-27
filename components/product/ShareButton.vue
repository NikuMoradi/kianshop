<template>
  <div class="flex cursor-pointer" @click="copyToClipboard">
    <svg class="w-[24px] h-[24px]" fill="#424750" stroke-width="0">
      <use :href="'/images/sprite.svg#share'" />
    </svg>
  </div>
  <transition name="fade">
    <div
      v-if="showCopied"
      class="fixed bottom-20 left-1/2 -translate-x-1/2 py-4 px-3 rounded-md text-white bg-black text-body-1 animate-fade"
    >
      <div class="flex items-center justify-start whitespace-nowrap">
        <div class="ml-4">لینک صفحه با موفقیت کپی شد.</div>
        <button @click="showCopied = !showCopied" class="text-[#19bfd3]">
          باشه
        </button>
      </div>
    </div></transition
  >
</template>

<script setup>
// share link
const showCopied = ref(false);

function copyToClipboard() {
  const url = window.location.href;

  navigator.clipboard.writeText(url).then(() => {
    showCopied.value = true;

    setTimeout(() => {
      showCopied.value = false;
    }, 3000);
  });
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
