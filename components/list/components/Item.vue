<!--
    components/list/components/Item.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <li>
        {{ name }}: {{ item }}
    </li>
</template>

<script>

    export default {
        name: "item-component",
        props: {
            name: String,
            item: Object
        }
    }

</script>
