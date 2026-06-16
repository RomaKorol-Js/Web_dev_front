<script setup lang="ts">
  import { h, resolveComponent, ref, computed } from 'vue';

  const NuxtLink = resolveComponent('NuxtLink');
  const colorMode = useColorMode();
  colorMode.preference = 'light';

  const page = ref(1);

  const queryPage = computed(() => ({
    page: page.value
  }));

  const {
    data: response,
    pending,
    refresh
  } = await useFetch('http://localhost/api/admin/blog/categories', {
    query: queryPage,
    watch: [page]
  });

  const categories = computed(() => response.value?.data);
  const totalItems = computed(() => response.value?.meta?.total);
  const perPage = computed(() => response.value?.meta?.per_page);

  const deleteCategory = async (id: number) => {
    await $fetch(`http://localhost/api/admin/blog/categories/${id}`, {
      method: 'DELETE'
    });
    refresh();
  };

  const getDropdownItems = (row: any) => {
    const categoryId = row.original?.id || row.id;
    return [
      [
        {
          label: 'Змінити',
          icon: 'i-lucide-edit',
          to: `/Category/CRUD/Add_Update?id=${categoryId}`
        },
        {
          label: 'Видалити',
          icon: 'i-lucide-trash',
          color: 'error',
          onSelect: () => deleteCategory(categoryId)
        }
      ]
    ];
  };

  const columns = [
    { accessorKey: 'id', header: '#' },
    {
      accessorKey: 'title',
      header: 'Заголоволок',
      cell: ({ row, getValue }) => {
        const categoryTitle = getValue();
        const categoryId = row.original?.id || row.id;
        return h(
          NuxtLink,
          { to: `/Category/${categoryId}`, class: 'text-blue-600' },
          () => categoryTitle
        );
      }
    },
    { accessorKey: 'parent_category', header: 'Батьківська категорія' },
    { accessorKey: 'category_description', header: 'Опис' },
    { id: 'action' }
  ];
</script>

<template>
  <div>
    <div class="flex px-4 py-3.5 border-b border-accented justify-end">
      <div class="flex flex-row-reverse mr-4">
        <UButton
          to="/Category/CRUD/Add_Update"
          color="primary"
          aria-label="Actions"
          >Створити
        </UButton>
      </div>
    </div>

    <UTable
      :columns="columns"
      :data="categories"
      :loading="pending"
      :ui="{
        thead: 'bg-gray-400',
        tbody: 'bg-white',
        td: 'text-black'
      }"
    >
      <template #action-cell="{ row }">
        <UDropdownMenu :items="getDropdownItems(row)">
          <UButton
            icon="i-lucide-ellipsis-vertical"
            color="neutral"
            variant="ghost"
            aria-label="Actions"
          />
        </UDropdownMenu>
      </template>
    </UTable>

    <div>
      <UPagination
        :page="page"
        :items-per-page="perPage"
        :total="totalItems"
        @update:page="(p) => (page = p)"
      />
    </div>
  </div>
</template>
