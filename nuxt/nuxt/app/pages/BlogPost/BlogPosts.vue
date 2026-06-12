<script setup lang="ts">
  import PostsTableComponent from '~/components/PostsTableComponent.vue';

  //   const route = useRoute();
  //   const itemId = route.params.id;

  //   const store = useSubscriptionStore();

  //   const { data: item } = await useFetch(`/api/items`);

  //   if (!store.subscription) {
  //     await store.fetchSubscription();
  //   }
</script>

<template>
  <div>
    <PostsTableComponent class="w-full text-black" />
  </div>
</template>
