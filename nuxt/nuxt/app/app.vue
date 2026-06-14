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
        <a
          class="text-xl mt-6 p-1 border-2 border-grey-300 font-bold mb-4 rounded"
          href="/BlogPost/BlogPosts"
          >Blog Posts</a
        >
        <a
          class="text-xl mt-6 p-1 border-2 border-grey-300 font-bold mb-4 rounded"
          href="/BlogPost/BlogPostsUi"
          >Blog Post Ui</a
        >
        <a
          class="text-xl mt-6 p-1 border-2 border-grey-300 font-bold mb-4 rounded"
          href="/Category/Category"
        >
          Category
        </a>
      </div>
      <NuxtPage />
    </UMain>
  </UApp>
</template>
