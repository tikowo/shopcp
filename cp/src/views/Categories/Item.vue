<template>
  <div>
      <category v-if="category" :data="category"/>
  </div>
</template>

<script>
import Category from './Components/Category.vue';
export default {
  components: { Category },
  name: "CategoryItem",
  computed: {
    category() {
      return this.$store.state.category;
    },
  },
  mounted() {
    this.$store.dispatch("getCategory", this.$route.params.id);
    this.$store.dispatch("getAttributes");
  },
};
</script>