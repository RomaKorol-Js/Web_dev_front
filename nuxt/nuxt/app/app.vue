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
          href="/product_items"
          >product_items</a
        >

        <a
          class="text-xl mt-6 p-1 border-2 border-grey-300 font-bold mb-4 rounded"
          href="/starter_packs"
          >starter_packs</a
        >
      </div>
      <NuxtPage />
    </UMain>
  </UApp>
</template>
