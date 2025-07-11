<template>
  <div
    class="1024:bg-gray-100 flex h-screen flex-col items-center justify-center bg-white"
  >
    <SigninForm
      v-if="isLoginPageOpen"
      @switch-to-signup="isLoginPageOpen = false"
    />
    <!-- <SignupForm v-else @switch-to-login="isLoginPageOpen = true" /> -->
  </div>
</template>

<script setup>
const isLoginPageOpen = ref(true);
</script>
