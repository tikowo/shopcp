<template>
  <div>
    <form @submit.prevent="handleSave" class="max-w-sm flex flex-col p-2">
      <input
        v-model="form.name"
        class="border mb-2"
        required
        placeholder="Name"
      />
      <input
        v-model="form.key"
        class="border mb-2"
        required
        placeholder="Key"
      />
      <input
        v-model="form.slug"
        class="border mb-2"
        required
        placeholder="Slug"
      />

      <select placeholder="something" v-model.number="form.parent_id">
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
      <button type="submit">Save and edit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
    };
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    },
  },
  mounted() {
    this.$store.dispatch("getCategories", true);
  },
  methods: {
    async handleSave() {
      await this.$store.dispatch("saveCategory", this.form);
      this.$router.push({ name: "categories" });
    },
  },
};
</script>

<style>
</style>