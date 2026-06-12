<script setup lang="ts">
  const route = useRoute();
  const postId = route.params.id;

  const { data: item, error } = await useFetch(
    `http://localhost/api/blog/posts/${postId}`
  );
  console.log(item.value);

  // const posts = computed(() => response.value?.data || []);
</script>
<template>
  <div class="container">
    <div class="flex justify-center w-full">
      <div
        class="card-body bg-gray-200 w-full rounded-3xl flex flex-col justify-center items-center gap-2"
      >
        <div class="flex justify-center gap-2">
          <p class="font-bold text-2xl">{{ item?.title }}</p>
        </div>
        <div class="text-right w-full">
          <p class="text-sm m-2 text-gray-500">
            published at: {{ item?.published_at }}
          </p>
        </div>
        <!-- <p class="text-lg">category: {{ item?.category?.title }}</p> -->
        <p class="text-lg m-2 w-300">{{ item?.content_raw }}</p>
        <!-- <p></p> -->
      </div>
    </div>
    <div v-if="error" class="text-red-500">cant get a post in a moment</div>
  </div>
</template>
