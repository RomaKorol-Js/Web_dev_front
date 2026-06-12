<!-- <script setup lang="ts">
  const posts = ref([]);

  const getPosts = () => {
    $fetch('/api/blog/posts').then((response) => {
      console.log(response);

      posts.value = response.data;
    });
  };

  getPosts();
</script> -->

<script setup lang="ts">
  const { data: response, error } = await useFetch(
    'http://localhost/api/blog/posts'
  );

  const posts = computed(() => response.value?.data || []);

  console.log(posts.value);
  console.log(error.value);
</script>
<template>
  <div class="container">
    <div class="flex justify-center">
      <div class="w-full">
        <nav class="navbar bg-gray-300">
          <a
            href="http://localhost/api/admin/blog/posts"
            class="bg-gray-100 m-4"
            >Додати</a
          >
        </nav>

        <div class="card">
          <div class="card-body bg-gray-200">
            <table class="table table-auto w-full">
              <!-- показує не всі через пагінацію -->
              <thead>
                <tr class="text-left">
                  <th>#</th>

                  <th>Автор</th>

                  <th>Категорія</th>

                  <th>Заголовок</th>

                  <th>Дата публікації</th>
                </tr>
              </thead>

              <tbody class="text-left">
                <tr v-for="post in posts">
                  <td>{{ post.id }}</td>

                  <td>{{ post.user.name }}</td>

                  <td>{{ post.category.title }}</td>

                  <td>
                    <a :href="'http://localhost:3000/BlogPost/' + post.id">{{
                      post.title
                    }}</a>
                    <!-- http://localhost/api/admin/blog/posts/1 -->
                  </td>

                  <td>{{ post.published_at }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
