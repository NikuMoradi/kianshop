<template>
  <div v-if="isOpen" class="backdrop"></div>
  <div
    v-if="isOpen"
    v-click-outside="closeModal"
    class="bg-white rounded-lg shadow-xl w-full mx-auto p-4 flex flex-col z-50 fixed bottom-0 inset-x-0 1024:inset-auto 1024:transform 1024:left-1/2 1024:top-1/2 1024:-translate-x-[50%] 1024:-translate-y-[50%] 1024:w-auto"
  >
    <!-- Header -->
    <div class="flex justify-between items-center pb-3 border-b">
      <h3 class="text-h5 text-[#0c0c0c]">{{ title }}</h3>
      <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
        <IconX class="text-[#424750] w-6" />
      </button>
    </div>

    <!-- Body -->
    <div class="py-4">
      <p class="text-body-1 text-[#3f4064]">{{ message }}</p>
    </div>

    <!-- Footer -->
    <div class="flex justify-between gap-3 pt-3">
      <button
        @click="confirmAction"
        class="flex-1 bg-[#ef4056] text-white py-2 px-4 rounded-lg text-button-2"
      >
        {{ confirmButtonText }}
      </button>
      <button
        @click="closeModal"
        class="flex-1 border-[2px] border-[#ef4056] text-[#ef4056] py-2 px-4 rounded-lg text-button-2"
      >
        {{ cancelButtonText }}
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "Confirm Action",
  },
  message: {
    type: String,
    default: "Are you sure you want to proceed?",
  },
  confirmButtonText: {
    type: String,
    default: "Confirm",
  },
  cancelButtonText: {
    type: String,
    default: "Cancel",
  },
});

const emit = defineEmits(["confirm", "cancel", "close"]);

const confirmAction = () => {
  emit("confirm");
  closeModal();
};

const closeModal = () => {
  emit("cancel");
  emit("close");
};
</script>

<style scoped></style>
