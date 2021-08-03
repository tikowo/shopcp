<template>
  <div>
    <router-link
      v-for="attribute in attributes"
      :key="attribute.id"
      :to="{ name: 'attributeitem', params: { id: attribute.id } }"
      class="mb-2"
    >
      <p class="text-sm mb-0 font-semibold">Name:</p>
      <p class="text-xl">{{ attribute.name }}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    attributes: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
</style>