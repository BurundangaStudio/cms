<!--
    components/form/components/Text.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <div class="text">
        <input type="text" />
    </div>
</template>

<script>



export default {
    name: "text-field",
    props: {
        field: Object
    },
    methods: {
        getData() {
            return "Text";
        }
    }
}

</script>

<style lang="scss" scoped>
    // input[type="text"] {
    //     background: none;
    //     border: 1px solid lightgray;
    //     border-radius: 2px;
    //     outline: 0;
    // }
</style>
