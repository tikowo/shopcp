import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            categories: null,
            category: null,
            attributes: null,
            categoryItems: null
        }
    },
    actions: {
        async getCategories({ commit }, all) {
            const data = await fetch(`http://localhost:3000/categories/${all ? 'all' : ''}`);
            const categories = await data.json();
            commit('setCategories', categories);
        },
        async getCategory({ state, commit }, id) {
            const response = await fetch(`http://localhost:3000/categories/${id}`);
            const data = await response.json();
            commit('setCategory', data);
        },

        async getAttributes({ commit }) {
            const response = await fetch(`http://localhost:3000/attributes`);
            const data = await response.json();
            commit('setAttributes', data);
        },
        async getCategoryItems({ commit }, id) {
            const response = await fetch(`http://localhost:3000/categories/${id}/items`);
            const data = await response.json();
            commit('setCategoryItems', data);
        },
        async saveCategory({ commit }, category) {
            const response = await fetch("http://localhost:3000/categories", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(category)
            });
            const data = await response.json();
            console.log(data);
        }
    },
    mutations: {
        setCategories(state, payload) {
            state.categories = payload;
        },
        setCategory(state, payload) {
            state.category = payload;
        },
        setAttributes(state, payload) {
            state.attributes = payload;
        },
        setCategoryItems(state, payload) {
            state.categoryItems = payload;
        }
    }
});

export default store;