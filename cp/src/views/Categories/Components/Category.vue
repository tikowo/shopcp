<template>
  <div>
    <h2 class="text-2xl font-bold">{{ data.name }}</h2>
    <p>key: {{ data.key }}</p>
    <p>slug: {{ data.slug }}</p>
    <category-attributes class="mt-4" :attributes="data.attributes" />
    <h4 class="text-2xl mt-2">All available attributes</h4>
    <div v-for="attribute in attributes" :key="attribute.id">
      {{ attribute }}
    </div>
  </div>
</template>

<script>
import CategoryAttributes from "./CategoryAttributes.vue";
export default {
  components: { CategoryAttributes },
  computed: {
    attributes() {
      return this.$store.state.attributes;
    },
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
</style>