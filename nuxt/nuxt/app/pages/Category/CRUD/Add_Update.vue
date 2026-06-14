<script setup lang="ts">
  import { computed, reactive, onMounted } from 'vue';
  import { useRoute } from 'vue-router';

  import { z } from 'zod';

  const categorySchema = z.object({
    title: z.string().min(5, 'Заголовок має бути довшим за 5 символів'),
    description: z.string().min(3, 'Опис має бути довшим за 3 стрічки'),
    parent_id: z.number('Категорія має мати батьківську категорію')
  });

  const route = useRoute();

  const isEditing = computed(() => !!route.query.id);
  const editId = computed(() => route.query.id);

  const { data: response } = await useFetch(
    'http://localhost/api/admin/blog/categories'
  );
  const parentCategories = computed(() => response.value?.data || []);

  const state = reactive({
    title: '',
    description: '',
    parent_id: null
  });

  if (isEditing.value) {
    try {
      const res = await $fetch(
        `http://localhost/api/admin/blog/categories/${editId}`
      );
      console.log(res);
      if (res && res.data) {
        state.title = res.data.title || '';
        state.description = res.data.category_description || '';
        state.parent_id = res.data.parent_id || null;
      }
    } catch (error) {
      console.error('Failed to load category:', error);
    }
  }

  async function onSubmit() {
    const payload = {
      title: state.title,
      description: state.description,
      slug: state.title,
      parent_id: state.parent_id
    };

    try {
      if (isEditing.value) {
        await $fetch(`http://localhost/api/admin/blog/categories/${editId}`, {
          method: 'PUT',
          body: payload
        });
      } else {
        await $fetch('http://localhost/api/admin/blog/categories', {
          method: 'POST',
          body: payload
        });
      }
    } catch (error) {
      console.error('Submit error:', error);
    }
  }
</script>

<template>
  <div class="flex justify-center m-8">
    <div class="w-full max-w-4xl p-8 border border-gray-200 rounded-lg">
      <div class="flex justify-center mb-8 border-b border-gray-200">
        <h2 class="text-gray-900 text-2xl font-bold p-4">
          {{ isEditing ? 'Редагувати категорію' : 'Створити категорію' }}
        </h2>
      </div>

      <UForm :schema="categorySchema" :state="state" @submit="onSubmit">
        <UFormField label="Title" name="title" class="mb-6 m-2">
          <UInput
            v-model="state.title"
            placeholder="Enter category title"
            class="w-full p-3 border border-gray-300 text-gray-900 m-2"
          />
        </UFormField>

        <UFormField label="Description" name="description" class="mb-6 m-2">
          <UTextarea
            v-model="state.description"
            placeholder="Detailed category description"
            :rows="4"
            class="w-full p-3 border border-gray-300 text-gray-900 m-2"
          />
        </UFormField>

        <UFormField label="Parent Category" name="parent_id" class="mb-8 m-2">
          <USelect
            v-model="state.parent_id"
            :items="parentCategories"
            labelKey="title"
            valueKey="id"
            placeholder="Select a parent category"
            class="w-full p-3 border border-gray-300 text-gray-900 m-2"
          />
        </UFormField>

        <div class="flex justify-center m-4">
          <UButton type="submit" size="xl">
            {{ isEditing ? 'Зберегти' : 'Створити' }}
          </UButton>
        </div>
      </UForm>
    </div>
  </div>
</template>
