<!--
    components/form/components/Text.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <div class="text">
        <input type="text" v-model="text"/>
    </div>
</template>

<script>



export default {
    name: "text-field",
    props: {
        field: Object,
        value: String
    },
    data() {
        return {
            text: ""
        }
    },
    created() {
        this.setInitValue();
    },
    methods: {
        setInitValue() {

            this.text = this.value;
        },
        getValue() {

            return this.text;
        },
        valid() {

            return true;
        }
    }
}

</script>

<style lang="scss" scoped>
    input[type="text"] {
        background: none;
        outline: 0;
        width: 100%;
        padding: 10px;
        font-size: 14px;
        @include inputBorder();
    }
</style>
