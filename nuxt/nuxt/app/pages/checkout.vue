<script setup lang="ts">
  const route = useRoute();
  const itemId = route.params.id;

  const store = useSubscriptionStore();

  const { data: item } = await useFetch(`/api/items`);

  if (!store.subscription) {
    await store.fetchSubscription();
  }
</script>

<template>
  <div>
    <div class="m-4 border p-4 text-gray-900">
      <h1 class="font-bold border-b mb-4">My Data</h1>

      <div class="mb-4">
        <p>
          Name: <b>{{ store.subscription.data.name }}</b>
        </p>
      </div>

      <div class="mb-4">
        <p>
          Address: <b>{{ store.subscription.data.address }}</b>
        </p>
      </div>

      <div class="mb-4">
        <p>
          Card: <b>{{ store.subscription.data.cardNumber }}</b>
        </p>
      </div>

      <div class="mb-4">
        <p>
          Exp Date: <b>{{ store.subscription.data.date }}</b>
        </p>
      </div>

      <div class="mb-4">
        <p>
          CVC: <b>{{ store.subscription.data.cvc }}</b>
        </p>
      </div>

      <div class="bg-gray-200 p-2">
        Item ID: {{ store.subscription.data.itemId }}
      </div>
    </div>
  </div>
</template>
