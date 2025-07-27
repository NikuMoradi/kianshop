<template>
  <div class="flex flex-col p-5">
    <div class="flex justify-center items-center mb-5">
      <img src="/public/images/not-found.svg" alt="" />
    </div>

    <div
      class="flex border border-[#e0e0e2] rounded-md px-5 py-4 justify-start items-center"
    >
      <div class="flex flex-col">
        <div class="flex items-center">
          <svg class="w-[20px] h-[20px] ml-4" fill="#f9a825" stroke-width="0">
            <use href="/public/images/sprite.svg#infoFill" />
          </svg>
          <div class="text-subtitle-strong text-[#3f4064]">
            کالایی با این مشخصات پیدا نکردیم
          </div>
        </div>

        <div class="text-body-2 text-[#81858b] mr-9">
          پیشنهاد می‌کنیم فیلترها را تغییر دهید
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
