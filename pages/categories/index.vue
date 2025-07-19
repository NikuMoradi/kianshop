<template>
  <div>
    <!-- header - search bar -->
    <div class="w-full sticky top-0 left-0 py-3 px-4 z-40 bg-white">
      <div class="flex items-center gap-2 rounded-lg bg-[#f5f5f5] px-3 h-10">
        <div class="cursor-pointer">
          <IconSearch color="#a1a3a8" width="24" height="24" />
        </div>

        <nuxt-link to="/search" class="flex grow gap-1 items-center">
          <span class="text-[#a1a3a8] text-[11px] 360:text-[14px] font-bold"
            >جستجو در</span
          >
          <div class="inline-block w-[61px] h-[16px] line-[0]">
            <img
              class="h-full w-full object-contain"
              src="/images/typography.svg"
              alt="دیجی‌کالا"
            />
          </div>
        </nuxt-link>
        <div class="cursor-pointer">
          <IconCameraSearch color="#7f53ef" width="24" height="24" />
        </div>
      </div>
    </div>
    <!-- main content -->
    <div
      class="flex"
      :style="{ height: `calc(var(--window-inner-height) - 64px - 59px)` }"
    >
      <!-- Right Side -->
      <div class="w-[100px] h-full no-scrollbar overflow-y-auto">
        <div
          v-for="category in categories"
          :key="category.id"
          @click="setActiveCategory(category.id)"
          class="flex flex-col items-center justify-center border-[#e0e0e2] border-b px-2 py-3"
          :class="
            activeCategory == category.id
              ? 'bg-white text-[#ef4056]'
              : 'bg-[#F0F0F1] text-[#424750] border-l'
          "
        >
          <svg class="w-[16px] h-[16px]" fill="currentColor" stroke-width="0">
            <use :xlink:href="`/images/sprite.svg#${category.icon}`" />
          </svg>

          <span class="text-caption text-center">
            {{ category.name }}
          </span>
        </div>
      </div>
      <!-- left side -->
      <div class="flex-1 px-3 mr-2 overflow-y-auto no-scrollbar">
        <div
          v-for="(category, index) in categories.slice(0, 2)"
          :key="category.id"
        >
          <div
            v-show="activeCategory === category.id"
            class="flex flex-col items-stretch"
          >
            <NuxtLink :to="`/categories/${category.slug}`"
              ><div
                class="flex items-center gap-2 py-3 text-[#008eb2] text-[8.8px] 360:text-[11px] leading-[2.15] font-bold"
              >
                همه محصولات {{ category.name }}
                <IconChevronLeft
                  width="12px"
                  height="12px"
                  color="#008eb2"
                  :stroke="3"
                /></div
            ></NuxtLink>
            <div
              v-for="subcategory in category.subcategories"
              :key="subcategory.id"
              class="py-3 w-full border-b border-[#f0f0f1]"
            >
              <div
                class="flex justify-between items-center cursor-pointer grow"
                @click="toggleAccordion(subcategory.id)"
              >
                <p
                  class="text-[9.6px] 360:text-[12px] font-bold leading-[2.15]"
                >
                  {{ subcategory.name }}
                </p>
                <div v-if="isOpen(subcategory.id)" class="flex rounded-full">
                  <IconChevronUp
                    width="18px"
                    height="18px"
                    class="text-[#424750]"
                    :stroke="2.5"
                  />
                </div>
                <div v-else class="flex rounded-full">
                  <IconChevronDown
                    width="18px"
                    height="18px"
                    class="text-[#424750]"
                    :stroke="2.5"
                  />
                </div>
              </div>
              <div
                v-show="isOpen(subcategory.id)"
                class="grid grid-cols-3 gap-y-1 flex-wrap"
              >
                <NuxtLink
                  v-for="subSubcategory in subcategory.subcategories"
                  :key="subSubcategory.id"
                  :to="`/categories/${category.slug}/${subSubcategory.slug}`"
                  class="flex flex-col items-center p-2 text-center text-caption text-[#0c0c0c]"
                >
                  <div
                    class="flex items-center justify-center bg-[#f0f0f1] rounded-full w-[64px] h-[64px] mb-2"
                  >
                    <div
                      class="flex items-center justify-center w-[45px] h-[45px] mix-blend-darken"
                    >
                      <img
                        :src="`/images/subcategory-icons/${subSubcategory.icon}.png`"
                      />
                    </div>
                  </div>
                  {{ subSubcategory.name }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <MobileNavigation v-if="$viewport.isLessThan('laptop')" />
  </div>
</template>

<script setup>
const { $viewport } = useNuxtApp();
const route = useRoute();

watch(
  () => $viewport.isGreaterOrEquals("laptop"),
  (newval) => {
    if (newval && route.path === "/categories") {
      navigateTo("/");
    }
  },
  {
    immediate: true,
  }
);
const activeCategory = ref(null);

const { fetchCategories } = useCategories();
const { data: categories } = await useAsyncData("categories", fetchCategories);
watchEffect(() => {
  if (
    categories.value &&
    categories.value.length > 0 &&
    activeCategory.value === null
  ) {
    activeCategory.value = categories.value[0].id;
  }
});

const setActiveCategory = (id) => {
  activeCategory.value = id;
};

// accordions in category
const openedAccordions = ref(new Set());

// Load saved accordion state from localStorage
onMounted(() => {
  const savedAccordions = localStorage.getItem("openedAccordions");
  if (savedAccordions) {
    openedAccordions.value = new Set(JSON.parse(savedAccordions));
  }
  openFirstAccordion(categories);
});

const toggleAccordion = (id) => {
  if (openedAccordions.value.has(id)) {
    openedAccordions.value.delete(id);
  } else {
    openedAccordions.value.add(id);
  }
  // Save accordion state to localStorage
  localStorage.setItem(
    "openedAccordions",
    JSON.stringify([...openedAccordions.value])
  );
};

const isOpen = (id) => openedAccordions.value.has(id);

const openFirstAccordion = (categories) => {
  // Only open first accordion if no accordions are currently open
  if (openedAccordions.value.size === 0) {
    categories.value.forEach((category) => {
      if (category.subcategories && category.subcategories.length > 0) {
        openedAccordions.value.add(category.subcategories[0].id);
      }
    });
  }
};
</script>

<style></style>
