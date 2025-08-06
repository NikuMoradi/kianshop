<template>
  <div>
    <!-- Backdrop -->
    <div
      v-if="isOpen"
      @click="$emit('close')"
      class="backdrop bg-opacity-10 fixed inset-0 z-50 bg-black"
    ></div>
    <!-- Popup -->
    <transition name="slide-up">
      <div
        v-if="isOpen"
        class="1024:absolute 1024:inset-auto 1024:w-[460px] 1024:max-h-[80vh] 1024:top-1/2 1024:left-1/2 1024:transform 1024:-translate-x-[25%] 1024:-translate-y-[30%] 1024:rounded-lg fixed inset-0 z-50 flex flex-col bg-white"
      >
        <div class="h-full">
          <!-- header -->
          <div class="px-5">
            <div class="flex items-center justify-between py-3">
              <p class="text-h5 text-[#0c0c0c]">تغییر رمز عبور</p>
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
              class="scrollbar-custom 1024:overflow-y-auto 1024:max-h-[60vh] flex h-full w-full flex-col gap-4 px-5"
            >
              <!-- Add this as the first input inside your <form> -->
              <input
                type="text"
                autocomplete="username"
                style="display: none"
                tabindex="-1"
              />

              <!-- Current Password -->
              <div>
                <label class="text-body-1 mb-1 block font-bold text-[#23254e]">
                  رمز عبور فعلی <span class="text-[#ef4056]">*</span>
                </label>
                <input
                  type="password"
                  v-model="currentPassword"
                  @blur="validateCurrentPassword"
                  autocomplete="current-password"
                  class="text-subtitle w-full rounded-lg border-b-[2px] border-transparent bg-[#F0F0F1] px-3 py-3 text-right outline-none focus:border-[#19bfd3]"
                  :class="{ '!border-[#ef4056]': errors.currentPassword }"
                />
                <p class="text-body-2 mt-2 min-h-1 text-[#b2001a]">
                  {{ errors.currentPassword }}
                </p>
              </div>
              <!-- New Password -->
              <div>
                <label class="text-body-1 mb-1 block font-bold text-[#23254e]">
                  رمز عبور جدید <span class="text-[#ef4056]">*</span>
                </label>
                <input
                  type="password"
                  v-model="newPassword"
                  @blur="validateNewPassword"
                  autocomplete="new-password"
                  class="text-subtitle w-full rounded-lg border-b-[2px] border-transparent bg-[#F0F0F1] px-3 py-3 text-right outline-none focus:border-[#19bfd3]"
                  :class="{ '!border-[#ef4056]': errors.newPassword }"
                />
                <p class="text-body-2 mt-2 min-h-1 text-[#b2001a]">
                  {{ errors.newPassword }}
                </p>
                <div class="mt-2 flex flex-col gap-1">
                  <span class="text-body-2 text-[#81858b]"
                    >رمز عبور شما باید حداقل ۶ حرف باشد.</span
                  >
                  <!-- Password Strength Bar -->
                  <div class="mt-2 flex items-center gap-2">
                    <div
                      class="h-1 rounded"
                      :class="[
                        'flex-1',
                        passwordStrength === 'weak'
                          ? 'bg-[#ff0000]'
                          : passwordStrength === 'medium'
                            ? 'bg-[#ff9800]'
                            : passwordStrength === 'strong'
                              ? 'bg-[#27ae60]'
                              : 'bg-[#e0e0e2]',
                      ]"
                    ></div>
                    <div
                      class="h-1 rounded"
                      :class="[
                        'flex-1',
                        passwordStrength === 'medium' ||
                        passwordStrength === 'strong'
                          ? passwordStrength === 'medium'
                            ? 'bg-[#ff9800]'
                            : 'bg-[#27ae60]'
                          : 'bg-[#e0e0e2]',
                      ]"
                    ></div>
                    <div
                      class="h-1 rounded"
                      :class="[
                        'flex-1',
                        passwordStrength === 'strong'
                          ? 'bg-[#27ae60]'
                          : 'bg-[#e0e0e2]',
                      ]"
                    ></div>
                  </div>
                  <!-- Strength Label -->
                  <div class="mt-1 flex items-center">
                    <span
                      v-if="passwordStrength === 'weak'"
                      class="text-body-2 text-[#ff0000]"
                      >ضعیف</span
                    >
                    <span
                      v-else-if="passwordStrength === 'medium'"
                      class="text-body-2 text-[#ff9800]"
                      >معمولی</span
                    >
                    <span
                      v-else-if="passwordStrength === 'strong'"
                      class="text-body-2 text-[#27ae60]"
                      >عالی شد</span
                    >
                  </div>
                  <!-- Strength Hints -->
                  <ul class="mt-2 space-y-1 pr-2 text-xs">
                    <li
                      :class="hasNumber ? 'text-[#27ae60]' : 'text-[#bdbdbd]'"
                    >
                      • شامل عدد
                    </li>
                    <li
                      :class="
                        hasMinLength ? 'text-[#27ae60]' : 'text-[#bdbdbd]'
                      "
                    >
                      • حداقل ۶ حرف
                    </li>
                    <li
                      :class="hasSpecial ? 'text-[#27ae60]' : 'text-[#bdbdbd]'"
                    >
                      • شامل علامت (^%&$#@!.)
                    </li>
                    <li
                      :class="
                        hasUpperAndLower ? 'text-[#27ae60]' : 'text-[#bdbdbd]'
                      "
                    >
                      • شامل یک حرف بزرگ و کوچک
                    </li>
                  </ul>
                </div>
              </div>
              <!-- Repeat New Password -->
              <div>
                <label class="text-body-1 mb-1 block font-bold text-[#23254e]">
                  تکرار رمز عبور جدید <span class="text-[#ef4056]">*</span>
                </label>
                <input
                  type="password"
                  v-model="repeatPassword"
                  @blur="validateRepeatPassword"
                  autocomplete="new-password"
                  class="text-subtitle w-full rounded-lg border-b-[2px] border-transparent bg-[#F0F0F1] px-3 py-3 text-right outline-none focus:border-[#19bfd3]"
                  :class="{ '!border-[#ef4056]': errors.repeatPassword }"
                />
                <p class="text-body-2 mt-2 min-h-1 text-[#b2001a]">
                  {{ errors.repeatPassword }}
                </p>
              </div>
              <div class="mb-10">
                <p class="text-body-2 text-[#b2001a]">{{ error }}</p>
              </div>

              <!-- Submit -->
              <div
                class="shadow-1-top 1024:absolute 1024:bottom-0 1024:shadow-none fixed inset-x-0 bottom-0 px-4 py-3"
              >
                <button
                  type="submit"
                  class="text-button-1 w-full cursor-pointer rounded-lg bg-[#ef4056] py-2 text-center font-bold text-white transition-colors duration-200 disabled:cursor-default disabled:bg-[#f5f5f5] disabled:text-[#bdbdbd]"
                  :disabled="loading || passwordStrength !== 'strong'"
                >
                  {{ loading ? "در حال تغییر رمز عبور..." : "تغییر رمز عبور" }}
                </button>
              </div>
            </form>
          </div>
        </div>
        <transition name="fade">
          <div
            v-if="showInvalidPass"
            class="text-body-1 animate-fade fixed bottom-20 left-1/2 -translate-x-1/2 rounded-md bg-black px-3 py-4 text-white"
          >
            <div class="flex items-center justify-start whitespace-nowrap">
              <div class="ml-4">رمز عبور فعلی اشتباه است</div>
              <button
                @click="showInvalidPass = !showInvalidPass"
                class="text-[#19bfd3]"
              >
                باشه
              </button>
            </div>
          </div>
        </transition>
        <transition name="fade">
          <div
            v-if="showSuccess"
            class="text-body-1 animate-fade fixed bottom-20 left-1/2 -translate-x-1/2 rounded-md bg-black px-3 py-4 text-white"
          >
            <div class="flex items-center justify-start whitespace-nowrap">
              <div class="ml-4">رمز عبور شما با موفقیت ثبت شد</div>
              <button
                @click="showSuccess = !showSuccess"
                class="text-[#19bfd3]"
              >
                باشه
              </button>
            </div>
          </div>
        </transition>
        <!-- <transition name="fade">
          <div
            v-if="successfullyChangedPasswordPopup"
            class="fixed bottom-20 left-1/2 -translate-x-1/2 py-4 px-3 rounded-md text-white bg-black text-body-1 animate-fade"
          >
            <div class="flex items-center justify-start whitespace-nowrap">
              <div class="ml-4">رمز عبور جدید شما نباید مشابه رمز عبور قدیمی باشد
              </div>
              <button
                @click="
                  successfullyChangedPasswordPopup =
                    !successfullyChangedPasswordPopup
                "
                class="text-[#19bfd3]"
              >
                باشه
              </button>
            </div>
          </div></transition
        > -->
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
});
const emit = defineEmits(["close", "submit"]);

const auth = useAuthStore();
const user = auth.user;
const loading = ref(false);
const error = ref(null);
const currentPassword = ref("");
const newPassword = ref("");
const repeatPassword = ref("");
const showInvalidPass = ref(false);
const showSuccess = ref(false);

const errors = ref({
  currentPassword: "",
  newPassword: "",
  repeatPassword: "",
});

// Password strength indicators
const hasNumber = computed(() => /\d/.test(newPassword.value));
const hasMinLength = computed(() => newPassword.value.length >= 6);
const hasSpecial = computed(() => /[!@#$%&*^.]/.test(newPassword.value));
const hasUpper = computed(() => /[A-Z]/.test(newPassword.value));
const hasLower = computed(() => /[a-z]/.test(newPassword.value));
const hasUpperAndLower = computed(() => hasUpper.value && hasLower.value);

const passwordStrength = computed(() => {
  if (
    hasNumber.value &&
    hasMinLength.value &&
    hasSpecial.value &&
    hasUpperAndLower.value
  )
    return "strong";

  if (
    hasMinLength.value &&
    (hasNumber.value || hasSpecial.value || hasUpperAndLower.value)
  )
    return "medium";

  if (newPassword.value.length > 2) return "weak";
  return "";
});
const validateCurrentPassword = () => {
  if (!currentPassword.value) {
    errors.value.currentPassword = "لطفا این قسمت را خالی نگذارید";
    return false;
  }
  errors.value.currentPassword = "";
  return true;
};

const validateNewPassword = () => {
  if (!newPassword.value) {
    errors.value.newPassword = "لطفا این قسمت را خالی نگذارید";
    return false;
  }
  errors.value.newPassword = "";
  return true;
};

const validateRepeatPassword = () => {
  if (!repeatPassword.value) {
    errors.value.repeatPassword = "لطفا این قسمت را خالی نگذارید";
    return false;
  }
  if (newPassword.value !== repeatPassword.value) {
    errors.value.repeatPassword = "رمز عبور و تکرار آن برابر نیستند";
    return false;
  }
  errors.value.repeatPassword = "";
  return true;
};

const updatePassword = async (current, next) => {
  if (!user.value?.id) {
    error.value = "User not authenticated";
    return false;
  }

  try {
    loading.value = true;

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.value.email,
      password: current,
    });

    if (signInError) {
      showInvalidPass.value = true;
      setTimeout(() => (showInvalidPass.value = false), 3000);
      return false;
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: next,
    });

    if (updateError) {
      error.value = updateError.message;
      return false;
    }

    return true;
  } catch (err) {
    error.value = err.message;
    return false;
  } finally {
    loading.value = false;
  }
};

const submitForm = async () => {
  error.value = "";
  if (
    !validateCurrentPassword() &&
    !validateNewPassword() &&
    !validateRepeatPassword() &&
    passwordStrength !== "strong"
  )
    return;

  try {
    const success = await updatePassword(
      currentPassword.value,
      newPassword.value,
    );
    if (!success) return;

    // Clear form
    currentPassword.value = "";
    newPassword.value = "";
    repeatPassword.value = "";

    showSuccess.value = true;

    setTimeout(() => {
      showSuccess.value = false;
      emit("close");
    }, 3000);
  } catch (err) {
    console.error("Unexpected error:", err);
  } finally {
    loading.value = false;
  }
};
</script>
