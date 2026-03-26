<script setup>
  import { h, resolveComponent } from 'vue';
  // import type { TableColumn } from '@nuxt/ui';

  import { getPaginationRowModel } from '@tanstack/vue-table';

  const table = useTemplateRef('table');

  const UBadge = resolveComponent('UBadge');
  const UButton = resolveComponent('UButton');

  const { data: table_items_Data } = await useFetch(
    'https://dummyjson.com/products'
  );
  const table_items = computed(() => table_items_Data.value.products);
  useHead({
    title: 'Список продуктів'
  });
  const { data: items } = await useFetch('/api/items');

  const columns = [
    {
      accessorKey: 'title',
      key: 'title',
      header: ({ column }) => {
        const isSorted = column.getIsSorted();

        return h(UButton, {
          color: 'neutral',
          variant: 'ghost',
          label: 'title',
          icon: isSorted
            ? isSorted === 'asc'
              ? 'i-lucide-arrow-up-narrow-wide'
              : 'i-lucide-arrow-down-wide-narrow'
            : 'i-lucide-arrow-up-down',
          class: 'text-gray-800',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
        });
      }
    },
    {
      accessorKey: 'description',
      key: 'description',
      meta: {
        class: {
          th: 'text-gray-800'
        }
      }
    },
    {
      variant: 'ghost',
      accessorKey: 'price',
      key: 'price',
      header: ({ column }) => {
        const isSorted = column.getIsSorted();

        return h(UButton, {
          color: 'neutral',
          variant: 'ghost',
          label: 'price',
          icon: isSorted
            ? isSorted === 'asc'
              ? 'i-lucide-arrow-up-narrow-wide'
              : 'i-lucide-arrow-down-wide-narrow'
            : 'i-lucide-arrow-up-down',
          class: 'text-gray-800',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
        });
      }
    },
    {
      accessorKey: 'rating',
      key: 'rating',
      header: ({ column }) => {
        const isSorted = column.getIsSorted();

        return h(UButton, {
          color: 'neutral',
          variant: 'ghost',
          label: 'rating',
          icon: isSorted
            ? isSorted === 'asc'
              ? 'i-lucide-arrow-up-narrow-wide'
              : 'i-lucide-arrow-down-wide-narrow'
            : 'i-lucide-arrow-up-down',
          class: 'text-gray-800',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
        });
      },
      cell: ({ row }) => {
        const rating = row.getValue('rating');
        const ratingColor = rating <= 4.5 ? 'text-red-900' : 'text-green-900';
        return h(UBadge, { class: ratingColor }, rating);
      }
    },
    {
      accessorKey: 'brand',
      key: 'brand',
      header: ({ column }) => {
        const isSorted = column.getIsSorted();

        return h(UButton, {
          color: 'neutral',
          variant: 'ghost',
          label: 'brand',
          icon: isSorted
            ? isSorted === 'asc'
              ? 'i-lucide-arrow-up-narrow-wide'
              : 'i-lucide-arrow-down-wide-narrow'
            : 'i-lucide-arrow-up-down',
          class: 'text-gray-800',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
        });
      }
    },
    {
      accessorKey: 'category',
      key: 'category',
      meta: {
        class: {
          th: 'text-gray-800'
        }
      }
    },
    {
      accessorKey: 'thumbnail',
      key: 'thumbnail',
      cell: ({ row }) => {
        return h('img', {
          src: row.getValue('thumbnail'),
          class: 'w-[100px] h-[100px] '
        });
      },
      meta: {
        class: {
          th: 'text-gray-800'
        }
      }
    }
  ];

  const pagination = ref({
    pageIndex: 0,
    pageSize: 5
  });
  const sorting = ref([
    {
      desc: false
    }
  ]);
  const globalFilter = ref('');
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

  <div class="flex px-4 py-3.5 border-b border-accented">
    <UInput v-model="globalFilter" class="max-w-sm" placeholder="Filter..." />
  </div>
  <UTable
    ref="table"
    v-model:pagination="pagination"
    v-model:global-filter="globalFilter"
    v-model:sorting="sorting"
    :pagination-options="{
      getPaginationRowModel: getPaginationRowModel()
    }"
    :columns="columns"
    :data="table_items"
    :ui="{
      thead: 'bg-gray-400',
      tbody: 'bg-white',
      td: 'text-black'
    }"
  />
  <!-- class="w-315" -->
  <div>
    <UPagination
      :page="pagination.pageIndex + 1"
      :items-per-page="pagination.pageSize"
      :total="
        table?.tableApi?.getFilteredRowModel().rows.length || table_items.length
      "
      @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
    />
  </div>
  <!-- <pre>{{ table_items }}</pre> -->
</template>
