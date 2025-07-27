pages/categories/[...slugs].vue
<script setup>
const route = useRoute();

const slugs = route.params.slugs;
const categorySlug = slugs.at(-1);

const {
  data: result,
  pending,
  error,
} = await useLazyFetch(`/api/productsByCategory`, {
  query: { slug: categorySlug },
  default: () => ({ products: [], category: null }),
  server: true,
});

// Computed properties
const products = computed(() => result.value?.products || []);
const category = computed(() => result.value?.category);
</script>

<template>
  <div class="p-4">
    <h1 class="mb-4 text-xl font-bold">
      Products for category: {{ category?.name || slugs.join(" / ") }}
    </h1>
    <Breadcrumb></Breadcrumb>

    <!-- Loading State -->
    <div v-if="pending" class="py-8 text-center">
      <div
        class="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"
      ></div>
      <p class="mt-2">در حال بارگذاری...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="py-8 text-center text-red-600">
      <p>خطا در بارگذاری محصولات: {{ error.message }}</p>
      <button
        @click="refresh()"
        class="mt-2 rounded bg-blue-600 px-4 py-2 text-white"
      >
        تلاش مجدد
      </button>
    </div>

    <!-- Products List -->
    <div v-else-if="products?.length" class="grid gap-4">
      <div
        v-for="product in products"
        :key="product.id"
        class="rounded-lg border p-4 transition-shadow hover:shadow-lg"
      >
        <div class="flex gap-4">
          <!-- Product Image -->
          <div v-if="product.images?.[0]" class="flex-shrink-0">
            <img
              :src="product.images[0].src"
              :alt="product.name"
              class="h-24 w-24 rounded object-cover"
            />
          </div>

          <!-- Product Info -->
          <div class="flex-1">
            <h2 class="mb-2 text-lg font-semibold">{{ product.name }}</h2>
            <div
              v-if="product.short_description"
              v-html="product.short_description"
              class="mb-2 line-clamp-2 text-gray-600"
            ></div>

            <!-- Price -->
            <div class="flex items-center gap-2">
              <span
                v-if="product.sale_price"
                class="text-lg font-bold text-green-600"
              >
                {{ product.sale_price }} تومان
              </span>
              <span v-else class="text-lg font-bold">
                {{ product.regular_price }} تومان
              </span>

              <span
                v-if="product.sale_price"
                class="text-sm text-gray-500 line-through"
              >
                {{ product.regular_price }} تومان
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="py-8 text-center">
      <p class="text-gray-600">هیچ محصولی در این دسته‌بندی یافت نشد.</p>
    </div>
  </div>
</template>
