<template>
  <!-- body -->
  <div class="flex h-full flex-col">
    <form
      @submit.prevent="submitForm"
      class="scrollbar-custom flex h-full w-full flex-col gap-4 overflow-y-auto"
    >
      <div
        class="1024:pt-5 1024:gap-2 flex flex-col items-center rounded-lg border border-[#e0e0e2] bg-white px-8 pt-3"
      >
        <div class="flex w-full items-center justify-between">
          <p class="text-body-2-strong text-[#62666d]">وزن مرسوله</p>
          <div class="flex items-center gap-1">
            <span class="text-body-2-strong text-[#62666d]"
              >{{ toPersianDigits((cart.getTotalWeight / 1000).toFixed(2)) }}
            </span>
            <span class="text-body-2-strong text-[#62666d]"> کیلوگرم </span>
          </div>
        </div>
        <div class="flex w-full items-center justify-between">
          <p class="text-body-2-strong text-[#62666d]">
            قیمت کالاها ({{ toPersianDigits(cart.totalItems) }})
          </p>
          <div class="flex items-center gap-1">
            <span class="text-body-2-strong text-[#62666d]">{{
              toPersianDigits(cart.getCartTotalWithoutDiscount)
            }}</span>
            <svg width="16" height="16" fill="#424750" color="#3f4064">
              <use href="/images/toman.svg#toman"></use>
            </svg>
          </div>
        </div>
        <div class="flex w-full items-center justify-between">
          <p class="text-body-2-strong text-[#62666d]">جمع سبد خرید</p>
          <div class="flex items-center gap-1">
            <span class="text-body-2-strong text-[#23254e]">{{
              toPersianDigits(cart.getCartTotalWithDiscount)
            }}</span>
            <svg width="16" height="16" fill="#424750" color="#3f4064">
              <use href="/images/toman.svg#toman"></use>
            </svg>
          </div>
        </div>
        <div class="flex w-full items-center justify-between text-[#2e7b32]">
          <p class="text-body-2-strong">سود شما از خرید</p>
          <div class="text-body-2-strong flex items-center gap-1">
            <span>({{ toPersianDigits(cart.getAllDiscounts) }}٪)</span>
            <span
              >{{
                toPersianDigits(
                  cart.getCartTotalWithoutDiscount -
                    cart.getCartTotalWithDiscount,
                )
              }}
            </span>
            <svg width="16" height="16" fill="#424750" color="#3f4064">
              <use href="/images/toman.svg#toman" fill="#2e7b32"></use>
            </svg>
          </div>
        </div>
        <!-- Province Dropdown -->
        <label class="w-full">
          <p class="text-body-2 text-[#3f4064]">
            استان
            <span class="text-[#ef4056]">*</span>
          </p>
          <div class="relative w-full">
            <div
              @click="toggleDropdown('province')"
              class="flex w-full cursor-pointer items-center justify-between rounded-lg bg-[#F0F0F1] px-3 py-3 text-right"
              :class="{ 'border border-[#b2001a]': errors.province }"
            >
              <span class="text-[13.5px]">{{
                form.province ? form.province : " "
              }}</span>
              <svg class="h-6 w-6" fill="#424750" stroke-width="0">
                <use href="/images/sprite.svg#dropdown" />
              </svg>
            </div>
            <ul
              v-if="activeDropdown === 'province'"
              v-click-outside="() => (activeDropdown = null)"
              class="scrollbar-custom absolute z-50 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border border-[#e0e0e2] bg-white shadow-lg"
            >
              <li
                v-for="p in provinces"
                :key="p.id"
                @click="selectOption('province', p)"
                class="text-body-2 cursor-pointer px-3 py-2 text-right text-[#23254e] hover:bg-[#f5f5f5]"
                :class="{ 'bg-[#f5f5f5]': form.province === p.name }"
              >
                {{ p.name }}
              </li>
            </ul>
          </div>
          <p class="text-caption mt-2 min-h-1 text-[#b2001a]">
            {{ errors.province }}
          </p>
        </label>

        <!-- City Dropdown -->
        <label class="w-full">
          <p class="text-body-2 text-[#3f4064]">
            شهر
            <span class="text-[#ef4056]">*</span>
          </p>
          <div class="relative w-full">
            <div
              @click="toggleDropdown('city')"
              class="flex w-full cursor-pointer items-center justify-between rounded-lg bg-[#F0F0F1] px-3 py-3 text-right"
              :class="{ 'border border-[#b2001a]': errors.city }"
            >
              <span class="text-[13.5px]">{{
                form.city ? form.city : " "
              }}</span>
              <svg class="h-6 w-6" fill="#424750" stroke-width="0">
                <use href="/images/sprite.svg#dropdown" />
              </svg>
            </div>
            <ul
              v-if="activeDropdown === 'city' && form.province"
              v-click-outside="() => (activeDropdown = null)"
              class="scrollbar-custom absolute z-50 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border border-[#e0e0e2] bg-white shadow-lg"
            >
              <li
                v-for="c in selectedProvinceCities"
                :key="c"
                @click="selectOption('city', c)"
                class="text-body-2 cursor-pointer px-3 py-2 text-right text-[#23254e] hover:bg-[#f5f5f5]"
                :class="{ 'bg-[#f5f5f5]': form.city === c }"
              >
                {{ c }}
              </li>
            </ul>
          </div>
          <p class="text-caption mt-2 min-h-1 text-[#b2001a]">
            {{ errors.city }}
          </p>
        </label>

        <!-- Street and Alley -->
        <label class="w-full">
          <p class="text-body-2 text-[#3f4064]">
            خیابان و کوچه
            <span class="text-[#ef4056]">*</span>
          </p>
          <input
            type="text"
            v-model="form.streetAndAlley"
            @blur="validateStreetAndAlley"
            class="text-body-1 w-full rounded-lg border-b-[2px] border-transparent bg-[#F0F0F1] px-3 py-2 text-right transition-colors outline-none focus:border-[#19bfd3]"
            :class="{ '!border-[#ef4056]': errors.streetAndAlley }"
          />
          <p class="text-caption mt-2 min-h-1 text-[#b2001a]">
            {{ errors.streetAndAlley }}
          </p>
        </label>

        <div class="mb-2 flex w-full gap-2">
          <!-- Plaque -->
          <label class="w-1/2">
            <p class="text-body-2 text-[#3f4064]">
              پلاک
              <span class="text-[#ef4056]">*</span>
            </p>
            <input
              type="text"
              v-model="form.plaque"
              @blur="validatePlaque"
              class="text-body-1 w-full rounded-lg border-b-[2px] border-transparent bg-[#F0F0F1] px-3 py-2 text-right transition-colors outline-none focus:border-[#19bfd3]"
              :class="{ '!border-[#ef4056]': errors.plaque }"
            />
            <p class="text-caption mt-2 min-h-1 text-[#b2001a]">
              {{ errors.plaque }}
            </p>
          </label>

          <!-- Unit -->
          <label class="w-1/2">
            <p class="text-body-2 text-[#3f4064]">واحد</p>
            <input
              type="text"
              v-model="form.unit"
              class="text-body-2 w-full rounded-lg border-b-[2px] border-transparent bg-[#F0F0F1] px-3 py-2 text-right transition-colors outline-none focus:border-[#19bfd3]"
            />
          </label>
        </div>

        <!-- Postal Code -->
        <label class="w-full">
          <p class="text-body-2 text-[#3f4064]">
            کدپستی
            <span class="text-[#ef4056]">*</span>
          </p>
          <input
            type="text"
            v-model="form.postalCode"
            @blur="validatePostalCode"
            class="text-body-1 w-full rounded-lg border-b-[2px] border-transparent bg-[#F0F0F1] px-3 py-2 text-right transition-colors outline-none focus:border-[#19bfd3]"
            :class="{ '!border-[#ef4056]': errors.postalCode }"
          />
          <p class="text-caption mt-2 min-h-1 text-[#b2001a]">
            {{ errors.postalCode }}
          </p>
        </label>

        <div class="mb-2 flex w-full gap-2">
          <!-- Recipient Name -->
          <label class="w-1/2">
            <p class="text-body-2 text-[#3f4064]">
              نام تحویل گیرنده
              <span class="text-[#ef4056]">*</span>
            </p>
            <input
              type="text"
              v-model="form.recipientName"
              @blur="validateRecipientName"
              class="text-body-1 w-full rounded-lg border-b-[2px] border-transparent bg-[#F0F0F1] px-3 py-2 text-right transition-colors outline-none focus:border-[#19bfd3]"
              :class="{ '!border-[#ef4056]': errors.recipientName }"
            />
            <p class="text-caption mt-2 min-h-1 text-[#b2001a]">
              {{ errors.recipientName }}
            </p>
          </label>

          <!-- Phone Number -->
          <label class="w-1/2">
            <p class="text-body-2 text-[#3f4064]">
              شماره تلفن
              <span class="text-[#ef4056]">*</span>
            </p>
            <input
              type="tel"
              v-model="form.phoneNumber"
              @blur="validatePhoneNumber"
              class="text-body-1 w-full rounded-lg border-b-[2px] border-transparent bg-[#F0F0F1] px-3 py-2 text-right transition-colors outline-none focus:border-[#19bfd3]"
              :class="{ '!border-[#ef4056]': errors.phoneNumber }"
            />
            <p class="text-caption mt-2 min-h-1 text-[#b2001a]">
              {{ errors.phoneNumber }}
            </p>
          </label>
        </div>
        <button
          v-if="auth.isLoggedIn"
          @click="handleCheckout"
          class="text-button-1 1024:block my-6 hidden w-full rounded-lg bg-[var(--color-primary)] py-2 text-center text-white"
        >
          {{
            auth.isLoggedIn ? " تایید و تکمیل سفارش " : " ورود و تکمیل سفارش"
          }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
const cart = useCartStore();
const auth = useAuthStore();
function handleCheckout() {
  if (!auth.isLoggedIn) {
    navigateTo(`/users/login?backUrl=${route.fullPath}`);
  } else {
    navigateTo("/checkout/shipping");
  }
}
const provinces = ref([]);
const selectedProvinceCities = ref([]);
const form = ref({
  province: "",
  city: "",
  streetAndAlley: "",
  plaque: "",
  unit: "",
  postalCode: "",
  recipientName: "",
  phoneNumber: "",
});
const errors = ref({
  province: "",
  city: "",
  streetAndAlley: "",
  plaque: "",
  postalCode: "",
  recipientName: "",
  phoneNumber: "",
});
const activeDropdown = ref(null);

function toggleDropdown(type) {
  activeDropdown.value = activeDropdown.value === type ? null : type;
}

function selectOption(type, val) {
  if (type === "province") {
    form.value.province = val.name;
    selectedProvinceCities.value = val.cities;
    form.value.city = ""; // Reset city when province changes
  } else if (type === "city") {
    form.value.city = val;
  }
  toggleDropdown(type);
}

const loadProvinces = async () => {
  try {
    const data = await $fetch("/iran-provinces.json");
    provinces.value = data.provinces;
  } catch (error) {
    console.error("خطا در بارگذاری اطلاعات استان‌ها:", error);
  }
};
onMounted(() => {
  loadProvinces();
});

// Validation functions
function validateProvince() {
  if (!form.value.province) {
    errors.value.province = "استان را انتخاب کنید.";
    return false;
  }
  errors.value.province = "";
  return true;
}

function validateCity() {
  if (!form.value.city) {
    errors.value.city = "شهر را انتخاب کنید.";
    return false;
  }
  errors.value.city = "";
  return true;
}

function validateStreetAndAlley() {
  if (!form.value.streetAndAlley) {
    errors.value.streetAndAlley = "اینجا را خالی نگذارید.";
    return false;
  }
  errors.value.streetAndAlley = "";
  return true;
}

function validatePlaque() {
  if (!form.value.plaque) {
    errors.value.plaque = "اینجا را خالی نگذارید.";
    return false;
  }
  if (!/^\d+$/.test(form.value.plaque)) {
    errors.value.plaque = "پلاک باید عدد باشد.";
    return false;
  }
  errors.value.plaque = "";
  return true;
}

function validatePostalCode() {
  if (!form.value.postalCode) {
    errors.value.postalCode = "اینجا را خالی نگذارید.";
    return false;
  }
  if (!/^\d{10}$/.test(form.value.postalCode)) {
    errors.value.postalCode = "کدپستی باید ۱۰ رقمی باشد.";
    return false;
  }
  errors.value.postalCode = "";
  return true;
}

function validateRecipientName() {
  if (!form.value.recipientName) {
    errors.value.recipientName = "نام تحویل گیرنده را وارد کنید.";
    return false;
  }
  errors.value.recipientName = "";
  return true;
}

function validatePhoneNumber() {
  if (!form.value.phoneNumber) {
    errors.value.phoneNumber = "شماره تلفن را وارد کنید.";
    return false;
  }
  if (!/^\d+$/.test(form.value.phoneNumber)) {
    errors.value.phoneNumber = "شماره تلفن باید عدد باشد.";
    return false;
  }
  errors.value.phoneNumber = "";
  return true;
}

async function submitForm() {
  const isProvinceValid = validateProvince();
  const isCityValid = validateCity();
  const isStreetAndAlleyValid = validateStreetAndAlley();
  const isPlaqueValid = validatePlaque();
  const isPostalCodeValid = validatePostalCode();
  const isRecipientNameValid = validateRecipientName();
  const isPhoneNumberValid = validatePhoneNumber();

  if (
    !isProvinceValid ||
    !isCityValid ||
    !isStreetAndAlleyValid ||
    !isPlaqueValid ||
    !isPostalCodeValid ||
    !isRecipientNameValid ||
    !isPhoneNumberValid
  ) {
    return;
  }
}
</script>
