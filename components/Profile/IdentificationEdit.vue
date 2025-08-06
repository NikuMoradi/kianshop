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
    <transition name="slide-up ">
      <div
        v-if="isOpen"
        class="1024:absolute 1024:inset-auto 1024:w-[460px] 1024:max-h-[80vh] 1024:top-1/2 1024:left-1/2 1024:transform 1024:-translate-x-[25%] 1024:-translate-y-[30%] 1024:rounded-lg fixed inset-0 z-50 flex flex-col bg-white"
      >
        <div class="1024:pt-0 h-full pt-[54px]">
          <!-- header -->
          <div class="1024:static fixed inset-x-0 top-0 px-5">
            <div class="flex items-center justify-between py-3">
              <p class="text-h5 text-[#0c0c0c]">ثبت اطلاعات شناسایی</p>
              <button class="" @click="$emit('close')">
                <IconX class="text-[#424750]" size="22" />
              </button>
            </div>
            <hr class="h-[1px] w-full border-none bg-[#e0e0e2]" />
          </div>
          <!-- body -->
          <div class="1024:pt-2 1024:px-1 flex h-full flex-col pt-8 pb-20">
            <form
              @submit.prevent="submitForm"
              class="scrollbar-custom 1024:max-h-[60vh] flex h-full w-full flex-col gap-4 overflow-y-auto px-5"
            >
              <p class="text-body-1 mb-4 text-[#23254e]">
                لطفا اطلاعات شناسایی خود را وارد کنید. نام و نام خانوادگی شما
                باید با اطلاعاتی که وارد می‌کنید همخوانی داشته باشند.
              </p>
              <div class="mb-2 flex w-full gap-2">
                <label class="w-1/2">
                  <p class="text-body-1 text-[#3f4064]">
                    نام
                    <span class="text-[#ef4056]">*</span>
                  </p>
                  <input
                    type="text"
                    v-model="form.firstName"
                    @blur="validateFirstName"
                    class="text-subtitle w-full rounded-lg border-b-[2px] border-transparent bg-[#F0F0F1] px-3 py-2 text-right transition-colors outline-none focus:border-[#19bfd3]"
                    :class="{ '!border-[#ef4056]': errors.firstName }"
                  />
                  <p class="text-body-2 mt-2 min-h-1 text-[#b2001a]">
                    {{ errors.firstName }}
                  </p>
                </label>
                <label class="w-1/2">
                  <p class="text-body-1 text-[#3f4064]">
                    نام‌خانوادگی
                    <span class="text-[#ef4056]">*</span>
                  </p>
                  <input
                    type="text"
                    v-model="form.lastName"
                    @blur="validateLastName"
                    class="text-subtitle w-full rounded-lg border-b-[2px] border-transparent bg-[#F0F0F1] px-3 py-2 text-right transition-colors outline-none focus:border-[#19bfd3]"
                    :class="{ '!border-[#ef4056]': errors.lastName }"
                  />
                  <p class="text-body-2 mt-2 min-h-1 text-[#b2001a]">
                    {{ errors.lastName }}
                  </p>
                </label>
              </div>
              <div class="mb-2 flex items-center gap-2">
                <label
                  for="isForeigner"
                  class="relative flex cursor-pointer items-center gap-2 select-none"
                >
                  <input
                    id="isForeigner"
                    type="checkbox"
                    v-model="form.isForeigner"
                    @change="form.nationalCode = ''"
                    class="peer absolute h-0 w-0 opacity-0"
                  />
                  <span
                    class="flex h-[22px] w-[21px] items-center justify-center rounded-md border-2 border-[#3f4064] bg-white transition-colors duration-200 peer-checked:border-[#009fc2] peer-checked:bg-[#009fc2]"
                  >
                    <svg
                      v-if="form.isForeigner"
                      class="h-4 w-4 text-white"
                      fill="#ffff"
                      stroke-width="1"
                    >
                      <use href="/images/sprite.svg#check" />
                    </svg>
                  </span>
                  <span class="text-body-1-strong text-[#3f4064]"
                    >اتباع خارجی هستم و کد ملی ندارم</span
                  >
                </label>
              </div>
              <div class="mb-2">
                <label class="w-full" v-if="!form.isForeigner">
                  <p class="text-body-1 text-[#3f4064]">
                    کد ملی
                    <span class="text-[#ef4056]">*</span>
                  </p>
                  <input
                    type="text"
                    v-model="form.nationalCode"
                    @blur="validateNationalCode"
                    class="text-subtitle w-full rounded-lg border-b-[2px] border-transparent bg-[#F0F0F1] px-3 py-2 text-right transition-colors outline-none focus:border-[#19bfd3]"
                    :class="{ '!border-[#ef4056]': errors.nationalCode }"
                  />
                  <p class="text-body-2 mt-2 min-h-1 text-[#b2001a]">
                    {{ errors.nationalCode }}
                  </p>
                </label>
              </div>

              <div
                class="shadow-1-top 1024:absolute 1024:bottom-0 1024:shadow-none fixed inset-x-0 bottom-0 px-4 py-4"
              >
                <button
                  type="submit"
                  class="text-button-1 w-full cursor-pointer rounded-lg bg-[#ef4056] py-2 text-center font-bold text-white transition-colors duration-200 disabled:cursor-default disabled:bg-[#f5f5f5] disabled:text-[#bdbdbd]"
                >
                  بررسی اطلاعات
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
import { watch } from "vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  nationalCode: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["close", "submit"]);

const form = ref({
  firstName: "",
  lastName: "",
  nationalCode: "",
});

const errors = ref({
  firstName: "",
  lastName: "",
  nationalCode: "",
});

function toggleDropdown(type) {
  activeDropdown.value = activeDropdown.value === type ? null : type;
}

// Watch for modal open/close to reinitialize form
watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      // Reset form values
      form.value = {
        firstName: props.firstName !== "وارد نشده" ? props.firstName : "",
        lastName: props.lastName !== "وارد نشده" ? props.lastName : "",
        nationalCode:
          props.nationalCode !== "وارد نشده" ? props.nationalCode : "",
      };
      // Reset errors
      errors.value = {
        firstName: "",
        lastName: "",
        nationalCode: "",
      };
    }
  },
);
const activeDropdown = ref(null);

// Validation functions
function validateFirstName() {
  const value = form.value.firstName;
  if (!value) {
    errors.value.firstName = "اینجا را خالی نگذارید";
    return false;
  }
  if (value.length < 2) {
    errors.value.firstName = "نام باید حداقل ۲ کاراکتر باشد";
    return false;
  }
  if (!/^[\u0600-\u06FF\s]+$/.test(value)) {
    errors.value.firstName = "نام باید فقط از حروف فارسی تشکیل شده باشد";
    return false;
  }
  errors.value.firstName = "";
  return true;
}

function validateLastName() {
  const value = form.value.lastName;
  if (!value) {
    errors.value.lastName = "اینجا را خالی نگذارید";
    return false;
  }
  if (value.length < 2) {
    errors.value.lastName = "نام‌خانوادگی باید حداقل ۲ کاراکتر باشد";
    return false;
  }
  if (!/^[\u0600-\u06FF\s]+$/.test(value)) {
    errors.value.lastName = "نام‌خانوادگی باید فقط از حروف تشکیل شده باشد";
    return false;
  }
  errors.value.lastName = "";
  return true;
}

function validateNationalCode() {
  if (!form.value.isForeigner && !form.value.nationalCode) {
    errors.value.nationalCode = "اینجا را خالی نگذارید";
    return false;
  }

  if (!form.value.isForeigner && !/^\d{10}$/.test(form.value.nationalCode)) {
    errors.value.nationalCode = "کدملی معتبر نیست";
    return false;
  }

  errors.value.nationalCode = "";
  return true;
}

function submitForm() {
  // First validate all fields
  const isFirstNameValid = validateFirstName();
  const isLastNameValid = validateLastName();
  const isNationalCodeValid = validateNationalCode();

  // Then check if all required fields are filled
  // if (!allInputsFilled.value) return;

  // Finally check if all validations passed
  if (!isFirstNameValid || !isLastNameValid || !isNationalCodeValid) {
    return;
  }

  emit("submit", form.value);
  emit("close");
}

// const selectedFileName = ref("");

// ===== File Handling =====
// function onFileChange(e) {
//   const file = e.target.files[0];
//   selectedFileName.value = file ? file.name : "";
// }
</script>

<style scoped></style>
