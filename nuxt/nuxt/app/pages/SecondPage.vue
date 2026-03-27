<script setup>
//   import { h, resolveComponent } from 'vue';
  // import type { TableColumn } from '@nuxt/ui';

//   import { getPaginationRowModel } from '@tanstack/vue-table';

//   const table = useTemplateRef('table');

  const { data: items } = await useFetch('/api/items');

</script>

<template>
  <h1 class="text-4xl ml-4 mt-6">Start Your 3-Day Free Trial</h1>
  <div class="flex">
    <div
      v-for="item in items"
      :key="item.title"
      class="border h-120 w-sm m-auto mt-6 p-6 rounded-xl hover:border-green-900 hover:border-2"
    >
      <!-- змінив колір оскільки темний на темному жахливо -->
      <div class="border-b-1 border-gray-300">
        <h2 class="text-2xl mb-6">{{ item.title }}</h2>
        <div class="bg-gray-300 rounded-sm text-gray-800 inline">
          <h3 class="text-sm w-fit inline p-3">{{ item.period }}</h3>
        </div>
        <div class="flex items-end">
          <b>
            <h1 class="text-4xl">{{ item.price_for_month }}</h1>
          </b>
          <h1 class="text-gray-600 text-sm">/{{ item.payment_frequency }}</h1>
        </div>
        <div class="flex items-center">
          <h3 class="text-sm mt-2 mb-2 text-gray-600 mr-1">Billed yearly at</h3>
          <h3>{{ item.price_for_year }}</h3>
        </div>
        <div
          class="bg-gray-300 rounded-sm text-gray-600 mb-4 p-2 text-center hover:border-gray-900 hover:border-1 hover:text-gray-900 hover:bg-gray-100"
        >
          <h2>{{ item.text_for_button }}</h2>
        </div>
      </div>

      <div class="mt-4">
        <div>
          <div class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              class="text-lime-500 w-4 h-4 mr-3"
            >
              <path
                fill="currentColor"
                d="M240 128a15.79 15.79 0 0 1-10.5 15l-63.44 23.07L143 229.5a16 16 0 0 1-30 0l-23.06-63.44L26.5 143a16 16 0 0 1 0-30l63.44-23.06L113 26.5a16 16 0 0 1 30 0l23.07 63.44L229.5 113a15.79 15.79 0 0 1 10.5 15"
              />
            </svg>
            <h2>{{ item.additionals[0][0] }}</h2>
          </div>
          <h2 class="text-gray-600 text-sm p-1 ml-6 mb-2 mb-2">
            {{ item.additionals[0][1] }}
          </h2>
        </div>
        <div>
          <div class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              class="text-lime-500 w-4 h-4 mr-3"
            >
              <path
                fill="currentColor"
                d="M240 128a15.79 15.79 0 0 1-10.5 15l-63.44 23.07L143 229.5a16 16 0 0 1-30 0l-23.06-63.44L26.5 143a16 16 0 0 1 0-30l63.44-23.06L113 26.5a16 16 0 0 1 30 0l23.07 63.44L229.5 113a15.79 15.79 0 0 1 10.5 15"
              />
            </svg>
            <h2>Save Unlimited propeties</h2>
          </div>
          <h2 class="text-sm"></h2>
        </div>
        <div>
          <div class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              class="text-lime-500 w-4 h-4 mr-3"
            >
              <path
                fill="currentColor"
                d="M240 128a15.79 15.79 0 0 1-10.5 15l-63.44 23.07L143 229.5a16 16 0 0 1-30 0l-23.06-63.44L26.5 143a16 16 0 0 1 0-30l63.44-23.06L113 26.5a16 16 0 0 1 30 0l23.07 63.44L229.5 113a15.79 15.79 0 0 1 10.5 15"
              />
            </svg>
            <h2>10 000 exportrs</h2>
          </div>
          <h2 class="text-gray-600 text-sm p-1 ml-6 mb-2">
            {{ item.additionals[1][1] }}
          </h2>
        </div>
        <div>
          <div class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              class="text-lime-500 w-4 h-4 mr-3"
            >
              <path
                fill="currentColor"
                d="M240 128a15.79 15.79 0 0 1-10.5 15l-63.44 23.07L143 229.5a16 16 0 0 1-30 0l-23.06-63.44L26.5 143a16 16 0 0 1 0-30l63.44-23.06L113 26.5a16 16 0 0 1 30 0l23.07 63.44L229.5 113a15.79 15.79 0 0 1 10.5 15"
              />
            </svg>
            <h2>500 free skip traces</h2>
          </div>
          <h2 class="text-gray-600 text-sm p-1 ml-6 mb-2">
            (additional skip tracing at $0.08 each)
          </h2>
        </div>
        <div>
          <div class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              class="text-lime-500 w-4 h-4 mr-3"
            >
              <path
                fill="currentColor"
                d="M240 128a15.79 15.79 0 0 1-10.5 15l-63.44 23.07L143 229.5a16 16 0 0 1-30 0l-23.06-63.44L26.5 143a16 16 0 0 1 0-30l63.44-23.06L113 26.5a16 16 0 0 1 30 0l23.07 63.44L229.5 113a15.79 15.79 0 0 1 10.5 15"
              />
            </svg>
            <h2 c>Imports $0.01</h2>
            <h2 class="mb-4"></h2>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <pre>{{ table_items }}</pre> -->
</template>
