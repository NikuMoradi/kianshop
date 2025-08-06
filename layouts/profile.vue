<template>
  <div v-if="$viewport.isGreaterOrEquals('laptop')">
    <Header />
    <div class="container-xl mx-auto pt-[168px]">
      <div class="grid grid-cols-7 gap-4 px-8 py-8">
        <!-- Sidebar -->
        <div class="col-span-2">
          <ProfileMenu />
        </div>

        <!-- Page Content -->
        <div class="col-span-5">
          <NuxtPage />
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <NuxtPage />
    <MobileNavigation />
  </div>
</template>
