<template>
  <!-- Mobile -->
  <div
    class="flex flex-col justify-center px-5 py-4"
    v-if="$viewport.isLessThan('laptop')"
  >
    <button
      @click="scrollToTop"
      class="text-button-2 flex items-center justify-center text-[#19bfd3]"
    >
      <div>بازگشت به بالا</div>
      <div class="mr-2 flex">
        <IconChevronUp
          width="14px"
          height="14px"
          class="text-[#19bfd3]"
          :stroke="3"
        />
      </div>
    </button>
    <div>
      <!-- call -->
      <div
        class="flex w-full items-center justify-between border-b border-[#f0f0f1] py-3"
      >
        <div class="flex items-center justify-center gap-2">
          <div
            class="flex h-9 w-9 items-center justify-center rounded-full bg-[#F2F2F2]"
          >
            <IconHeadset
              width="24px"
              height="24px"
              class="text-[#424750]"
              :stroke="2"
            />
          </div>
          <div class="flex flex-col items-start gap-1">
            <p
              class="360:text-[12px] block text-[11px] leading-5 font-semibold text-[#424750]"
            >
              تماس با پشتیبانی
            </p>
            <span class="360:text-[12px] text-[11px] leading-5 text-[#81858B]">
              ۷ روز هفته، ۲۴ ساعت
            </span>
          </div>
        </div>
        <div class="flex items-center justify-center">
          <a
            href=""
            class="block rounded-full bg-[#F2F2F2] px-4 py-3 text-[11px] font-bold text-[#424750]"
            >تماس</a
          >
        </div>
      </div>
      <!-- app -->
      <div
        class="flex w-full items-center justify-between border-b border-[#f0f0f1] py-3"
      >
        <div class="flex items-center justify-center">
          <div class="h-[38px] w-[38px]">
            <img src="/images/footerlogo2.webp" class="rounded-full" />
          </div>
          <div class="flex flex-col items-start px-2">
            <p
              class="360:text-[12px] text-[11px] leading-6 font-semibold text-[#424750]"
            >
              اپلیکیشن دیجی‌کالا
            </p>
            <p class="360:text-[12px] text-[11px] leading-6 text-[#81858B]">
              تجربه خرید بهتر در
            </p>
          </div>
        </div>
        <div class="flex items-center justify-center">
          <a
            href=""
            class="block rounded-full bg-[#F2F2F2] px-4 py-3 text-[11px] font-bold text-[#424750]"
            >دانلود</a
          >
        </div>
      </div>
    </div>
    <!-- Accordion menu -->
    <div>
      <!-- col1 -->
      <div class="w-full border-b border-[#e0e0e2]">
        <div
          @click="toggleGuide(0)"
          class="flex grow cursor-pointer items-center justify-between py-3"
        >
          <p class="360:text-[13px] text-[12px] font-bold">با دیجی‌کالا</p>
          <div
            class="flex rounded-full"
            :class="showGuide[0] ? 'hidden' : 'block'"
          >
            <IconChevronDown
              width="20px"
              height="20px"
              class="text-[#424750]"
              :stroke="2.5"
            />
          </div>
          <div
            class="flex rounded-full"
            :class="showGuide[0] ? 'block' : 'hidden'"
          >
            <IconChevronUp
              width="20px"
              height="20px"
              class="text-[#424750]"
              :stroke="2.5"
            />
          </div>
        </div>
        <div :class="showGuide[0] ? 'block' : 'hidden'">
          <a
            class="mb-3 block text-[12px] leading-[2.15] text-[#424750]"
            href=""
            >اتاق خبر دیجی‌کالا
          </a>
          <a
            class="mb-3 block text-[12px] leading-[2.15] text-[#424750]"
            href=""
            >فرصت‌های شغلی</a
          >
          <a
            class="mb-3 block text-[12px] leading-[2.15] text-[#424750]"
            href=""
            >فروش در دیجی‌کالا</a
          >
          <a
            class="mb-3 block text-[12px] leading-[2.15] text-[#424750]"
            href=""
            >گزارش تخلف در دیجی‌کالا
          </a>
          <a
            class="mb-3 block text-[12px] leading-[2.15] text-[#424750]"
            href=""
            >تماس با دیجی‌کالا</a
          >
          <a
            class="mb-3 block text-[12px] leading-[2.15] text-[#424750]"
            href=""
            >درباره دیجی‌کالا
          </a>
        </div>
      </div>
      <!-- col2 -->
      <div class="w-full border-b border-[#e0e0e2]">
        <div
          @click="toggleGuide(1)"
          class="flex grow cursor-pointer items-center justify-between py-3"
        >
          <p class="360:text-[13px] text-[12px] font-bold">خدمات مشتریان</p>
          <div
            class="flex rounded-full"
            :class="showGuide[1] ? 'hidden' : 'block'"
          >
            <IconChevronDown
              width="20px"
              height="20px"
              class="text-[#424750]"
              :stroke="2.5"
            />
          </div>
          <div
            class="flex rounded-full"
            :class="showGuide[1] ? 'block' : 'hidden'"
          >
            <IconChevronUp
              width="20px"
              height="20px"
              class="text-[#424750]"
              :stroke="2.5"
            />
          </div>
        </div>
        <div :class="showGuide[1] ? 'block' : 'hidden'">
          <a
            class="mb-3 block text-[12px] leading-[2.15] text-[#424750]"
            href=""
            >پاسخ به پرسش‌های متداول
          </a>
          <a
            class="mb-3 block text-[12px] leading-[2.15] text-[#424750]"
            href=""
          >
            رویه‌های بازگرداندن کالا</a
          >
          <a
            class="mb-3 block text-[12px] leading-[2.15] text-[#424750]"
            href=""
            >شرایط استفاده</a
          >
          <a
            class="mb-3 block text-[12px] leading-[2.15] text-[#424750]"
            href=""
          >
            حریم خصوصی
          </a>
          <a
            class="mb-3 block text-[12px] leading-[2.15] text-[#424750]"
            href=""
          >
            گزارش باگ</a
          >
        </div>
      </div>
      <!-- col3 -->
      <div class="w-full">
        <div
          @click="toggleGuide(2)"
          class="flex grow cursor-pointer items-center justify-between py-3"
        >
          <p class="360:text-[13px] text-[12px] font-bold">
            راهنمای خرید از دیجی‌کالا
          </p>
          <div
            class="flex rounded-full"
            :class="showGuide[2] ? 'hidden' : 'block'"
          >
            <IconChevronDown
              width="20px"
              height="20px"
              class="text-[#424750]"
              :stroke="2.5"
            />
          </div>
          <div
            class="flex rounded-full"
            :class="showGuide[2] ? 'block' : 'hidden'"
          >
            <IconChevronUp
              width="20px"
              height="20px"
              class="text-[#424750]"
              :stroke="2.5"
            />
          </div>
        </div>
        <div :class="showGuide[2] ? 'block' : 'hidden'">
          <a
            class="mb-3 block text-[12px] leading-[2.15] text-[#424750]"
            href=""
          >
            نحوه ثبت سفارش
          </a>
          <a
            class="mb-3 block text-[12px] leading-[2.15] text-[#424750]"
            href=""
          >
            رویه ارسال سفارش</a
          >
          <a
            class="mb-3 block text-[12px] leading-[2.15] text-[#424750]"
            href=""
          >
            شیوه‌های پرداخت
          </a>
        </div>
      </div>
    </div>
  </div>
  <!-- Desktop -->
  <footer v-else class="mt-12 w-full border-t border-[#f0f0f1] py-8">
    <div class="container-4xl mx-auto px-5">
      <div class="flex items-center justify-between">
        <div class="h-[30px] w-[195px]">
          <img src="/images/full-horizontal.svg" alt="" />
        </div>
        <button
          @click="scrollToTop"
          class="text-button-2 flex items-center justify-center rounded-lg border border-[#e0e0e2] px-4 py-2 text-[#a1a3a8]"
        >
          <div>بازگشت به بالا</div>
          <div class="mr-2 flex">
            <IconChevronUp
              width="18px"
              height="18px"
              class="text-[#a1a3a8]"
              :stroke="3"
            />
          </div>
        </button>
      </div>
      <div class="mt-4 flex items-center">
        <p class="text-[12px] text-[#3f4064]">تلفن پشتیبانی ۶۱۹۳۰۰۰۰ - ۰۲۱</p>
        <div class="px-5 text-[#a1a3a8]">|</div>
        <p class="text-[12px] text-[#3f4064]">۰۲۱-۹۱۰۰۰۱۰۰</p>
        <div class="px-5 text-[#a1a3a8]">|</div>

        <p class="text-[12px] text-[#3f4064]">
          ۷ روز هفته، ۲۴ ساعته پاسخگوی شما هستیم
        </p>
      </div>
      <div class="my-8 flex items-center justify-between">
        <a class="flex grow flex-col items-center justify-center py-3">
          <div class="h-[56px] w-[56px]">
            <img src="/public//images/footer/express-delivery.svg" alt="" />
          </div>
          <p class="text-[11px] text-[#3f4064]">اﻣﮑﺎن ﺗﺤﻮﯾﻞ اﮐﺴﭙﺮس</p>
        </a>
        <a class="flex grow flex-col items-center justify-center py-3">
          <div class="h-[56px] w-[56px]">
            <img src="/public/images/footer/cash-on-delivery.svg" alt="" />
          </div>
          <p class="text-[11px] text-[#3f4064]">امکان پرداخت در محل</p>
        </a>
        <a class="flex grow flex-col items-center justify-center py-3">
          <div class="h-[56px] w-[56px]">
            <img src="/public/images/footer/support.svg" alt="" />
          </div>
          <p class="text-[11px] text-[#3f4064]">۷ روز ﻫﻔﺘﻪ، ۲۴ ﺳﺎﻋﺘﻪ</p>
        </a>
        <a class="flex grow flex-col items-center justify-center py-3">
          <div class="h-[56px] w-[56px]">
            <img src="/public/images/footer/days-return.svg" alt="" />
          </div>
          <p class="text-[11px] text-[#3f4064]">هفت روز ضمانت بازگشت کالا</p>
        </a>
        <a class="flex grow flex-col items-center justify-center py-3">
          <div class="h-[56px] w-[56px]">
            <img src="/public/images/footer/original-products.svg" alt="" />
          </div>
          <p class="text-[11px] text-[#3f4064]">ﺿﻤﺎﻧﺖ اﺻﻞ ﺑﻮدن ﮐﺎﻟﺎ</p>
        </a>
      </div>
      <div class="flex justify-between">
        <div class="flex flex-col space-y-2">
          <p class="text-[14px] leading-[2.15] font-bold text-[#3f4064]">
            با دیجی‌کالا
          </p>
          <a class="text-[14px] leading-[2.15] text-[#81858b]" href=""
            >اتاق خبر دیجی‌کالا
          </a>
          <a class="text-[14px] leading-[2.15] text-[#81858b]" href=""
            >فرصت‌های شغلی</a
          >
          <a class="text-[14px] leading-[2.15] text-[#81858b]" href=""
            >فروش در دیجی‌کالا</a
          >
          <a class="text-[14px] leading-[2.15] text-[#81858b]" href=""
            >گزارش تخلف در دیجی‌کالا
          </a>
          <a class="text-[14px] leading-[2.15] text-[#81858b]" href=""
            >تماس با دیجی‌کالا</a
          >
          <a class="text-[14px] leading-[2.15] text-[#81858b]" href=""
            >درباره دیجی‌کالا
          </a>
        </div>
        <div class="flex flex-col space-y-2">
          <p class="text-[14px] leading-[2.15] font-bold text-[#3f4064]">
            خدمات مشتریان
          </p>
          <a class="text-[14px] leading-[2.15] text-[#81858b]" href=""
            >پاسخ به پرسش‌های متداول
          </a>
          <a class="text-[14px] leading-[2.15] text-[#81858b]" href="">
            رویه‌های بازگرداندن کالا</a
          >
          <a class="text-[14px] leading-[2.15] text-[#81858b]" href=""
            >شرایط استفاده</a
          >
          <a class="text-[14px] leading-[2.15] text-[#81858b]" href="">
            حریم خصوصی
          </a>
          <a class="text-[14px] leading-[2.15] text-[#81858b]" href="">
            گزارش باگ</a
          >
        </div>
        <div class="flex flex-col space-y-2">
          <p class="text-[14px] leading-[2.15] font-bold text-[#3f4064]">
            راهنمای خرید از دیجی‌کالا
          </p>
          <a class="text-[14px] leading-[2.15] text-[#81858b]" href="">
            نحوه ثبت سفارش
          </a>
          <a class="text-[14px] leading-[2.15] text-[#81858b]" href="">
            رویه ارسال سفارش</a
          >
          <a class="text-[14px] leading-[2.15] text-[#81858b]" href="">
            شیوه‌های پرداخت
          </a>
        </div>
        <div class="flex grow-[0.1] flex-col">
          <div>
            <h4
              class="mb-3 text-[14px] leading-[2.15] font-bold text-[#3f4064]"
            >
              همراه ما باشید!
            </h4>
            <div class="flex w-full items-center gap-x-10">
              <a href="">
                <div class="flex">
                  <IconBrandInstagram
                    :stroke="2"
                    width="40px"
                    height="40px"
                    class="text-[#a1a3a8]"
                  />
                </div>
              </a>
              <a href="">
                <div class="flex">
                  <IconBrandTwitter
                    :stroke="2"
                    width="40px"
                    height="40px"
                    class="text-[#a1a3a8]"
                  /></div
              ></a>
              <a href="">
                <div class="flex">
                  <IconBrandLinkedin
                    :stroke="2"
                    width="40px"
                    height="40px"
                    class="text-[#a1a3a8]"
                  /></div
              ></a>
              <a href="">
                <div class="flex">
                  <IconMovie
                    :stroke="2"
                    width="40px"
                    height="40px"
                    class="text-[#a1a3a8]"
                  /></div
              ></a>
            </div>
          </div>
          <div class="mt-8">
            <h4
              class="mb-3 text-[14px] leading-[2.15] font-bold text-[#3f4064]"
            >
              با ثبت ایمیل، از جدید‌ترین تخفیف‌ها با‌خبر شوید
            </h4>
            <form class="flex w-full gap-2">
              <label class="formComponent w-full">
                <div class="grow rounded-lg bg-[#f0f0f1] px-3 py-3">
                  <input
                    v-model="email"
                    type="email"
                    name="email"
                    placeholder="ایمیل شما"
                    class="w-full bg-transparent text-[15px] font-normal text-[#3f4064] caret-[#ef4056] outline-none placeholder:text-[#A1A3A8]"
                  />
                </div>
                <!-- Error Message -->
                <p v-if="errorMessage" class="text-[10px] text-[#b2001a]">
                  {{ errorMessage }}
                </p>
              </label>
              <button
                :disabled="!isValidEmail"
                :class="
                  isValidEmail
                    ? 'bg-[#ef4056]'
                    : 'cursor-not-allowed bg-[#E0E0E2]'
                "
                class="flex h-[48px] items-center justify-center rounded-lg px-4 text-[13px] font-semibold text-white"
              >
                ثبت
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup>
import { ref, watch } from "vue";

const showGuide = ref([false, false, false]);
const toggleGuide = (index) => {
  showGuide.value[index] = !showGuide.value[index];
};
const email = ref("");
const errorMessage = ref("");
const isValidEmail = ref(false);
const validateEmail = (value) => {
  if (!value) {
    errorMessage.value = "اینجا را خالی نگذارید";
    return false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    errorMessage.value = "پست الکترونیک وارد شده درست نیست";
    return false;
  }
  errorMessage.value = "";
  return true;
};
// مشاهده تغییر مقدار ایمیل و اعتبارسنجی آن
watch(email, (newVal) => {
  isValidEmail.value = validateEmail(newVal);
});
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
  });
};
</script>
<style scoped>
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px #f0f0f1 inset !important;
  -webkit-text-fill-color: #3f4064 !important;
}
</style>
