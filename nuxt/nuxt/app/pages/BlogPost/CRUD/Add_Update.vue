<script setup lang="ts">
  import { computed, reactive, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';

  import { z } from 'zod';

  const postSchema = z.object({
    title: z.string().min(5, 'Заголовок має мати 5 символів'),
    post_content: z.string().min(3, 'Контент має бути довшим за 3 стрічки'),
    category_id: z.number('Пост має мати категорію')
  });

  const route = useRoute();

  const isEditing = computed(() => !!route.query.id);
  const editId = computed(() => route.query.id);

  const { data: response } = await useFetch(
    'http://localhost/api/admin/blog/categories'
  );
  const categories = computed(() => response.value?.data || []);

  const state = reactive({
    title: '',
    slug: '',
    excerpt: '',
    post_content: '',
    is_published: null,
    category_id: null
  });

  if (isEditing.value) {
    try {
      const res = await $fetch(
        `http://localhost/api/blog/posts/${editId.value}`
      );
      console.log(res);
      if (res && res.data) {
        state.title = res.data.title || '';
        state.slug = res.data.slug || '';
        state.post_content = res.data.post_content || '';
        state.is_published = res.data.is_published || null;
        state.category_id = res.data.category_id || null;
      }
    } catch (error) {
      console.error('Failed to load post:', error);
    }
  }

  async function onSubmit() {
    const payload = {
      title: state.title,
      slug: state.slug || state.title,
      content_raw: state.post_content,
      is_published: state.is_published,
      category_id: state.category_id
    };

    try {
      if (isEditing.value) {
        await $fetch(`http://localhost/api/admin/blog/posts/${editId.value}`, {
          method: 'PUT',
          body: payload
        });
      } else {
        await $fetch('http://localhost/api/admin/blog/posts', {
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
          {{ isEditing ? 'Редагувати пост' : 'Створити пост' }}
        </h2>
      </div>

      <UForm :schema="postSchema" :state="state" @submit="onSubmit">
        <UFormField label="Title" name="title" class="mb-6 m-2">
          <UInput
            v-model="state.title"
            placeholder="Enter post title"
            class="w-full p-3 border border-gray-300 text-gray-900 m-2"
          />
        </UFormField>

        <UFormField label="Slug" name="slug" class="mb-6 m-2">
          <UInput
            v-model="state.slug"
            placeholder="Enter post slug"
            class="w-full p-3 border border-gray-300 text-gray-900 m-2"
          />
        </UFormField>

        <UFormField label="Content" name="post_content" class="mb-6 m-2">
          <UTextarea
            v-model="state.post_content"
            placeholder="Detailed post content"
            :rows="4"
            class="w-full p-3 border border-gray-300 text-gray-900 m-2"
          />
        </UFormField>

        <UFormField label="Is Published" name="is_published" class="mb-6 m-2">
          <UCheckbox v-model="state.is_published" class="m-2" />
        </UFormField>

        <UFormField label="Category" name="category_id" class="mb-8 m-2">
          <USelect
            v-model="state.category_id"
            :items="categories"
            labelKey="title"
            valueKey="id"
            placeholder="Select a category"
            class="w-full"
            :ui="{ base: 'p-3 border border-gray-300 text-gray-900 m-2' }"
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
