<template>
  <div>
    <router-link :to="{ name: 'categories' }">Categories</router-link>
    <router-link :to="{ name: 'categoryitem', params: { id: 1 } }"
      >Item</router-link
    >
    <router-view />
    <!-- <div v-for="category in categories" :key="category.id">
      <category-with-child
        @click="handleClick(category.id, category)"
        :category="category"
      />
    </div>
    <div class="bg-gray-200 mb-4" v-for="res in items.results" :key="res.id">
      <div v-for="key in Object.keys(res.formattedAttributes)" :key="key">
        <span>{{ key }} -- </span>
        <span>{{ res.formattedAttributes[key] }}</span>
      </div>
    </div>
    <form class="flex flex-col" @submit.prevent="handleSubmit" v-if="selected">
      <template v-for="attr in selected.attributes" :key="attr.id">
        <input
          v-if="attr.value_type === 'string'"
          v-model="form[attr.id]"
          :placeholder="attr.name"
        />
        <select v-else v-model="form[attr.id]">
          <option
            v-for="option in attr.options"
            :key="option.id"
            :value="option.id"
          >
            {{ option.value }}
          </option>
        </select>
      </template>
      <button type="submit">Submit</button>
    </form> -->
  </div>
</template>

<script>
import CategoryWithChild from "./components/CategoryWithChild.vue";
import HelloWorld from "./components/HelloWorld.vue";
export default {
  components: { HelloWorld, CategoryWithChild },
  data() {
    return {
      categories: [],
      selected: 0,
      items: [],
      form: {},
    };
  },
  async mounted() {
    return;
    const response = await fetch("http://localhost:3000/categories");
    const data = await response.json();
    this.categories = data;
  },
  methods: {
    async handleClick(id, category) {
      this.selected = category;
      const response = await fetch(`http://localhost:3000/categories/${id}`);
      const data = await response.json();
      this.items = data;
    },
    async handleSubmit() {
      const attrs = this.selected.attributes;
      const data = {};
      attrs.forEach((attr) => {
        if (attr.value_type === "enum") {
          data[attr.id] = {
            option_id: this.form[attr.id],
          };
        } else {
          data[attr.id] = {
            value: this.form[attr.id],
          };
        }
      });
      const a = await fetch("http://localhost:3000/item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category_id: this.selected.id,
        }),
      });
      const { id } = await a.json();

      console.log(id);

      const c = await fetch(`http://localhost:3000/test/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const d = await c.json();
      console.log(d);
    },
  },
};
// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md
</script>
