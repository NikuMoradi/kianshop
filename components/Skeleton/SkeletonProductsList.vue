<template>
  <div class="640:grid 640:grid-cols-2 1280:grid-cols-3">
    <div
      v-for="n in 5"
      :key="n"
      class="border-complete-b 640:px-2 640:border-none w-full"
    >
      <div class="flex w-full animate-pulse items-center py-2">
        <article class="640:flex-col 640:gap-y-3 flex w-full gap-x-2">
          <div class="h-8"></div>

          <!-- Image Skeleton -->
          <div
            class="640:w-[240px] 640:h-[240px] 640:mx-auto h-[118px] w-[118px] shrink-0 rounded-md bg-gray-200"
          ></div>
          <div class="h-8"></div>

          <!-- Info Skeleton -->
          <div class="flex w-full flex-col justify-between gap-4">
            <!-- Title -->
            <div class="640:h-8 h-7 rounded bg-gray-200"></div>

            <!-- Price & Discount -->
            <div class="flex flex-col gap-2 pt-4">
              <!-- Final Price Row -->
              <div class="flex items-center justify-between">
                <div class="h-5 w-8 rounded bg-gray-300"></div>
                <div class="h-4 w-24 rounded bg-gray-300"></div>
              </div>
              <!-- Original Price -->
              <div class="h-4 w-16 self-end rounded bg-gray-200"></div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>
