<script setup lang="ts">
  const route = useRoute();
  const postId = route.params.id;

  const { data: item, error } = await useFetch(
    `http://localhost/api/blog/posts/${postId}`
  );
  const post = computed(() => item.value.data);
  console.log(post.value);
  // console.log(post.value);

  // const posts = computed(() => response.value?.data || []);
</script>
<template>
  <div class="container">
    <div class="flex justify-center w-full">
      <div
        class="card-body bg-gray-200 w-full rounded-3xl flex flex-col justify-center posts-center gap-2"
      >
        <div class="flex justify-center gap-2">
          <p class="font-bold text-2xl">{{ post?.title }}</p>
        </div>
        <div class="text-right w-full">
          <p class="text-sm m-2 text-gray-900">
            author: <b>{{ post?.author_name }}</b>
          </p>
          <p class="text-sm m-2 text-gray-500">
            published at: {{ post?.date_published }}
          </p>
        </div>
        <!-- <p class="text-lg">category: {{ post?.category?.title }}</p> -->
        <p class="text-lg m-2 w-300">{{ post?.post_content }}</p>
        <!-- <p></p> -->
      </div>
    </div>
    <div v-if="error" class="text-red-500">cant get a post in a moment</div>
  </div>
</template>
