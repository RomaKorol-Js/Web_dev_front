<script setup>
  //   import { h, resolveComponent } from 'vue';
  // import type { TableColumn } from '@nuxt/ui';

  //   import { getPaginationRowModel } from '@tanstack/vue-table';

  //   const table = useTemplateRef('table');
  const activeplan = ref('annual');

  const { data: preitem } = await useFetch('/api/items');

  const items = computed(() => {
    if (!preitem.value) return [];
    return preitem.value.filter((item) => item.type === activeplan.value);
  });
</script>

<template>
  <div class="pl-6 flex justify-between">
    <h1 class="text-4xl text-black ml-4 mt-6">Start Your 3-Day Free Trial</h1>
    <div class="flex mr-8 mt-6 items-center">
      <div class="flex items-end flex-col-reverse mr-2 mt-[-16px]">
        <h1 class="text-green-400 mt-[-8px]">save up to 20%</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 256 256"
          class="text-green-400"
        >
          <!-- Icon from Phosphor by Phosphor Icons - https://github.com/phosphor-icons/core/blob/main/LICENSE -->
          <g fill="currentColor">
            <path d="M232 88v64h-64Z" opacity=".2" />
            <path
              d="M235.06 80.61a8 8 0 0 0-8.72 1.73l-26.48 26.49A104 104 0 0 0 24 184a8 8 0 0 0 16 0a88 88 0 0 1 148.53-63.84l-26.19 26.18A8 8 0 0 0 168 160h64a8 8 0 0 0 8-8V88a8 8 0 0 0-4.94-7.39M224 144h-36.69L224 107.31Z"
            />
          </g>
        </svg>
      </div>
      <button
        :class="
          activeplan === 'annual'
            ? 'text-black bg-gray-100'
            : 'text-gray-400 bg-white'
        "
        @click="activeplan = 'annual'"
        class="p-2 border border-gray-300 rounded-l cursor-pointer"
      >
        Annual
      </button>

      <button
        :class="
          activeplan === 'monthly'
            ? 'text-black bg-gray-100'
            : 'text-gray-400 bg-white'
        "
        @click="activeplan = 'monthly'"
        class="p-2 border border-gray-300 rounded-r cursor-pointer border-l-0"
      >
        Monthly
      </button>
    </div>
  </div>

  <div class="flex w-full">
    <div v-for="item in items" :key="item.title" class="flex m-6 w-full">
      <div
        class="relative border-2 h-full p-6 w-full bg-white rounded-xl hover:border-green-800 hover:border-3"
      >
        <div
          class="absolute top-0 left-0 h-2 w-full rounded-t-3xl bg-gradient-to-r from-green-500 to-blue-400"
        ></div>

        <div class="border-b-2 border-gray-300">
          <h2 class="text-2xl text-gray-900 mb-6">{{ item.title }}</h2>
          <div class="bg-gray-200 rounded-sm text-gray-800 inline">
            <h3 class="w-fit inline p-3">{{ item.period }}</h3>
          </div>
          <div class="flex items-end mt-4">
            <b>
              <h1 class="text-4xl text-gray-900">{{ item.price }}</h1>
            </b>
            <h1 class="text-gray-600 mb-1">/{{ item.payment_frequency }}</h1>
          </div>
          <div
            v-if="item.type == 'annual'"
            class="flex items-center mt-2 text-gray-600"
          >
            <h3 class="mr-2">billed yearly at</h3>
            <h3 class="line-through mr-2">{{ item.Alternative_price }}</h3>
            <h3>{{ item.discount_price }}</h3>
          </div>

          <div
            v-if="item.type == 'annual'"
            class="bg-green-100 text-green-700 w-fit px-2 py-1 mt-2 mb-4 font-semibold rounded"
          >
            {{ item.savings }}
          </div>
          <div
            class="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-sm text-gray-800 font-bold mt-2 mb-4 p-2 text-center hover:border-black hover:border-1 hover:text-gray-900 cursor-pointer"
          >
            <NuxtLink :to="`/starterpacks/${item.id}`">
              <h2>{{ item.text_for_button }}</h2>
            </NuxtLink>
          </div>
        </div>

        <div class="mt-4">
          <div v-for="(text, index) in item.texts" :key="index" class="mb-4">
            <div class="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                class="text-lime-500 w-4 h-4 mr-3 mt-1 shrink-0"
              >
                <path
                  fill="currentColor"
                  d="M240 128a15.79 15.79 0 0 1-10.5 15l-63.44 23.07L143 229.5a16 16 0 0 1-30 0l-23.06-63.44L26.5 143a16 16 0 0 1 0-30l63.44-23.06L113 26.5a16 16 0 0 1 30 0l23.07 63.44L229.5 113a15.79 15.79 0 0 1 10.5 15"
                />
              </svg>
              <div>
                <div class="flex">
                  <strong>
                    <h2 class="text-gray-800 mr-1">
                      {{ text.strong }}
                    </h2>
                  </strong>
                  <h2 class="text-gray-900 text-lg">{{ text.main }}</h2>
                </div>
                <h2 v-if="text.additional" class="text-gray-600 mt-1">
                  {{ text.additional }}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
