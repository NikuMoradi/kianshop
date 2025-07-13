<script setup>
// user
const route = useRoute();
const isUserMenuOpen = ref(false);
const showLoginStatus = ref(false);
const menuItems = ref([
  { link: "/profile/orders", icon: "IconShoppingBag", text: "سفارش‌ها" },
  { link: "/profile/lists", icon: "IconHeart", text: "لیست‌ها" },
  {
    icon: "IconLogout",
    text: "خروج از حساب کاربری",
    action: handleLogout,
  },
]);
const { data: user } = await useAsyncData("user", () =>
  $fetch("/api/auth/user").catch(() => null),
);
const auth = useAuthStore();
onMounted(() => {
  if (user.value && !auth.user) {
    auth.user = user.value;
  }
});
function handleLogout() {
  auth.logout();
  showLoginStatus.value = true;
  setTimeout(() => {
    showLoginStatus.value = false;
  }, 3000);
}

//categories
const { data: flatCategories } = await useAsyncData("categories", () =>
  $fetch("/api/categories"),
);
function buildCategoryTree(categories) {
  const map = new Map();
  const roots = [];

  categories.forEach((cat) => {
    map.set(cat.id, { ...cat, children: [] });
  });

  map.forEach((cat) => {
    if (cat.parent === 0) {
      roots.push(cat);
    } else {
      const parent = map.get(cat.parent);
      if (parent) parent.children.push(cat);
    }
  });

  return roots;
}
const categories = computed(() => buildCategoryTree(flatCategories.value));
const hoveredCategory = ref(null);
const { data: amazingInfo } = await useAsyncData("amazingInfo", () =>
  $fetch("/api/amazingInfo"),
);
</script>

<template>
  <header class="fixed z-10 w-full">
    <!-- Top Banner -->
    <div
      class="flex h-[48px] w-full items-center justify-center bg-gradient-to-l from-[#b8c0ff] to-[#858ae3]"
    >
      <AmazingTimer></AmazingTimer>
      <span class="text-h4 mr-2 tracking-tight text-white"
        >{{ amazingInfo?.amazing_offers_text }}
      </span>
    </div>
    <!-- Main Header -->
    <div
      class="border-complete-b flex w-full items-center justify-between bg-white px-4 py-4"
    >
      <!-- Right -->
      <div class="flex flex-1 items-center gap-4">
        <img
          src="public/images/logo-header-2.png"
          alt="ProRoyal Logo"
          class="h-auto w-46 object-contain"
        />
        <!-- search input -->
        <div
          class="flex w-full max-w-[800px] items-center rounded-lg border border-transparent bg-[#F0F0F1] transition focus-within:border-[#e5e5e5]"
        >
          <div class="flex px-4">
            <svg class="h-[20px] w-[20px]" fill="#424750">
              <use href="/public/images/sprite.svg#searchSearch" />
            </svg>
          </div>
          <input
            type="text"
            class="text-body-1 h-11 w-full bg-transparent text-gray-700 placeholder:text-gray-400"
            placeholder="جستجوی محصول ..."
          />
        </div>
      </div>

      <div class="flex items-center justify-end">
        <template v-if="user">
          <!-- user icon -->
          <div class="relative">
            <div
              class="flex rounded-lg p-2"
              :class="{ 'bg-[#c3c9fb57]': isUserMenuOpen }"
              @click="isUserMenuOpen = !isUserMenuOpen"
            >
              <IconUser :stroke="2" color="#424750" />
              <IconCaretDownFilled width="15px" height="20px" color="#424750" />
            </div>
            <!-- drop down user info -->
            <div
              v-if="isUserMenuOpen"
              v-click-outside="() => (isUserMenuOpen = false)"
              class="absolute left-0 z-1 w-[256px] rounded bg-[#fff] pb-2 text-base leading-[2.15] font-semibold text-[#404040] shadow-lg"
            >
              <nuxt-link
                to="/profile"
                class="block text-[#404040] transition-all duration-300 hover:bg-[#f5f5f5]"
              >
                <div
                  class="border-complete-b mx-4 flex items-center justify-between py-4"
                >
                  <span>{{ user.first_name }} {{ user.last_name }}</span>
                  <!-- <span v-else> پروفایل</span> -->
                  <div class="flex">
                    <IconChevronLeft
                      width="18px"
                      height="18px"
                      class="text-[#424750]"
                      :stroke="3"
                    />
                  </div>
                </div>
              </nuxt-link>
              <ul>
                <li
                  v-for="(item, index) in menuItems"
                  :key="index"
                  class="w-full cursor-pointer px-4 transition-all duration-300 hover:bg-[#f5f5f5]"
                >
                  <nuxt-link v-if="item.link" :to="item.link">
                    <div class="flex">
                      <div class="flex w-12 items-center py-2">
                        <component :is="item.icon" color="#424750" />
                      </div>
                      <div
                        class="flex flex-1 py-2"
                        :class="{
                          'border-complete-b': index !== menuItems.length - 1,
                        }"
                      >
                        <span>{{ item.text }}</span>
                      </div>
                    </div>
                  </nuxt-link>
                  <div v-else @click="item.action" class="flex">
                    <div class="flex w-12 items-center py-2">
                      <component :is="item.icon" color="#424750" />
                    </div>
                    <div
                      class="flex flex-1 py-2"
                      :class="{
                        'border-complete-b': index !== menuItems.length - 1,
                      }"
                    >
                      <span>{{ item.text }}</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <span class="mx-3 h-6 w-[1px] bg-[#e5e5e5]"></span>
          <!-- Shopping cart -->
          <NuxtLink
            to="/checkout/cart"
            class="relative flex shrink-0 items-center justify-center p-2"
          >
            <div class="flex">
              <IconShoppingCart
                color="#424750"
                :stroke="2"
                class="scale-x-[-1]"
              />
              <div
                class="absolute top-0 right-0 flex h-[20px] w-[20px] items-center justify-center rounded-[6px] border-[1px] border-white bg-[var(--color-primary)] text-[12px] text-white"
              >
                <!-- <div>{{ toPersianDigits(cart.totalItems) }}</div> -->
                {{ toPersianDigits(2) }}
              </div>
            </div>
          </NuxtLink>
        </template>
        <template v-else>
          <nuxt-link :to="`/users/login?backUrl=${route.fullPath}`">
            <div
              class="flex shrink-0 items-center justify-center gap-x-2 rounded-lg border px-4 py-2"
            >
              <div class="flex shrink-0">
                <svg class="h-[24px] w-[24px]" fill="#424750" stroke-width="0">
                  <use href="public/images/sprite.svg#registerationSignIn" />
                </svg>
              </div>
              <span class="text-button-2 shrink-0 flex-nowrap text-[#0c0c0c]">
                ورود | ثبت‌نام
              </span>
            </div>
          </nuxt-link>
        </template>
      </div>
    </div>
    <nav class="relative bg-white">
      <div class="inline-flex gap-8 px-8 py-2">
        <div
          v-for="cat in categories"
          :key="cat.id"
          class="text-button-1 relative flex cursor-pointer items-center py-1 text-[#3f4064] transition-colors duration-200 hover:text-[var(--color-primary)]"
          @mouseenter="hoveredCategory = cat"
          @mouseleave="hoveredCategory = null"
        >
          <component
            v-if="cat?.acf_data.tabler_icon_name"
            :is="cat.acf_data.tabler_icon_name"
            class="h-5 w-5 pl-1"
          />
          <span>{{ cat.name }}</span>

          <transition name="fade">
            <ul
              v-if="hoveredCategory?.id === cat.id"
              class="border-[var(--color-primary) absolute top-9 right-0 w-52 rounded-lg border-t-2 bg-white shadow-lg"
            >
              <li v-for="group in hoveredCategory?.children" :key="group.id">
                <div v-if="group?.children?.length" class="group">
                  <details
                    class="group [&_summary::-webkit-details-marker]:hidden"
                  >
                    <summary
                      class="text-menu flex cursor-pointer items-center justify-between rounded-lg px-4 py-1 text-[#3f4064] hover:bg-[var(--color-light)] hover:text-gray-800"
                    >
                      {{ group.name }}

                      <IconChevronDown
                        class="ml-1 shrink-0 text-gray-400 transition-transform duration-200 group-open:rotate-180"
                        size="15"
                        stroke="2"
                      />
                    </summary>

                    <ul class="mt-1 px-4 pb-2">
                      <li v-for="child in group.children" :key="child.id">
                        <NuxtLink
                          to="#"
                          class="text-body-1 block rounded px-2 py-1 text-[#81858b] transition hover:bg-gray-100 hover:text-gray-700"
                        >
                          {{ child.name }}
                        </NuxtLink>
                      </li>
                    </ul>
                  </details>
                </div>

                <div v-else>
                  <NuxtLink
                    to="#"
                    class="text-menu custom-ellipsis flex cursor-pointer items-center justify-between rounded-lg px-4 py-1 text-[#3f4064] hover:bg-[var(--color-light)] hover:text-gray-800"
                  >
                    {{ group.name }}
                  </NuxtLink>
                </div>
              </li>
            </ul>
          </transition>
        </div>
      </div>
    </nav>
  </header>
  <BaseToast
    :is-visible="showLoginStatus"
    message="شما از حساب کاربری خود خارج شدید."
    @close="showLoginStatus = false"
  />
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
