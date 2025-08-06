<template>
  <div
    class="1024:px-0 1024:py-1 1024:border 1024:border-[#e0e0e2] 1024:rounded-lg 1024:sticky top-[140px] px-5 pb-[60px]"
  >
    <div
      class="1024:hidden sticky inset-x-0 top-0 z-10 flex items-center gap-1 bg-white py-2"
    >
      <IconUserCircle color="#3f4064"></IconUserCircle>
      <span class="text-h4 ml-1 text-[#3f4064]">پروفایل</span>
    </div>

    <div
      v-if="user.first_name && user.last_name"
      class="1024:border-none 1024:px-5 flex items-center justify-between border-b border-[#f0f0f1] py-6"
    >
      <div class="flex flex-col items-start">
        <p class="text-h5 text-[#23254e]">
          {{ user.first_name }} {{ user.last_name }}
        </p>
        <p class="text-body-1 -mt-2 text-[#a1a3a8]">
          {{ user.mobile_number }}
        </p>
      </div>

      <NuxtLink to="/profile/personal-info" class="flex">
        <svg class="h-[20px] w-[20px]" fill="#19bfd3" stroke-width="0">
          <use href="/images/sprite.svg#edit" />
        </svg>
      </NuxtLink>
    </div>

    <div
      v-else
      class="flex flex-col items-center justify-between rounded-lg bg-[#f9f9f9] p-3"
    >
      <div class="mb-3 flex flex-col items-start gap-2">
        <p class="text-body-1 text-center text-[#62666d]">
          برای استفاده از تمام امکانات سایت اطلاعات پروفایل خود را تکمیل کنید
        </p>
      </div>
      <NuxtLink
        to="/profile/personal-info"
        class="flex shrink-0 items-center justify-end gap-1 rounded-md bg-[#19bfd3] px-2 py-1 text-white transition-colors hover:bg-[#0ea5b7]"
      >
        <span class="text-button-2">تکمیل پروفایل</span>

        <IconChevronLeft size="18px"></IconChevronLeft>
      </NuxtLink>
    </div>
    <div v-if="$viewport.isLessThan('laptop')">
      <div class="flex items-center py-3">
        <div class="relative">
          <p class="text-h5 text-[#0c0c0c]">سفارش‌های من</p>
          <div
            class="absolute top-10 h-[2px] w-[80%] bg-[var(--color-primary)]"
          ></div>
        </div>
      </div>
      <!-- orders -->
      <div class="my-7 grid grid-cols-3 gap-3">
        <a href="" class="flex flex-col items-center">
          <div class="relative flex items-center justify-center">
            <img src="/public/images/status-processing.svg" alt="" />
            <div
              class="text-caption-strong absolute bottom-0 left-0 flex h-5 w-5 items-center justify-center rounded-sm bg-[#f2f2f2] text-[#3f4064]"
            >
              {{ toPersianDigits(1) }}
            </div>
          </div>
          <span class="text-body-2-strong">جاری</span>
        </a>

        <a
          href=""
          class="flex flex-col items-center border-r border-l border-[#f0f0f1]"
        >
          <div class="relative flex items-center justify-center">
            <img src="/public/images/status-delivered.svg" alt="" />
            <div
              class="text-caption-strong absolute bottom-0 left-0 flex h-5 w-5 items-center justify-center rounded-sm bg-[#f2f2f2] text-[#3f4064]"
            >
              {{ toPersianDigits(25) }}
            </div>
          </div>
          <span class="text-body-2-strong">تحویل شده</span>
        </a>
        <a href="" class="flex flex-col items-center">
          <div class="relative flex items-center justify-center">
            <img src="/public/images/status-returned.svg" alt="" />
            <div
              class="text-caption-strong absolute bottom-0 left-0 flex h-5 w-5 items-center justify-center rounded-sm bg-[#f2f2f2] text-[#3f4064]"
            >
              {{ toPersianDigits(0) }}
            </div>
          </div>
          <span class="text-body-2-strong">مرجوع شده</span>
        </a>
      </div>
    </div>
    <!-- list of items -->
    <div>
      <ProfileMenuItem
        v-for="(item, index) in menuItems"
        :key="item.label"
        v-bind="item"
        :is-last="index === menuItems.length - 1"
        @click="item.action && item.action()"
      />
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
import { IconChevronLeft, IconUserCircle } from "@tabler/icons-vue";

const menuItems = [
  {
    to: "/profile/orders",
    icon: "order",
    label: "سفارش‌ها",
  },
  // {
  //   to: "/profile/lists",
  //   icon: "favoriteOff",
  //   label: "لیست‌های من",
  // },
  {
    to: "/profile/addresses",
    icon: "order",
    label: "آدرس‌های من",
  },
  {
    to: "/profile/personal-info",
    icon: "profileOff",
    label: "اطلاعات حساب کاربری",
  },
  {
    icon: "registerationSignOut",
    label: "خروج",
    action: handleLogout,
  },
];

const auth = useAuthStore();
const user = auth.user;

// console.log("📞 Mobile from API:", user.meta?.mobile_number || "");

function handleLogout() {
  auth.logout();
  navigateTo(`/users/login?backUrl=${route.fullPath}`);
}
</script>
