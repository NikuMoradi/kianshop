<template>
  <div>
    <!-- header - search bar -->
    <div class="sticky top-0 left-0 z-40 w-full bg-white px-4 py-3">
      <div class="flex h-10 items-center gap-2 rounded-lg bg-[#f5f5f5] px-3">
        <div class="cursor-pointer">
          <IconSearch color="#a1a3a8" width="24" height="24" />
        </div>

        <nuxt-link to="/search" class="flex grow items-center gap-1">
          <span class="360:text-[14px] text-[11px] font-bold text-[#a1a3a8]"
            >جستجو در</span
          >

          <span
            class="360:text-[14px] text-[11px] font-bold text-[var(--color-primary)]"
            >کیان تحریر</span
          >
        </nuxt-link>
      </div>
    </div>
    <!-- main content -->
    <div
      class="flex"
      :style="{ height: `calc(var(--window-inner-height) - 64px - 59px)` }"
    >
      <!-- Right Side -->
      <div class="no-scrollbar h-full w-25 overflow-y-auto">
        <div
          v-for="category in categories"
          :key="category.id"
          @click="setActiveCategory(category.id)"
          class="flex flex-col items-center justify-center border-b border-[#e0e0e2] px-2 py-3"
          :class="
            activeCategory == category.id
              ? 'bg-white text-[var(--color-primary)]'
              : 'border-l bg-[#F0F0F1] text-[#424750]'
          "
        >
          <Icon
            :name="`tabler:${category?.acf_data?.tabler_icon_name}`"
            size="19"
          />

          <span class="text-caption text-center whitespace-nowrap">
            {{ category.name }}
          </span>
        </div>
      </div>
      <!-- left side -->
      <div class="no-scrollbar mr-2 flex-1 overflow-y-auto px-3">
        <div v-for="(cat, index) in categories" :key="cat.id">
          <div
            v-show="activeCategory === cat.id"
            class="flex flex-col items-stretch"
          >
            <NuxtLink :to="`/categories/${cat.slug}`"
              ><div
                class="360:text-[11px] flex items-center gap-2 py-3 text-[8.8px] leading-[2.15] font-bold text-[#008eb2]"
              >
                همه محصولات {{ cat.name }}
                <IconChevronLeft
                  width="12px"
                  height="12px"
                  color="#008eb2"
                  :stroke="3"
                /></div
            ></NuxtLink>
            <div
              v-for="group in cat.children"
              :key="group.id"
              class="w-full border-b border-[#f0f0f1] py-2"
            >
              <div v-if="group.children.length" class="my-3">
                <div
                  class="flex grow cursor-pointer items-center justify-between"
                  @click="toggleAccordion(group.id)"
                >
                  <p
                    class="360:text-[12px] text-[9.6px] leading-[2.15] font-bold"
                  >
                    {{ group.name }}
                  </p>
                  <div v-if="isOpen(group.id)" class="flex rounded-full">
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
                  v-show="isOpen(group.id)"
                  class="grid grid-cols-3 flex-wrap gap-y-1"
                >
                  <NuxtLink
                    v-for="child in group.children"
                    :key="child.id"
                    :to="`/categories/${cat.slug}/${group.slug}/${child.slug}`"
                    class="text-caption flex flex-col items-center p-2 text-center text-[#0c0c0c]"
                  >
                    <div
                      class="mb-2 flex h-13 w-13 items-center justify-center rounded-full bg-[#f0f0f1]"
                    >
                      <div
                        class="flex h-12 w-12 items-center justify-center mix-blend-darken"
                      >
                        <img :src="`${child.image?.src || ''}`" />
                      </div>
                    </div>
                    {{ child.name }}
                  </NuxtLink>
                </div>
              </div>
              <div v-else>
                <nuxt-link
                  :to="`/categories/${cat.slug}/${group.slug}`"
                  class="360:text-[12px] flex grow cursor-pointer items-center justify-between text-[9.6px] leading-[2.15] font-bold"
                >
                  {{ group.name }}

                  <div
                    class="flex h-13 w-13 items-center justify-center rounded-2xl bg-[#f0f0f1]"
                  >
                    <div
                      class="flex h-12 w-12 items-center justify-center mix-blend-darken"
                    >
                      <img
                        :src="`${group.image?.src || ''}`"
                        class="rounded-2xl"
                      />
                    </div>
                  </div>
                </nuxt-link>
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
// change route  to home by screen resizing
import {
  IconChevronLeft,
  IconSearch,
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-vue";

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
  },
);
// get categories
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
// default previewed category
const activeCategory = ref(null);
const setActiveCategory = (id) => {
  activeCategory.value = id;
};

watchEffect(() => {
  if (categories.value?.length > 0 && activeCategory.value === null) {
    activeCategory.value = categories.value[0].id;
  }
});

// accordion's defualt config
const openedAccordions = ref(new Set());
const isOpen = (id) => openedAccordions.value.has(id);

const openFirstAccordion = (categories) => {
  // Only open first accordion if no accordions are currently open
  if (openedAccordions.value.size === 0) {
    categories.value.forEach((category) => {
      if (category?.children.length > 0) {
        openedAccordions.value.add(category.children[0].id);
      }
    });
  }
};
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
    JSON.stringify([...openedAccordions.value]),
  );
};
</script>

<style></style>
