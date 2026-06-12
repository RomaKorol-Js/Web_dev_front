<script setup>
  import { h, resolveComponent } from 'vue';
  import { getPaginationRowModel } from '@tanstack/vue-table';

  const table = useTemplateRef('table');
  const NuxtLink = resolveComponent('NuxtLink');
  const UBadge = resolveComponent('UBadge');
  const UButton = resolveComponent('UButton');

  const colorMode = useColorMode();
  colorMode.preference = 'light';

  const { data: response } = await useFetch('http://localhost/api/blog/posts');
  const posts = computed(() => response.value?.data || []);
  console.log(response.value?.data);
  const columns = [
    {
      accessorKey: 'id',
      key: '#',
      header: ({ column }) => {
        const isSorted = column.getIsSorted();

        return h(UButton, {
          color: 'neutral',
          variant: 'ghost',
          label: '#',
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
      accessorKey: 'user.name',
      key: 'Автор',
      header: ({ column }) => {
        const isSorted = column.getIsSorted();

        return h(UButton, {
          color: 'neutral',
          variant: 'ghost',
          label: 'Автор',
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
      accessorKey: 'category.title',
      header: ({ column }) => {
        const isSorted = column.getIsSorted();

        return h(UButton, {
          color: 'neutral',
          variant: 'ghost',
          label: 'категорія',
          icon: isSorted
            ? isSorted === 'asc'
              ? 'i-lucide-arrow-up-narrow-wide'
              : 'i-lucide-arrow-down-wide-narrow'
            : 'i-lucide-arrow-up-down',
          class: 'text-gray-800',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
        });
      },
      key: 'Категорія',
      meta: {
        class: {
          th: 'text-gray-800'
        }
      },
      cell: ({ row, getValue }) => {
        const categoryTitle = getValue();

        const poastId = row.original.id;
        return h(
          NuxtLink,
          {
            to: `http://localhost:3000/BlogPost/${poastId}`,
            class: 'text-blue-600'
          },
          () => categoryTitle
        );
      }
    },
    {
      variant: 'ghost',
      accessorKey: 'title',
      key: 'Заголовок',
      header: ({ column }) => {
        const isSorted = column.getIsSorted();

        return h(UButton, {
          color: 'neutral',
          variant: 'ghost',
          label: 'Заголовок',
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
      accessorKey: 'published_at',
      key: '	Дата публікації',
      header: ({ column }) => {
        const isSorted = column.getIsSorted();

        return h(UButton, {
          color: 'neutral',
          variant: 'ghost',
          label: 'Дата публікації',
          icon: isSorted
            ? isSorted === 'asc'
              ? 'i-lucide-arrow-up-narrow-wide'
              : 'i-lucide-arrow-down-wide-narrow'
            : 'i-lucide-arrow-up-down',
          class: 'text-gray-800',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
        });
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
    :data="posts"
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
        table?.tableApi?.getFilteredRowModel().rows.length || posts.length
      "
      @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
    />
  </div>
  <!-- <pre>{{ posts }}</pre> -->
</template>
<!-- 
<a :href="'http://localhost:3000/BlogPost/' + post.id">{{
                      post.title
                    }}</a> -->
