<template>
  <div>
    <!-- Backdrop -->
    <div
      v-if="isOpen"
      @click="$emit('close')"
      class="backdrop fixed inset-0 bg-black bg-opacity-10 z-40"
    ></div>
    <!-- Popup -->
    <transition name="slide-up">
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-white flex flex-col z-50 1024:absolute 1024:inset-auto 1024:w-[460px] 1024:max-h-[80vh] 1024:top-1/2 1024:left-1/2 1024:transform 1024:-translate-x-1/2 1024:-translate-y-1/2 1024:rounded-lg"
      >
        <div class="h-full">
          <!-- header -->
          <div class="px-5">
            <div class="flex justify-between items-center py-3">
              <p class="text-h5 text-[#0c0c0c]">ویرایش پست الکترونیکی</p>
              <button class="" @click="$emit('close')">
                <IconX class="text-[#424750]" size="22" />
              </button>
            </div>
            <hr class="w-full bg-[#e0e0e2] border-none h-[1px]" />
          </div>
          <!-- body -->
          <div class="flex flex-col px-5 py-4">
            <form @submit.prevent="submitForm" class="h-full 1024:min-h-[20vh]">
              <input
                type="email"
                v-model="email"
                dir="ltr"
                class="w-full rounded-lg px-3 py-3 text-right text-subtitle outline-none bg-[#F0F0F1] transition-colors border-b-[2px] border-transparent focus:border-[#19bfd3]"
                :class="{ '!border-[#ef4056]': errorMessage }"
              />
              <p class="text-body-2 text-[#b2001a] min-h-[1.5rem] mt-2">
                {{ errorMessage }}
              </p>
              <div
                class="fixed inset-x-0 bottom-0 py-3 px-4 shadow-1-top 1024:absolute 1024:bottom-0 1024:shadow-none"
              >
                <button
                  type="submit"
                  class="w-full text-button-1 bg-[#ef4056] text-white rounded-lg py-2 text-center font-bold transition-colors duration-200 cursor-pointer"
                >
                  ویرایش
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["close", "submit"]);

const email = ref(props.email);
const errorMessage = ref("");

watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      email.value = props.email !== "وارد نشده" ? props.email : "";
      errorMessage.value = "";
    }
  }
);

const isEmailValid = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.value);
});

function submitForm() {
  if (!isEmailValid.value) {
    errorMessage.value = "پست الکترونیک وارد شده درست نیست";
    return;
  }
  errorMessage.value = "";
  emit("submit", email.value);
  emit("close");
}
</script>
