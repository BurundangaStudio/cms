<!--
    components/form/components/Select.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <div class="select">
        <select>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
    </div>
</template>

<script>

    export default {
        name: "select-field",
        props: {
            field: Object
        },
        methods: {
            getValue() {
                return "Select";
            },
            valid() {
                return true;
            }
        }
    }

</script>

<style lang="scss">

    .select {
        select {
            width: 100%;
        }
    }

</style>
