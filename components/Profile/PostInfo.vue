```vue
<template>
  <div class="flex h-full flex-col">
    <form
      @submit.prevent="submitForm"
      class="scrollbar-custom flex h-full w-full flex-col gap-4 overflow-y-auto"
    >
      <div
        class="1024:pt-5 1024:gap-2 flex flex-col items-center rounded-lg border border-[#e0e0e2] bg-white px-8 pt-3"
      >
        <!-- Order Summary -->
        <div class="mb-4 w-full space-y-3">
          <h2 class="text-body-2-strong mb-2 text-[#62666d]">جزئیات سفارش</h2>
          <div class="flex w-full items-center justify-between">
            <p class="text-body-2-strong text-[#62666d]">وزن مرسوله</p>
            <div class="flex items-center gap-1">
              <span class="text-body-2-strong text-[#62666d]">
                {{ toPersianDigits((cart.getTotalWeight / 1000).toFixed(2)) }}
                کیلوگرم
              </span>
            </div>
          </div>
          <div class="flex w-full items-center justify-between">
            <p class="text-body-2-strong text-[#62666d]">
              قیمت اصلی کالاها ({{ toPersianDigits(cart.totalItems) }})
            </p>
            <div class="flex items-center gap-1">
              <span class="text-body-2-strong text-[#62666d]">
                {{ toPersianDigits(cart.getCartTotalWithoutDiscount) }}
              </span>
              <svg width="16" height="16" fill="#424750" color="#3f4064">
                <use href="/images/toman.svg#toman"></use>
              </svg>
            </div>
          </div>
          <div class="flex w-full items-center justify-between">
            <p class="text-body-2-strong text-[#62666d]">
              قیمت کالاها با احتساب تخفیف
            </p>
            <div class="flex items-center gap-1">
              <span class="text-body-2-strong text-[#23254e]">
                {{ toPersianDigits(cart.getCartTotalWithDiscount) }}
              </span>
              <svg width="16" height="16" fill="#424750" color="#3f4064">
                <use href="/images/toman.svg#toman"></use>
              </svg>
            </div>
          </div>
          <div class="flex w-full items-center justify-between text-[#2e7b32]">
            <p class="text-body-2-strong">سود شما از خرید</p>
            <div class="text-body-2-strong flex items-center gap-1">
              <span>({{ toPersianDigits(cart.getAllDiscounts) }}٪)</span>
              <span>
                {{
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
        </div>

        <!-- Shipping Information -->
        <div class="w-full">
          <h2 class="text-body-2-strong mb-4 text-[#62666d]">اطلاعات ارسال</h2>

          <!-- Shipping Method -->
          <label class="mb-4 w-full">
            <p class="text-body-2 text-[#3f4064]">
              شیوه ارسال <span class="text-[#ef4056]">*</span>
            </p>
            <div class="relative w-full">
              <div
                @click="toggleDropdown('shipping')"
                class="flex w-full cursor-pointer items-center justify-between rounded-lg bg-[#F0F0F1] px-3 py-3 text-right"
                :class="{ 'border border-[#b2001a]': errors.serviceName }"
              >
                <span class="text-[13.5px]">
                  {{ form.serviceName || "انتخاب کنید" }}
                </span>
                <svg class="h-6 w-6" fill="#424750" stroke-width="0">
                  <use href="/images/sprite.svg#dropdown" />
                </svg>
              </div>
              <ul
                v-if="activeDropdown === 'shipping'"
                v-click-outside="() => (activeDropdown = null)"
                class="scrollbar-custom absolute z-50 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border border-[#e0e0e2] bg-white shadow-lg"
              >
                <li
                  v-for="(s, index) in shippingOptions"
                  :key="index"
                  @click="selectOption('shipping', s)"
                  class="text-body-2 cursor-pointer px-3 py-2 text-right text-[#23254e] hover:bg-[#f5f5f5]"
                  :class="{
                    'bg-[#f5f5f5]': form.serviceName === s.serviceName,
                  }"
                >
                  {{ s.serviceName }}
                </li>
              </ul>
            </div>
            <p class="text-caption mt-2 min-h-1 text-[#b2001a]">
              {{ errors.serviceName }}
            </p>
          </label>

          <!-- Province Dropdown -->
          <label class="mb-4 w-full">
            <p class="text-body-2 text-[#3f4064]">
              استان <span class="text-[#ef4056]">*</span>
            </p>
            <div class="relative w-full">
              <div
                @click="toggleDropdown('province')"
                class="flex w-full cursor-pointer items-center justify-between rounded-lg bg-[#F0F0F1] px-3 py-3 text-right"
                :class="{ 'border border-[#b2001a]': errors.province }"
              >
                <span class="text-[13.5px]">
                  {{ form.province || "انتخاب کنید" }}
                </span>
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
          <label class="mb-4 w-full">
            <p class="text-body-2 text-[#3f4064]">
              شهر <span class="text-[#ef4056]">*</span>
            </p>
            <div class="relative w-full">
              <div
                @click="toggleDropdown('city')"
                class="flex w-full cursor-pointer items-center justify-between rounded-lg bg-[#F0F0F1] px-3 py-3 text-right"
                :class="{ 'border border-[#b2001a]': errors.city }"
              >
                <span class="text-[13.5px]">
                  {{ form.city || "انتخاب کنید" }}
                </span>
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
                  :key="c.id"
                  @click="selectOption('city', c)"
                  class="text-body-2 cursor-pointer px-3 py-2 text-right text-[#23254e] hover:bg-[#f5f5f5]"
                  :class="{ 'bg-[#f5f5f5]': form.city === c.name }"
                >
                  {{ c.name }}
                </li>
              </ul>
            </div>
            <p class="text-caption mt-2 min-h-1 text-[#b2001a]">
              {{ errors.city }}
            </p>
          </label>

          <!-- Calculate Shipping Button -->
          <div class="mb-4 flex justify-center">
            <button
              :disabled="isCalculating || !form.serviceName || !form.city"
              class="text-body-2-strong rounded-lg bg-[#19bfd3] px-6 py-3 text-white transition-colors hover:bg-[#17a8b9] disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              <span v-if="isCalculating">در حال محاسبه...</span>
              <span v-else>محاسبه هزینه ارسال</span>
            </button>
          </div>

          <!-- Shipping Cost Display -->
          <div
            v-if="shippingCost !== null"
            class="mb-4 flex items-center justify-between rounded-lg bg-[#f0f8ff] p-3"
          >
            <p class="text-body-2-strong text-[#62666d]">هزینه ارسال</p>
            <div class="flex items-center gap-1">
              <span class="text-body-2-strong text-[#23254e]">
                {{ toPersianDigits(shippingCost) }}
              </span>
              <svg width="16" height="16" fill="#424750" color="#3f4064">
                <use href="/images/toman.svg#toman"></use>
              </svg>
            </div>
          </div>
          <div
            v-if="shippingError"
            class="text-caption mb-4 text-center text-[#b2001a]"
          >
            {{ shippingError }}
          </div>

          <!-- Total Cost -->
          <div
            v-if="shippingCost !== null"
            class="mb-4 flex items-center justify-between rounded-lg bg-[#e6f4ea] p-3"
          >
            <p class="text-body-2-strong text-[#62666d]">
              جمع کل (کالاها + ارسال)
            </p>
            <div class="flex items-center gap-1">
              <span class="text-body-2-strong text-[#23254e]">
                {{
                  toPersianDigits(cart.getCartTotalWithDiscount + shippingCost)
                }}
              </span>
              <svg width="16" height="16" fill="#424750" color="#3f4064">
                <use href="/images/toman.svg#toman"></use>
              </svg>
            </div>
          </div>

          <!-- Address Fields -->
          <label class="mb-4 w-full">
            <p class="text-body-2 text-[#3f4064]">
              آدرس <span class="text-[#ef4056]">*</span>
            </p>
            <input
              type="text"
              v-model="form.address"
              @blur="validateAddress"
              class="text-body-1 w-full rounded-lg border-b-[2px] border-transparent bg-[#F0F0F1] px-3 py-2 text-right transition-colors outline-none focus:border-[#19bfd3]"
              :class="{ '!border-[#ef4056]': errors.address }"
            />
            <p class="text-caption mt-2 min-h-1 text-[#b2001a]">
              {{ errors.address }}
            </p>
          </label>

          <!-- Postal Code -->
          <label class="mb-4 w-full">
            <p class="text-body-2 text-[#3f4064]">
              کدپستی <span class="text-[#ef4056]">*</span>
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

          <!-- Recipient Info -->
          <div class="mb-2 flex w-full gap-2">
            <label class="w-1/2">
              <p class="text-body-2 text-[#3f4064]">
                نام تحویل گیرنده <span class="text-[#ef4056]">*</span>
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
            <label class="w-1/2">
              <p class="text-body-2 text-[#3f4064]">
                شماره موبایل گیرنده <span class="text-[#ef4056]">*</span>
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

          <!-- Submit Button -->
          <button
            v-if="auth.isLoggedIn"
            @click="handleCheckout"
            class="text-button-1 1024:block my-6 w-full rounded-lg bg-[var(--color-primary)] py-2 text-center text-white"
          >
            {{ auth.isLoggedIn ? "تایید و تکمیل سفارش" : "ورود و تکمیل سفارش" }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";

const cart = useCartStore();
const auth = useAuthStore();
const route = useRoute();

const provinces = ref([]);
const selectedProvinceCities = ref([]);
const shippingOptions = [
  { courierCode: "IR_POST", serviceType: "EXPRESS", serviceName: "پست پیشتاز" },
  {
    courierCode: "IR_POST",
    serviceType: "PRIORITY",
    serviceName: "پست سفارشی",
  },
  {
    courierCode: "IR_POST",
    serviceType: "POSTEXPRESS",
    serviceName: "پستبار اکسپرس",
  },
  { courierCode: "MAHEX", serviceType: "MAHEX", serviceName: "ماهکس" },
];
const form = ref({
  serviceName: "",
  serviceCode: "",
  serviceType: "",
  province: "",
  city: "",
  cityCode: "",
  address: "",
  postalCode: "",
  recipientName: "",
  phoneNumber: "",
});
const errors = ref({
  serviceName: "",
  province: "",
  city: "",
  address: "",
  postalCode: "",
  recipientName: "",
  phoneNumber: "",
});
const activeDropdown = ref(null);
const shippingCost = ref(null);
const shippingError = ref("");
const isCalculating = ref(false);

function toggleDropdown(type) {
  activeDropdown.value = activeDropdown.value === type ? null : type;
}

function selectOption(type, val) {
  if (type === "province") {
    form.value.province = val.name;
    selectedProvinceCities.value = val.cities;
    form.value.city = ""; // Reset city when province changes
    form.value.cityCode = ""; // Reset city code
  } else if (type === "city") {
    form.value.city = val.name;
    form.value.cityCode = val.id; // Store city code for API
  } else if (type === "shipping") {
    form.value.serviceName = val.serviceName;
    form.value.serviceCode = val.courierCode;
    form.value.serviceType = val.serviceType;
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

// const calculateShipping = async () => {
//   if (!form.value.serviceName || !form.value.city) {
//     errors.value.serviceName = !form.value.serviceName
//       ? "شیوه‌ی ارسال را انتخاب کنید."
//       : "";
//     errors.value.city = !form.value.city ? "شهر را انتخاب کنید." : "";
//     return;
//   }

//   isCalculating.value = true;
//   shippingError.value = "";
//   try {
//     const response = await $fetch("/api/calculateShipping", {
//       method: "POST",
//       body: {
//         to_city_code: form.value.cityCode,
//         weight: cart.getTotalWeight,
//         price: cart.getCartTotalWithDiscount,
//         serviceType: form.value.serviceType,
//         courierCode: form.value.serviceCode,
//       },
//     });

//     if (response.status === "success") {
//       shippingCost.value = 23; // Adjust based on actual API response
//     } else {
//       shippingError.value = response.message || "خطا در محاسبه هزینه ارسال";
//       shippingCost.value = null;
//     }
//   } catch (error) {
//     shippingError.value = error.message || "خطا در ارتباط با سرور";
//     shippingCost.value = null;
//   } finally {
//     isCalculating.value = false;
//   }
// };

// // Watch for changes in shipping method or city to recalculate shipping cost
// watch(
//   [() => form.value.serviceName, () => form.value.city],
//   () => {
//     if (form.value.serviceName && form.value.city) {
//       calculateShipping();
//     } else {
//       shippingCost.value = null; // Reset shipping cost if selections are incomplete
//       shippingError.value = "";
//     }
//   },
//   { immediate: false },
// );

// Validation functions
function validateShipping() {
  if (!form.value.serviceName) {
    errors.value.serviceName = "شیوه‌ی ارسال را انتخاب کنید.";
    return false;
  }
  errors.value.serviceName = "";
  return true;
}

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

function validateAddress() {
  if (!form.value.address) {
    errors.value.address = "اینجا را خالی نگذارید.";
    return false;
  }
  errors.value.address = "";
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
    errors.value.phoneNumber = "شماره موبایل را وارد کنید.";
    return false;
  }
  if (!/^\d+$/.test(form.value.phoneNumber)) {
    errors.value.phoneNumber = "شماره موبایل باید عدد باشد.";
    return false;
  }
  errors.value.phoneNumber = "";
  return true;
}

async function submitForm() {
  const isShippingValid = validateShipping();
  const isProvinceValid = validateProvince();
  const isCityValid = validateCity();
  const isAddressValid = validateAddress();
  const isPostalCodeValid = validatePostalCode();
  const isRecipientNameValid = validateRecipientName();
  const isPhoneNumberValid = validatePhoneNumber();

  if (
    !isShippingValid ||
    !isProvinceValid ||
    !isCityValid ||
    !isAddressValid ||
    !isPostalCodeValid ||
    !isRecipientNameValid ||
    !isPhoneNumberValid ||
    shippingCost.value === null
  ) {
    if (shippingCost.value === null) {
      shippingError.value = "لطفاً هزینه ارسال را محاسبه کنید.";
    }
    return;
  }

  // Proceed with form submission (e.g., send to checkout API)
  console.log("Form submitted:", {
    ...form.value,
    shippingCost: shippingCost.value,
  });
}

function handleCheckout() {
  if (!auth.isLoggedIn) {
    navigateTo(`/users/login?backUrl=${route.fullPath}`);
  } else {
    navigateTo("/checkout/shipping");
  }
}

onMounted(() => {
  loadProvinces();
});
</script>

<style scoped>
.scrollbar-custom::-webkit-scrollbar {
  width: 8px;
}
.scrollbar-custom::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.scrollbar-custom::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}
.scrollbar-custom::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
```
