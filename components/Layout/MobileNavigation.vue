<template>
  <div
    class="fixed right-0 bottom-0 left-0 z-50 flex w-full border-t-2 border-[#e5e5e5] bg-[#fff] pt-1 pb-2"
  >
    <nuxt-link
      to="/"
      class="flex flex-1 flex-col items-center justify-start transition-transform duration-300 ease-in-out"
    >
      <IconHomeFilled
        v-if="$route.path === '/'"
        class="text-[var(--color-primary)]"
      />
      <IconHome v-else class="text-[#a1a3a8]" />
      <p
        :class="{
          'text-caption font-bold text-[var(--color-primary)]':
            $route.path === '/',
          'text-caption text-[#a1a3a8]': $route.path !== '/',
        }"
      >
        خانه
      </p>
    </nuxt-link>

    <nuxt-link
      to="/categories"
      class="flex flex-1 flex-col items-center justify-start transition-transform duration-300 ease-in-out"
    >
      <IconCategoryFilled
        v-if="$route.path === '/categories'"
        class="text-[var(--color-primary)]"
      />
      <IconCategory v-else class="text-[#a1a3a8]" />
      <p
        :class="{
          'text-caption font-bold text-[var(--color-primary)]':
            $route.path === '/categories',
          'text-caption text-[#a1a3a8]': $route.path !== '/categories',
        }"
      >
        دسته بندی
      </p>
    </nuxt-link>

    <nuxt-link
      to="/checkout/cart"
      class="flex flex-1 flex-col items-center justify-start transition-transform duration-300 ease-in-out"
    >
      <IconShoppingCartFilled
        v-if="$route.path === '/checkout/cart'"
        class="scale-x-[-1] text-[var(--color-primary)]"
      />
      <IconShoppingCart v-else class="scale-x-[-1] text-[#a1a3a8]" />
      <p
        :class="{
          'text-caption font-bold text-[var(--color-primary)]':
            $route.path === '/checkout/cart',
          'text-caption text-[#a1a3a8]': $route.path !== '/checkout/cart',
        }"
      >
        سبد خرید
      </p>
    </nuxt-link>

    <nuxt-link
      to="/profile"
      class="flex flex-1 flex-col items-center justify-start transition-transform duration-300 ease-in-out"
    >
      <IconUserFilled
        v-if="$route.path === '/profile'"
        class="text-[var(--color-primary)]"
      />
      <IconUser v-else class="text-[#a1a3a8]" />
      <p
        :class="{
          'text-caption font-bold text-[var(--color-primary)]':
            $route.path === '/profile',
          'text-caption text-[#a1a3a8]': $route.path !== '/profile',
        }"
      >
        حساب کاربری
      </p>
    </nuxt-link>
  </div>
</template>

<script setup>
import {
  IconHome,
  IconHomeFilled,
  IconCategory,
  IconCategoryFilled,
  IconShoppingCart,
  IconShoppingCartFilled,
  IconUser,
  IconUserFilled,
} from "@tabler/icons-vue";
</script>
