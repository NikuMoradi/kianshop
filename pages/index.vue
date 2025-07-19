<template>
  <div class="min-h-screen bg-[#F8F7FB]">
    <Header></Header>
    <div class="1024:pt-46 flex flex-col gap-y-8 pt-32 pb-14">
      <Slider></Slider>
      <AmazingProducts></AmazingProducts>
      <FeaturedCategories></FeaturedCategories>
      <popularProducts></popularProducts>
      <FavBrands></FavBrands>
      <Footer></Footer>
    </div>
    <MobileNavigation v-if="$viewport.isLessThan('laptop')"></MobileNavigation>
  </div>
</template>

<script></script>

<style scoped></style>
