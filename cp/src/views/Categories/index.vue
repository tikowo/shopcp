<template>
    <recursive-categories v-if="categories" :categories="categories"/>
</template>

<script>
import RecursiveCategories from './Components/RecursiveCategories.vue';
export default {
  components: { RecursiveCategories },
  name: "Categories",
  computed: {
    categories() {
      return this.$store.state.categories;
    },
  },
  mounted() {
    this.$store.dispatch("getCategories");
    console.log("loading categories");
  },
};
</script>