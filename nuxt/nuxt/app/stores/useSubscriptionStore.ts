import { defineStore } from 'pinia';

export const useSubscriptionStore = defineStore('subscription', () => {
  const subscription = ref<any>(null);
  const isLoading = ref(false);

  const isSubscribed = computed(() => !!subscription.value);

  async function fetchSubscription() {
    isLoading.value = true;
    try {
      const response = await $fetch('/api/subscription');
      subscription.value = response;
    } catch (error) {
      subscription.value = null;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    subscription,
    isLoading,
    isSubscribed,
    fetchSubscription
  };
});
