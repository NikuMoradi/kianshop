<template>
  <div @click="toggleFavorite(productId)" class="cursor-pointer">
    <svg v-if="!isFavorite" class="w-6 h-6" fill="#">
      <use href="/images/sprite.svg#favoriteOff" />
    </svg>
    <svg v-else class="w-6 h-6" fill="red">
      <use href="/images/sprite.svg#favoriteOn" />
    </svg>
  </div>
  <BaseToast
    :is-visible="showSignInFirst"
    message="ابتدا وارد حساب کاربری خود شوید"
    @close="showSignInFirst = false"
  />
</template>

<script setup>
import { ref, onUnmounted } from "vue";

const props = defineProps({
  productId: String,
});
const isFavorite = ref(false);
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const showSignInFirst = ref(false);
let timer = null;

const toggleFavorite = async () => {
  if (!user.value) {
    showSignInFirst.value = true;
    timer = setTimeout(() => {
      showSignInFirst.value = false;
    }, 3000);
    return;
  }

  const { data, error } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_id", user.value.id)
    .eq("product_id", props.productId)
    .maybeSingle();

  if (data) {
    // قبلاً وجود داشته، پس حذفش کن
    await supabase.from("favorites").delete().eq("id", data.id);
  } else {
    // وجود نداشته، پس اضافه کن
    await supabase.from("favorites").insert({
      user_id: user.value.id,
      product_id: props.productId,
      created_at: new Date().toISOString(),
    });
  }

  isFavorite.value = !isFavorite.value;
};
onMounted(async () => {
  if (!user.value) {
    return;
  }
  const { data } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", user.value.id)
    .eq("product_id", props.productId);

  isFavorite.value = data.length > 0;
});

onUnmounted(() => {
  if (timer) {
    clearTimeout(timer);
  }
});
</script>
