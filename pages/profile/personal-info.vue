<!-- <template>
  <div class="1024:pb-0 1024:h-auto flex flex-col pb-[60px]">
    <div class="1024:hidden flex flex-col">
      <div class="flex items-center justify-start bg-white px-5 py-4">
        <div @click="goBack()" class="ml-2 flex">
          <svg class="h-[24px] w-[24px]" fill="#424750" stroke-width="0">
            <use href="/images/sprite.svg#arrowRight" />
          </svg>
        </div>
        <p class="text-h5 text-[#0c0c0c]">اطلاعات حساب کاربری</p>
      </div>
      <hr class="h-[5px] w-full border-none bg-[#f0f0f1]" />
    </div>
    <div
      class="1024:border 1024:border-[#e0e0e2] 1024:rounded-lg 1024:h-[305px] 1024:sticky top-[140px] flex h-full justify-center"
    >
      <template v-if="isLoading">
        <div class="flex h-96 flex-col items-center justify-center">
          <div class="flex items-center justify-center gap-1">
            <div
              class="h-2 w-2 animate-pulse rounded-full bg-[var(--color-primary)]"
            ></div>
            <div
              class="h-2 w-2 animate-pulse rounded-full bg-[var(--color-primary)] delay-100"
            ></div>
            <div
              class="h-2 w-2 animate-pulse rounded-full bg-[var(--color-primary)] delay-200"
            ></div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="1024:px-4 1024:grid-cols-2 grid grow grid-cols-1 px-6">
          <PersonalInfoItem
            label="نام و نام خانوادگی"
            :value="firstName + ' ' + lastName"
            @click="isIdentificationModalOpen = true"
          />

          <PersonalInfoItem
            label="کد ملی"
            :value="toPersianDigits(nationalCode)"
            @click="isIdentificationModalOpen = true"
          />
          <PersonalInfoItem
            label="شماره موبایل"
            :value="toPersianDigits(mobileNumber)"
            @click="isMobileEditModalOpen = true"
          />
          <PersonalInfoItem
            label="ایمیل"
            :value="email"
            @click="isEmailEditModalOpen = true"
          />
          <PersonalInfoItem
            label="رمز عبور"
            :value="password"
            @click="isPasswordEditModalOpen = true"
          />

          <IdentificationEdit
            :is-open="isIdentificationModalOpen"
            :first-name="firstName"
            :last-name="lastName"
            :national-code="nationalCode"
            @close="isIdentificationModalOpen = false"
            @submit="handleIdentificationSubmit"
          />
          <MobileEdit
            :is-open="isMobileEditModalOpen"
            :mobile-number="mobileNumber"
            @close="isMobileEditModalOpen = false"
            @submit="handleMobileSubmit"
          />
          <EmailEdit
            :is-open="isEmailEditModalOpen"
            :email="email"
            @close="isEmailEditModalOpen = false"
            @submit="handleEmailSubmit"
          />
          <PasswordEdit
            :is-open="isPasswordEditModalOpen"
            @close="isPasswordEditModalOpen = false"
          />
        </div>
      </template>
    </div>
    <MobileNavigation v-if="$viewport.isLessThan('laptop')" />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "profile",
});

const isIdentificationModalOpen = ref(false);
const isMobileEditModalOpen = ref(false);
const isEmailEditModalOpen = ref(false);
const isPasswordEditModalOpen = ref(false);

// Add loading state
const isLoading = ref(true);
// Profile data refs with initial values
const firstName = ref("");
const lastName = ref("");
const nationalCode = ref("");
const mobileNumber = ref("");
const email = ref("");
const birthDate = ref("");
const password = "••••••";
const auth = useAuthStore();
const user = auth.user;
// Separate function to load profile data
async function loaduser() {
  try {
    isLoading.value = true;
    if (user) {
      firstName.value = user.first_name || "وارد نشده";
      lastName.value = user.last_name || "";

      mobileNumber.value = user.mobile_number || "وارد نشده";
      email.value = user.email || "وارد نشده";

      if (user.birth_date) {
        const jalaliDate = isoToJalali(user.birth_date);
        birthDate.value = `${jalaliDate.birthYear}/${jalaliDate.birthMonth}/${jalaliDate.birthDay}`;
      } else {
        birthDate.value = "وارد نشده";
      }
    }
  } catch (err) {
    console.error("Error loading profile data:", err);
  } finally {
    isLoading.value = false;
  }
}
// Initialize data immediately if user is already available
onMounted(async () => {
  await loaduser();
});

// async function handleIdentificationSubmit(formData) {
//   const success = await updateProfile({
//     first_name: formData.firstName,
//     last_name: formData.lastName,
//     national_code: formData.nationalCode,
//     is_foreigner: formData.isForeigner,
//     birth_date: jalaliToIso(
//       formData.birthYear,
//       formData.birthMonth,
//       formData.birthDay,
//     ),
//   });

//   if (success) {
//     firstName.value = formData.firstName;
//     lastName.value = formData.lastName;
//     nationalCode.value = formData.nationalCode;
//     isForeigner.value = formData.isForeigner;
//     birthDate.value = `${formData.birthYear}/${formData.birthMonth}/${formData.birthDay}`;
//   }
// }

// async function handleMobileSubmit(newMobileNumber) {
//   const success = await updateProfile({
//     mobile_number: newMobileNumber,
//   });

//   if (success) {
//     mobileNumber.value = toPersianDigits(newMobileNumber);
//   }
// }

// async function handleEmailSubmit(newEmail) {
//   const success = await updateProfile({
//     email: newEmail,
//   });

//   if (success) {
//     email.value = newEmail;
//   }
// }

// async function handleJobSubmit(newJob) {
//   const success = await updateProfile({
//     job: newJob,
//   });

//   if (success) {
//     job.value = newJob;
//   }
// }
</script>

<style scoped>
@media (min-width: 1024px) {
  .grid > :nth-child(2n) {
    border-right: 1px solid #f0f0f1;
  }
}
</style> -->

<template>
  <div></div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
