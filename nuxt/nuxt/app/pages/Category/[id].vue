<script setup lang="ts">
  const route = useRoute();
  const categoryId = route.params.id;

  const { data: item, error } = await useFetch(
    `http://localhost/api/admin/blog/categories/${categoryId}`
  );
  const category = computed(() => item.value?.data);
  console.log(category.value);
</script>

<template>
  <div class="container">
    <div class="flex justify-center w-full">
      <div
        class="card-body bg-gray-200 w-full rounded-3xl flex flex-col justify-center item-center gap-2"
      >
        <div class="flex justify-center gap-2">
          <p class="font-bold text-2xl">{{ category?.title }}</p>
        </div>
        <div class="text-right w-full">
          <p class="text-sm m-2 text-gray-900">
            author: <b>{{ category?.parent_category }}</b>
          </p>
          <p class="text-sm m-2 text-gray-500">
            published at: {{ category?.category_description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
