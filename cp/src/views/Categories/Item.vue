<template>
  <div>
    <category v-if="category" :data="category" />
    <div v-if="categoryItems">
      <div v-for="item in categoryItems.results" :key="item.id">
        {{ item.id }}
        {{ item.formattedAttributes.name }}
      </div>
    </div>
  </div>
</template>

<script>
import Category from "./Components/Category.vue";

export default {
  components: { Category },
  name: "CategoryItem",
  computed: {
    category() {
      return this.$store.state.category;
    },
    categoryItems() {
      return this.$store.state.categoryItems;
    },
  },
  mounted() {
    this.$store.dispatch("getCategory", this.$route.params.id);
    this.$store.dispatch("getCategoryItems", this.$route.params.id);
    this.$store.dispatch("getAttributes");
  },
};
</script>