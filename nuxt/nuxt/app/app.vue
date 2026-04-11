<script setup>
  useHead({
    bodyAttrs: {
      style: 'background-color: white;'
    }
  });
</script>

<template>
  <UApp>
    <UMain>
      <!-- <UMain class="bg-white"> -->
      <div class="flex ml-8 text-black gap-10">
        <a
          class="text-xl mt-6 p-1 border-2 border-grey-300 font-bold mb-4 rounded"
          href="/productitems"
          >productitems</a
        >

        <a
          class="text-xl mt-6 p-1 border-2 border-grey-300 font-bold mb-4 rounded"
          href="/starterpacks"
          >starterpacks</a
        >
      </div>
      <NuxtPage />
    </UMain>
  </UApp>
</template>
