<template>
    <div>
        {{category.name}}
        <template v-for="child in category.children" :key="child.id">
            {{child.id}}
            <category-with-child class="ml-4" :category="child"/>
        </template>
    </div>
</template>

<script>
export default {
    props: ['category']
}
</script>