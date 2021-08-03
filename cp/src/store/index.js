import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            categories: null,
            category: null,
            attributes: null,
        }
    },
    actions: {
        async getCategories({ commit }) {
            const data = await fetch('http://localhost:3000/categories');
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
        }
    }
});

export default store;