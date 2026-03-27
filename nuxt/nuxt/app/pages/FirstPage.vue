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
