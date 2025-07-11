<template>
  <transition name="fade">
    <div
      v-if="isVisible"
      class="fixed bottom-20 left-1/2 -translate-x-1/2 py-4 px-3 rounded-md text-white bg-black text-body-1 animate-fade z-50"
    >
      <div class="flex items-center justify-start whitespace-nowrap">
        <div class="ml-4">{{ message }}</div>
        <button @click="close" class="text-[#19bfd3]">باشه</button>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["close"]);
const close = () => {
  emit("close");
};
</script>
<!-- <BaseToast
:is-visible="showLoginStatus"
message="شما از حساب کاربری خود خارج شدید."
@close="showLoginStatus = false"
/> -->
