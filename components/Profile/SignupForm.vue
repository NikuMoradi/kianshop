<template>
  <div
    class="bg-white p-8 rounded-lg 1024:shadow-md 1024:max-w-[400px] w-full text-right"
  >
    <button
      type="button"
      @click="$emit('switch-to-login')"
      class="fixed right-5 top-5"
    >
      <svg class="w-[24px] h-[24px]" fill="#424750" stroke-width="0">
        <use href="/images/sprite.svg#arrowRight" />
      </svg>
    </button>
    <form @submit.prevent="handleSignupSubmit">
      <nuxt-link to="/">
        <div class="flex flex-col items-center mb-6">
          <img
            src="/images/full-vertical-logo.svg"
            alt="Digikala Logo"
            class="w-[100px] 1024:w-20 h-auto mb-2"
          />
        </div>
      </nuxt-link>
      <h2 class="text-h4 text-[#0c0c0c] mb-4">ایجاد حساب کاربری</h2>

      <input
        type="email"
        id="email"
        placeholder="ایمیل"
        v-model="email"
        class="w-full px-4 py-[10px] bg-[#F0F0F1] text-subtitle border-b-[2px] focus-within:border-[#19bfd3] caret-[#19bfd3] 1024:boreder 1024:boreder 1024:border-[1px] 1024:border-[#c0c2c5] 1024:bg-white rounded-md outline-none text-right 1024:focus-within:border-[#19bfd3] transition-colors duration-200"
        autocomplete="email"
        @input="errorMessage = ''"
      />
      <div
        class="mt-4 flex items-center justify-between bg-[#F0F0F1] px-4 py-[10px] text-subtitle caret-[#19bfd3] border-b-[2px] focus-within:border-[#19bfd3] 1024:boreder 1024:border-[1px] 1024:border-[#c0c2c5] 1024:bg-white rounded-md outline-none 1024:focus-within:border-[#19bfd3] transition-colors duration-200"
      >
        <input
          id="password"
          :type="passwordVisible ? 'text' : 'password'"
          placeholder="رمز عبور"
          autocomplete="new-password"
          v-model="password"
          class="w-full bg-inherit"
        />
        <div
          @click="togglePasswordVisibility"
          class="flex items-center cursor-pointer"
        >
          <svg
            v-if="passwordVisible"
            class="w-[24px] h-[24px]"
            fill="#23254e"
            stroke-width="0"
          >
            <use href="public/images/sprite.svg#visibilityOff" />
          </svg>
          <svg v-else class="w-[24px] h-[24px]" fill="#23254e" stroke-width="0">
            <use href="public/images/sprite.svg#visibilityOn" />
          </svg>
        </div>
      </div>

      <div
        class="mt-4 flex items-center justify-between bg-[#F0F0F1] px-4 py-[10px] text-subtitle caret-[#19bfd3] border-b-[2px] focus-within:border-[#19bfd3] 1024:boreder 1024:border-[1px] 1024:border-[#c0c2c5] 1024:bg-white rounded-md outline-none 1024:focus-within:border-[#19bfd3] transition-colors duration-200"
      >
        <input
          id="passwordConfirm"
          :type="passwordConfirmVisible ? 'text' : 'password'"
          placeholder="تکرار رمز عبور"
          autocomplete="new-password"
          v-model="passwordConfirm"
          class="w-full bg-inherit"
        />
        <div
          @click="togglePasswordConfirmVisibility"
          class="flex items-center cursor-pointer"
        >
          <svg
            v-if="passwordConfirmVisible"
            class="w-[24px] h-[24px]"
            fill="#23254e"
            stroke-width="0"
          >
            <use href="public/images/sprite.svg#visibilityOff" />
          </svg>
          <svg v-else class="w-[24px] h-[24px]" fill="#23254e" stroke-width="0">
            <use href="public/images/sprite.svg#visibilityOn" />
          </svg>
        </div>
      </div>
      <p
        v-if="errorMessage"
        class="text-body-2 text-[#b2001a] min-h-[1.5rem] mt-2"
      >
        {{ errorMessage }}
      </p>
      <p v-else class="min-h-[1.5rem] mt-2"></p>

      <button
        type="submit"
        :disabled="loading"
        class="w-full h-12 text-button-1 bg-[#ef4056] text-white rounded-md hover:bg-[#ef4056] transition duration-200 mt-6 mb-4 relative flex items-center justify-center"
      >
        <span v-if="!loading">ثبت نام</span>
        <div v-else class="loading-btn">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
    </form>
    <p class="text-caption text-center mt-4">
      ثبت نام شما به معنای پذیرش
      <span class="text-[#008eb2]">شرایط دیجی‌کالا</span> و
      <span class="text-[#008eb2]">قوانین حریم خصوصی</span> است
    </p>
  </div>
</template>

<script setup>
// import { ref } from "vue";
// import { useRouter } from "vue-router";

const emit = defineEmits(["switch-to-login"]);
const supabase = useSupabaseClient();
const router = useRouter();
const route = useRoute();
// Get backUrl from query parameters, default to home page
const backUrl = computed(() => route.query.backUrl || "/");

// Form input values
const email = ref("");
const password = ref("");
const passwordConfirm = ref("");

// UI state
const passwordVisible = ref(false);
const passwordConfirmVisible = ref(false);
const loading = ref(false);
const errorMessage = ref("");

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function togglePasswordVisibility() {
  passwordVisible.value = !passwordVisible.value;
}

function togglePasswordConfirmVisibility() {
  passwordConfirmVisible.value = !passwordConfirmVisible.value;
}

async function handleSignupSubmit() {
  errorMessage.value = "";
  loading.value = true;

  const trimmedEmail = email.value.trim();
  const trimmedPassword = password.value.trim();
  const trimmedPasswordConfirm = passwordConfirm.value.trim();

  if (!trimmedEmail || !trimmedPassword || !trimmedPasswordConfirm) {
    errorMessage.value = "لطفا تمام فیلدها را پر کنید.";
    // Focus on first empty field for better UX
    if (!trimmedEmail) document.getElementById("email").focus();
    else if (!trimmedPassword) document.getElementById("password").focus();
    else if (!trimmedPasswordConfirm)
      document.getElementById("passwordConfirm").focus();
    loading.value = false;
    return;
  }

  if (!isValidEmail(trimmedEmail)) {
    errorMessage.value = "لطفا یک آدرس ایمیل معتبر وارد کنید.";
    document.getElementById("email")?.focus();

    loading.value = false;
    return;
  }

  if (trimmedPassword !== trimmedPasswordConfirm) {
    errorMessage.value = "رمز عبور و تکرار آن مطابقت ندارند.";
    loading.value = false;
    return;
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email: trimmedEmail,
      password: trimmedPassword,
    });

    if (error) {
      if (error.message.includes("User already registered")) {
        errorMessage.value = "کاربری با این ایمیل قبلاً ثبت‌نام کرده است";
      } else if (
        error.message.includes("Password should be at least 6 characters")
      ) {
        errorMessage.value = "رمز عبور باید حداقل ۶ کاراکتر باشد";
      } else {
        errorMessage.value = error;
      }
      return;
    }
    navigateTo(backUrl.value);
  } catch (err) {
    errorMessage.value = err;
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped></style>
