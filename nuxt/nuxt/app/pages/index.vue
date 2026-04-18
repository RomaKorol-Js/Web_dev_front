<script setup>
  const userStore = useUserStore();

  const { name, isLoggedIn, welcomeMessage, profileData, fetchProfile } =
    storeToRefs(userStore);

  const inputName = ref('');
  userStore.fetchProfile();

  const handleLogin = () => {
    if (inputName.value) {
      userStore.login(inputName.value);
      inputName.value = '';
    }
  };
</script>

<template>
  <div v-if="userStore.profileData">
    <!-- {{ profileData }} -->
    <!-- <img :src="userStore.profileData.avatar_url" /> -->
  </div>
  <div class="flex items-center justify-center flex-col p-5">
    <div class="bg-gray-900 p-10 flex items-center justify-center flex-col">
      <h1 class="p-4">{{ welcomeMessage }}</h1>

      <div v-if="!isLoggedIn">
        <input v-model="inputName" placeholder="Введіть ваше ім'я" />
        <button @click="handleLogin">Увійти</button>
      </div>

      <div v-else>
        <p>Ви зайшли о: {{ userStore.loginTime }}</p>
        <button @click="userStore.logout">Вийти</button>
      </div>
    </div>
  </div>
</template>
