<template>
  <component
    :is="$viewport.isLessThan('laptop') ? MobileProduct : DesktopProduct"
  />
</template>

<script setup>
// Lazy Load
const DesktopProduct = defineAsyncComponent(
  () => import("@/components/product/DesktopProduct.vue"),
);
const MobileProduct = defineAsyncComponent(
  () => import("@/components/product/MobileProduct.vue"),
);
</script>
