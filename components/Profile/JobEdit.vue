<template>
  <div>
    <!-- Backdrop -->
    <div
      v-if="isOpen"
      @click="$emit('close')"
      class="backdrop fixed inset-0 bg-black bg-opacity-10 z-40"
    ></div>
    <!-- Popup -->
    <transition name="slide-up">
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-white flex flex-col z-50 1024:absolute 1024:inset-auto 1024:w-[460px] 1024:max-h-[80vh] 1024:top-1/2 1024:left-1/2 1024:transform 1024:-translate-x-1/2 1024:-translate-y-1/2 1024:rounded-lg"
      >
        <div class="h-full">
          <!-- header -->
          <div class="px-5">
            <div class="flex justify-between items-center py-3">
              <p class="text-h5 text-[#0c0c0c]">ویرایش شغل</p>
              <button class="" @click="$emit('close')">
                <IconX class="text-[#424750]" size="22" />
              </button>
            </div>
            <hr class="w-full bg-[#e0e0e2] border-none h-[1px]" />
          </div>
          <!-- body -->
          <div class="flex flex-col py-4">
            <form
              @submit.prevent="submitForm"
              class="h-full px-5 1024:min-h-[20vh]"
            >
              <div class="relative">
                <div
                  class="w-full rounded-lg px-3 py-3 text-right text-subtitle outline-none bg-[#F0F0F1] border-b-[2px] border-transparent focus:border-[#19bfd3] flex items-center justify-between cursor-pointer"
                  @click="dropdownOpen = !dropdownOpen"
                  tabindex="0"
                >
                  <span>{{ selectedJob }}</span>
                  <svg class="w-6 h-6" fill="#424750" stroke-width="0">
                    <use href="public/images/sprite.svg#dropdown" />
                  </svg>
                </div>
                <ul
                  v-if="dropdownOpen"
                  v-click-outside="() => (dropdownOpen = false)"
                  class="absolute right-0 left-0 z-50 w-full mt-2 max-h-48 overflow-y-auto scrollbar-custom bg-white rounded-lg shadow-lg border border-[#e0e0e2]"
                  role="listbox"
                >
                  <li
                    v-for="job in jobs"
                    :key="job"
                    @click="selectJob(job)"
                    class="px-3 py-2 hover:bg-[#f5f5f5] cursor-pointer text-right text-body-1 text-[#23254e]"
                    :class="{ 'bg-[#f5f5f5]': selectedJob === job }"
                    role="option"
                  >
                    {{ job }}
                  </li>
                </ul>
              </div>
              <div
                class="fixed inset-x-0 bottom-0 py-3 px-4 shadow-1-top 1024:absolute 1024:bottom-0 1024:shadow-none"
              >
                <button
                  type="submit"
                  class="w-full text-button-1 bg-[#ef4056] text-white rounded-lg py-2 text-center font-bold transition-colors duration-200 cursor-pointer"
                >
                  ویرایش
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  job: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["close", "submit"]);

const jobs = [
  "توسعه نرم افزار و برنامه نویسی",
  "ورزشکار",
  "مربی تربیت بدنی",
  "تاریخ / جغرافیا / باستان شناسی",
  "روانشناسی",
  "علوم اجتماعی",
  "راهنمای تور / مهماندار",
  "ایمنی و امنیت",
];

const selectedJob = ref();
const dropdownOpen = ref(false);

function selectJob(job) {
  selectedJob.value = job;
  dropdownOpen.value = false;
}

watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      selectedJob.value = props.job !== "وارد نشده" ? props.job : "";
    }
  }
);
function submitForm() {
  if (!selectedJob.value) return;
  emit("submit", selectedJob.value);
  emit("close");
}
</script>

<style scoped>
.scrollbar-custom {
  scrollbar-width: medium;
  scrollbar-color: #636363 #f1f1f1;
}
.scrollbar-custom:hover {
  scrollbar-width: medium;
  scrollbar-color: #2f2a2a99 #f1f1f1;
}

/* WebKit Browsers (Chrome, Edge, Safari) */
.scrollbar-custom::-webkit-scrollbar {
  width: 10px;
}

.scrollbar-custom::-webkit-scrollbar-thumb {
  background-color: #636363;
}

.scrollbar-custom:hover::-webkit-scrollbar-thumb {
  background-color: #2f2a2a99;
}

.scrollbar-custom::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}
</style>
