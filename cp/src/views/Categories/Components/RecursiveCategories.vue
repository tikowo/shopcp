<template>
  <div>
    <router-link
      :to="{ name: 'categoryitem', params: { id: category.id } }"
      v-for="category in categories"
      :key="category.id"
    >
      {{ category.name }}
      <recursive-categories
        class="ml-3"
        v-if="category.children"
        :categories="category.children"
      />
    </router-link>
  </div>
</template>

<script>
export default {
  name: "RecursiveCategories",
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>
</style>