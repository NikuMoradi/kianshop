<template>
  <div
    class="1024:shadow-md 1024:max-w-[400px] w-full rounded-lg bg-white p-8 text-right"
  >
    <form @submit.prevent="handleLoginSubmit">
      <div class="flex w-full items-center justify-center">
        <nuxt-link to="/">
          <div class="1024:w-20 mb-8 h-24 w-[100px]">
            <img
              src="public/images/logo-header.svg"
              alt="Digikala Logo"
              class="h-full w-full"
            />
          </div>
        </nuxt-link>
      </div>
      <h2 class="text-h4 text-[#0c0c0c]">سلام!</h2>
      <h2 class="text-h4 mb-4 text-[#0c0c0c]">لطفا اطلاعات خود را وارد کنید</h2>

      <input
        type="email"
        id="email"
        placeholder="ایمیل"
        v-model="email"
        class="text-subtitle 1024:boreder 1024:border-[1px] 1024:border-[#c0c2c5] 1024:bg-white w-full rounded-md border-b-[2px] border-[#19bfd3] bg-[#F0F0F1] px-4 py-[10px] text-right caret-[#19bfd3] transition-colors duration-200 outline-none focus-within:border-[#19bfd3]"
        autocomplete="email"
        @input="errorMessage = ''"
      />

      <div
        class="text-subtitle 1024:border-[1px] 1024:border-[#c0c2c5] 1024:bg-white mt-6 flex items-center justify-between rounded-md border-b-[2px] border-[#19bfd3] bg-[#F0F0F1] px-4 py-[10px] caret-[#19bfd3] transition-colors duration-200 outline-none focus-within:border-[#19bfd3]"
      >
        <input
          id="password"
          :type="passwordVisible ? 'text' : 'password'"
          placeholder="رمز عبور"
          autocomplete="current-password"
          v-model="password"
          class="w-full bg-inherit"
        />
        <div
          @click="togglePasswordVisibility"
          class="flex cursor-pointer items-center"
        >
          <svg
            v-if="passwordVisible"
            class="h-[24px] w-[24px]"
            fill="#23254e"
            stroke-width="0"
          >
            <use href="public/images/sprite.svg#visibilityOff" />
          </svg>
          <svg v-else class="h-[24px] w-[24px]" fill="#23254e" stroke-width="0">
            <use href="public/images/sprite.svg#visibilityOn" />
          </svg>
        </div>
      </div>

      <p class="text-body-2 mt-2 min-h-[1.5rem] text-[#b2001a]">
        {{ errorMessage }}
      </p>

      <button
        type="submit"
        :disabled="loading"
        class="text-button-1 relative mt-6 mb-4 flex h-12 w-full items-center justify-center rounded-md bg-[#ef4056] text-white transition duration-200 hover:bg-[#ef4056]"
      >
        <span v-if="!loading">ورود</span>
        <div v-else class="loading-btn">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
    </form>

    <button
      type="button"
      @click="$emit('switch-to-signup')"
      class="text-caption mt-3 flex items-center justify-center leading-none text-[#19bfd3]"
    >
      هنوز ثبت نام نکرده‌اید؟
      <div class="flex leading-none">
        <div class="flex">
          <IconChevronLeft size="12" class="text-[#19bfd3]" :stroke="3" />
        </div>
      </div>
    </button>
    <button
      type="button"
      class="text-caption mt-1 flex items-center justify-center leading-none text-[#19bfd3]"
    >
      فراموشی رمز عبور
      <div class="flex">
        <IconChevronLeft size="12" class="text-[#19bfd3]" :stroke="3" />
      </div>
    </button>
  </div>
</template>

<script setup>
const emit = defineEmits(["switch-to-signup"]);
const route = useRoute();

// Get backUrl from query parameters, default to home page
const backUrl = computed(() => route.query.backUrl || "/");

// Form input values
const email = ref("");
const password = ref("");

// UI state
const passwordVisible = ref(false);
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

const postLogin = async (username, password) => {
  try {
    const data = await $fetch("/api/auth/login", {
      method: "POST",
      body: { username, password },
    });
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
async function handleLoginSubmit() {
  errorMessage.value = "";
  loading.value = true;

  const trimmedEmail = email.value.trim();
  const trimmedPassword = password.value.trim();

  // بررسی اولیه ورودی‌ها
  if (!trimmedEmail || !trimmedPassword) {
    errorMessage.value = "لطفا ایمیل و رمز عبور را وارد کنید.";
    if (!trimmedEmail) document.getElementById("email")?.focus();
    else if (!trimmedPassword) document.getElementById("password")?.focus();
    loading.value = false;
    return;
  }

  // بررسی فرمت ایمیل
  if (!isValidEmail(trimmedEmail)) {
    errorMessage.value = "لطفا یک آدرس ایمیل معتبر وارد کنید.";
    document.getElementById("email")?.focus();
    loading.value = false;
    return;
  }

  // تلاش برای لاگین
  const { data, error } = await postLogin(trimmedEmail, trimmedPassword);

  if (error) {
    if (error.status === 403) {
      errorMessage.value = "ایمیل یا رمز عبور اشتباه است.";
    } else {
      errorMessage.value = "خطا در ورود. لطفا دوباره تلاش کنید.";
    }
  } else {
    if (data?.success) {
      navigateTo(backUrl.value, { external: true });
    }
  }

  loading.value = false;
}
</script>
