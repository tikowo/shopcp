import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '/src/components/HelloWorld.vue'
import Categories from '/src/views/Categories/index.vue'
import CategoriesItem from '/src/views/Categories/Item.vue'
import CategoriesCreate from '/src/views/Categories/Create.vue'
import AttributesItem from '/src/views/Attributes/Item.vue'

const routes = [
    {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld,
    },
    {
        path: '/categories',
        name: 'categories',
        component: Categories
    },
    {
        path: '/categories/create',
        name: 'categoriescreate',
        component: CategoriesCreate
    },
    {
        path: '/categories/:id',
        name: 'categoryitem',
        component: CategoriesItem
    },
    {
        path: '/attributes/:id',
        name: 'attributeitem',
        component: AttributesItem
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router