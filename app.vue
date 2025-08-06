<!-- // const { data: categories, pending, error } = await
useFetch("/api/categories"); // const { data: products } = await
useFetch("/api/products"); // const { data: attributes } = await
useFetch("/api/attributes"); // const { data: comments } = await
useFetch("/api/comments"); // const { data: pages } = await
useFetch("/api/pages"); -->

<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout />
  </div>
</template>

<script setup>
//Since it's defined as async, you need to await it when calling it. So the layout should be:
await useAuthUser();
</script>
<style></style>
