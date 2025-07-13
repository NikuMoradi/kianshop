<template>
  <div class="group cursor-pointer">
    <swiper
      :modules="[Autoplay, Navigation, Pagination]"
      :loop="true"
      :autoplay="{ delay: 8000 }"
      :pagination="{ clickable: true }"
      :navigation="true"
      class="mySwiper"
    >
      <swiper-slide v-for="(banner, index) in banners" :key="index">
        <img
          :src="banner._embedded?.['wp:featuredmedia']?.[0]?.source_url"
          :alt="banner.title.rendered"
          class="1024:w-full 1024:h-[400px] 1024:rounded-none mx-auto h-[180px] w-full rounded-[20px] object-cover"
        />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const banners = await $fetch("/api/banners");
</script>

<style scoped>
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  background: #ffffff;
  padding: 10px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  border: #c0c2c5 solid 1px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}
/* chnage buttons position */
:deep(.swiper-button-prev) {
  right: 40px;
  top: 75%;
}

:deep(.swiper-button-next) {
  right: 90px;
  top: 75%;
}
/* Show buttons on hover */
.group:hover :deep(.swiper-button-next),
.group:hover :deep(.swiper-button-prev) {
  opacity: 1;
}
/* change arrow icon size */
:deep(.swiper-button-next::after),
:deep(.swiper-button-prev::after) {
  font-size: 12px;
  font-weight: 800;
  color: #3f4064;
}

:deep(.swiper-pagination-bullet-active) {
  background-color: white;
  width: 20px;
  border-radius: 20px;
}
</style>
