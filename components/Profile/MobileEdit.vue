<template>
  <div>
    <!-- Backdrop -->
    <div
      id="modal"
      v-if="isOpen"
      @click="$emit('close')"
      class="backdrop"
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
              <p class="text-h5 text-[#0c0c0c]">ویرایش شماره موبایل</p>
              <button class="" @click="$emit('close')">
                <IconX class="text-[#424750]" size="22" />
              </button>
            </div>
            <hr class="w-full bg-[#e0e0e2] border-none h-[1px]" />
          </div>
          <!-- body -->
          <div class="flex flex-col px-5 py-4">
            <form @submit.prevent="submitForm" class="h-full 1024:min-h-[30vh]">
              <input
                type="tel"
                v-model="mobileNumber"
                @input="validateMobile"
                maxlength="11"
                dir="ltr"
                class="w-full rounded-lg px-3 py-3 text-right text-subtitle outline-none bg-[#F0F0F1] transition-colors border-b-[2px] border-transparent focus:border-[#19bfd3]"
                :class="{ '!border-[#ef4056]': errorMessage }"
              />

              <p class="text-body-2 text-[#b2001a] min-h-[1.5rem] mt-2">
                {{ errorMessage }}
              </p>
              <div class="flex items-center gap-2 mt-2 text-[#81858b]">
                <IconInfoCircle size="20" />
                <p class="text-body-2">
                  برای ثبت این شماره باید آن را تایید کنید.
                </p>
              </div>

              <div
                class="fixed inset-x-0 bottom-0 py-3 px-4 shadow-1-top 1024:absolute 1024:bottom-0"
              >
                <button
                  type="submit"
                  class="w-full text-button-1 bg-[#ef4056] text-white rounded-lg py-2 text-center font-bold transition-colors duration-200 cursor-pointer"
                >
                  دریافت کد تایید و تغییر شماره
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
  mobileNumber: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["close", "submit"]);

const errorMessage = ref("");
const mobileNumber = ref(
  props.mobileNumber !== "وارد نشده" ? props.mobileNumber : ""
);

// Reset mobileNumber when modal opens
watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      mobileNumber.value =
        props.mobileNumber !== "وارد نشده" ? props.mobileNumber : "";
      errorMessage.value = "";
    }
  }
);

function validateMobile() {
  const val = mobileNumber.value;
  const persianRegex = /^۰۹[۰-۹]{9}$/;
  const latinRegex = /^09[0-9]{9}$/;

  if (!val) {
    errorMessage.value = "اینجا را خالی نگذارید";
    return false;
  } else if (!persianRegex.test(val) && !latinRegex.test(val)) {
    errorMessage.value = "شماره موبایل به شکل درست وارد نشده";
    return false;
  } else {
    errorMessage.value = "";
    return true;
  }
}

function submitForm() {
  const isMobileValid = validateMobile();
  if (!isMobileValid) return;
  emit("submit", mobileNumber.value);
  emit("close");
}
</script>

<style scoped></style>
