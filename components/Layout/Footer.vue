<template>
  <footer class="container-4xl relative mt-12 border-t border-gray-200 pt-8">
    <img
      src="/images/footer/footer-waves.svg"
      alt="waves"
      class="pointer-events-none absolute inset-0 h-full w-full object-cover"
      aria-hidden="true"
    />
    <div class="relative z-10 px-5">
      <div class="1024:w-2/3 flex w-full flex-col gap-5">
        <div>
          <h1 class="text-button-1">درباره فروشگاه کیان</h1>
          <p class="text-body-2 text-[#81858b]">
            فروشگاه اینترنتی کبان بازار آنلاین لوازم تحریر است؛ که در تلاش است
            رابطه بلند مدتی را با مشتریان خود برقرار کند. از جمله اهداف ما ارائه
            محصولات باکیفیت با حداقل قیمت ممکن است. اکلیل عاملیت فروش نوشت افزار
            فانتزی و اداری بوده که هر دو شیوه فروش اینترنتی و حضوری را در بر
            دارد. شما می توانید با مقایسه قیمت و کیفیت محصولات لوازم التحریر
            خودتان تصمیم به خرید از اکلیل بگیرید. ما تلاش کرده ایم تمامی نیازهای
            نوشت افزار شما را آنلاین شاپ برطرف کنیم. از جمله محصولاتی که در کیان
            ارائه می شود می توان به؛ نوشت افزار( ماژیک، مداد، خودکار و روان
            نویس، تراش، پاک کن، غلط گیر، مداد نوکی، چسب، قیچی، کاتر) ابزار
            نقاشی، ماژیک رنگ آمیزی، مداد شمعی، مداد رنگی) ابزار طراحی و مهندسی(
            خط کش، پرگار، گونیا و نقاله، ماشین حساب، متر) دفتر، کاغذ و مقوا
            (دفتر، دفترچه یادداشت، دفتر پلنر، بوک مارک، کارت پستال) کیف و کوله
            پشتی( جامدادی، کیف و کوله مدرسه، کیف غذا، ظرف غذا) و ... اشاره داشت.
            با وجود تنوع بسیار بالای محصولات کیان شما می توانید یک خرید جامع و
            کامل را تجربه کنید.
          </p>
        </div>
        <div class="flex w-full flex-col items-start">
          <div class="flex items-start gap-2">
            <IconMap class="mt-1 h-5 w-5 flex-shrink-0"></IconMap>
            <span class="text-button-1">
              <span>
                گیلان، آستانه اشرفیه، خیابان مشیر، مجتمع مشیر، طبقه همکف، پلاک35
              </span>
            </span>
          </div>
          <div class="flex items-center whitespace-nowrap hover:opacity-80">
            <IconPhoneCall class="mt-1 h-5 w-5 flex-shrink-0"></IconPhoneCall>
            <a href="tel:+1234567890" class="text-button-1 mr-2">
              021-91691267
            </a>
          </div>
          <div class="flex items-center whitespace-nowrap hover:opacity-80">
            <IconMail class="mt-1 h-5 w-5 flex-shrink-0" />
            <a href="mailto:info@akliland.com" class="text-button-1 mr-2">
              info@akliland.com
            </a>
          </div>
          <div class="flex items-center whitespace-nowrap hover:opacity-80">
            <IconBrandInstagram class="mt-1 h-5 w-5 flex-shrink-0" />
            <a
              href="https://instagram.com/KianShop"
              target="_blank"
              rel="noopener noreferrer"
              class="text-button-1 mr-2"
            >
              KianShop@
            </a>
          </div>
        </div>
        <div>
          <img src="/public/images/footer/enamad.png" alt="" />
        </div>
      </div>
      <div
        class="text-body-2 relative flex items-center justify-between py-4 text-[#3f4064]"
      >
        <span>تمامی حقوق متعلق به کیان تحریر می باشد. </span>
        <ScrollToTop></ScrollToTop>
      </div>
    </div>
  </footer>
</template>

<script setup>
import {
  IconMap,
  IconPhoneCall,
  IconMail,
  IconBrandInstagram,
} from "@tabler/icons-vue";
</script>
