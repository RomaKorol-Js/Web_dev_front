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
  } = await useFetch('http://localhost/api/admin/blog/posts', {
    query: queryPage,
    watch: [page]
  });

  const posts = computed(() => response.value?.data);
  const totalItems = computed(() => response.value?.meta?.total);
  const perPage = computed(() => response.value?.meta?.per_page);

  const deletePost = async (id: number) => {
    await $fetch(`http://localhost/api/admin/blog/posts/${id}`, {
      method: 'DELETE'
    });
    refresh();
  };

  const getDropdownItems = (row: any) => {
    const postId = row.original?.id || row.id;
    return [
      [
        {
          label: 'Змінити',
          icon: 'i-lucide-edit',
          to: `/BlogPost/CRUD/Add_Update?id=${postId}`
        },
        {
          label: 'Видалити',
          icon: 'i-lucide-trash',
          color: 'error',
          onSelect: () => deletePost(postId)
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
        const postTitle = getValue();
        const postId = row.original?.id || row.id;
        return h(
          NuxtLink,
          { to: `/BlogPost/${postId}`, class: 'text-blue-600' },
          () => postTitle
        );
      }
    },
    { accessorKey: 'author_name', header: 'Автор' },
    { accessorKey: 'category_title', header: 'Категорія' },
    { accessorKey: 'date_published', header: 'Дата публікації' },
    { id: 'action' }
  ];
</script>

<template>
  <div>
    <div class="flex px-4 py-3.5 border-b border-accented justify-end">
      <div class="flex flex-row-reverse mr-4">
        <UButton
          to="/BlogPost/CRUD/Add_Update"
          color="primary"
          aria-label="Actions"
          >Створити
        </UButton>
      </div>
    </div>

    <UTable
      :columns="columns"
      :data="posts"
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
