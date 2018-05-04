<!--
    components/list/List.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <section class="list">
        <ul>
            <item v-for="(item, key) in items" :key="key" :name="key" :item="item" />
        </ul>
    </section>
</template>

<script>

    import Item from "./components/Item";

    export default {
        name: "list-component",
        props: {
            items: Object
        },
        components: {
            Item
        }
    }

</script>
