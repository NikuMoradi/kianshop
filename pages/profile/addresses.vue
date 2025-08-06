<!-- <template>
  <div class="flex flex-col pb-[60px] 1024:pb-0 min-h-screen">
    <div
      class="1024:border 1024:border-[#e0e0e2] 1024:rounded-lg h-full grow flex flex-col"
    >
      <div
        v-if="$viewport.isLessThan('laptop')"
        class="fixed bg-white w-full flex flex-col items-start justify-center px-5 py-4 border-b-[5px] border-[#f0f0f1]"
      >
        <div class="flex items-center justify-center">
          <div @click="goBack()" class="flex ml-2">
            <svg class="w-[24px] h-[24px]" fill="#424750" stroke-width="0">
              <use href="/images/sprite.svg#arrowRight" />
            </svg>
          </div>
          <p class="text-h5 text-[#0c0c0c]">آدرس‌ها</p>
        </div>
      </div>

      <div class="pt-16 1024:pt-0 h-full grow flex flex-col">
        <div
          v-if="$viewport.isGreaterOrEquals('laptop')"
          class="px-5 py-3 w-full border-b border-[#f0f0f1]"
        >
          <p class="text-h5 text-[#0c0c0c]">آدرس‌ها</p>
        </div>

        <div
          class="flex flex-col grow overflow-y-auto scrollbar-custom py-5 px-5 space-y-4"
        >
          <template v-if="isLoading">
            <div class="grow flex flex-col justify-center items-center">
              <div class="flex justify-center items-center gap-1">
                <div
                  class="w-2 h-2 rounded-full bg-[#ef4056] animate-pulse"
                ></div>
                <div
                  class="w-2 h-2 rounded-full bg-[#ef4056] animate-pulse delay-100"
                ></div>
                <div
                  class="w-2 h-2 rounded-full bg-[#ef4056] animate-pulse delay-200"
                ></div>
              </div></div
          ></template>
          <template v-else-if="addresses.length === 0">
            <p class="text-body-1 text-center text-[#424750] mt-4">
              آدرسی ثبت نشده است.
            </p>
          </template>
          <template v-else>
            <div
              v-for="address in addresses"
              :key="address.id"
              class="border border-[#e0e0e2] rounded-lg py-3 px-4 flex flex-col space-y-2"
            >
              <div class="w-full flex items-start">
                <div class="flex">
                  <svg class="w-6 h-6" fill="#62666D" stroke-width="0">
                    <use href="/images/sprite.svg#pin" />
                  </svg>
                </div>
                <div class="flex flex-col items-start grow -mt-1 mr-4">
                  <span class="text-body-1 text-[#62666D]">{{
                    address.province
                  }}</span>
                  <p class="text-body-1 text-[#62666d]">
                    {{ address.city }}، {{ address.street }}، پلاک
                    {{ address.plaque }}
                    <span v-if="address.unit">، واحد {{ address.unit }}</span>
                  </p>
                  <p class="text-body-2 text-[#62666d]">
                    کد پستی: {{ address.postal_code }}
                  </p>
                  <p class="text-body-2 text-[#424750]">
                    گیرنده: {{ address.recipient_name }} |
                    {{ address.phone_number }}
                  </p>
                </div>
                <div class="relative">
                  <button
                    @click="toggleOptions(address.id)"
                    class="text-[#424750]"
                  >
                    <svg class="w-6 h-6" fill="currentColor" stroke-width="0">
                      <use href="/images/sprite.svg#moreVert" />
                    </svg>
                  </button>
                  <div
                    v-if="selectedAddressOptionsId === address.id"
                    class="backdrop 1024:hidden"
                  ></div>
                  <transition
                    :name="$viewport.isLessThan('laptop') ? 'slide-up' : null"
                  >
                    <div
                      v-if="selectedAddressOptionsId === address.id"
                      v-click-outside="() => (selectedAddressOptionsId = null)"
                      class="fixed bottom-0 inset-x-0 bg-white rounded-t-xl z-50 1024:absolute 1024:top-7 1024:right-auto 1024:bottom-auto 1024:left-2 1024:w-48 1024:rounded-lg 1024:shadow-lg 1024:border 1024:border-gray-200"
                    >
                      <div class="py-4 1024:py-0">
                        <span
                          class="text-h5 px-4 py-3 text-[#0C0C0C] 1024:hidden"
                          >تنظیمات آدرس</span
                        >
                        <button
                          @click="openEditModal(address)"
                          class="flex items-center w-full px-5 py-3 text-body-2 text-[#424750] hover:bg-gray-100"
                        >
                          ویرایش
                          <div class="flex mr-4">
                            <svg
                              class="w-6 h-6"
                              fill="currentColor"
                              stroke-width="0"
                            >
                              <use href="/images/sprite.svg#edit" />
                            </svg>
                          </div>
                        </button>
                        <button
                          @click="deleteAddress(address.id)"
                          class="flex items-center w-full px-5 py-3 text-body-2 text-[#ef4056] hover:bg-gray-100"
                        >
                          حذف
                          <div class="flex mr-4">
                            <svg
                              class="w-6 h-6"
                              fill="currentColor"
                              stroke-width="0"
                            >
                              <use href="/images/sprite.svg#delete" />
                            </svg>
                          </div>
                        </button>
                      </div>
                    </div>
                  </transition>
                </div>
              </div>
            </div>
          </template>
        </div>

        <div class="w-full fixed bottom-16 left-0 px-4 pb-1 flex justify-end">
          <button
            @click="openAddModal()"
            class="bg-[#ef4056] rounded-3xl flex justify-center items-center py-3 px-4"
          >
            <div class="text-button-1 text-white">ثبت آدرس جدید</div>
            <div class="flex mr-1">
              <svg class="w-[24px] h-[24px]" fill="#ffff" stroke-width="0">
                <use href="/images/sprite.svg#newAddress" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
  <AddressModal
    :is-open="isAddressModalOpen"
    :initial-address="selectedAddressToEdit"
    @close="isAddressModalOpen = false"
    @update="fetchAddresses()"
  />
</template>

<script setup>
definePageMeta({
  layout: "profile",
});

const supabase = useSupabaseClient();
const user = useSupabaseUser();

const isAddressModalOpen = ref(false);
const selectedAddressToEdit = ref(null);
const selectedAddressOptionsId = ref(null);
const isLoading = ref(false);

const addresses = ref([]);

const fetchAddresses = async () => {
  if (!user.value) {
    addresses.value = [];
    return;
  }
  try {
    isLoading.value = true;
    const { data, error } = await supabase
      .from("addresses")
      .select("*")
      .eq("user_id", user.value.id)
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }
    addresses.value = data;
    isLoading.value = false;
  } catch (error) {
    console.error("Error fetching addresses:", error);
    addresses.value = [];
  }
};

const deleteAddress = async (addressId) => {
  try {
    const { error } = await supabase
      .from("addresses")
      .delete()
      .eq("id", addressId);

    if (error) {
      throw error;
    }
    selectedAddressOptionsId.value = null;
    await fetchAddresses(); // Refetch addresses after deletion
  } catch (error) {
    console.error("Error deleting address:", error);
  }
};

const openEditModal = (address) => {
  selectedAddressToEdit.value = address;
  isAddressModalOpen.value = true;
  selectedAddressOptionsId.value = null;
};

const openAddModal = () => {
  selectedAddressToEdit.value = null; // Ensure no address is selected for editing when adding.
  isAddressModalOpen.value = true;
};

const toggleOptions = (addressId) => {
  selectedAddressOptionsId.value =
    selectedAddressOptionsId.value === addressId ? null : addressId;
};

onMounted(() => {
  fetchAddresses();
});
</script> -->

<template>
  <div></div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
