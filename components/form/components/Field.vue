<!--
    components/form/components/Field.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <div class="field" :class="field.type">
        <label v-text="$t(name)" />
        <component ref="field" :is="field.type + '-field'" :name="name" :field="field" :copy="copy"/>
    </div>
</template>

<script>

    import BooleanField from "./types/Boolean";
    import ColorField from "./types/Color";
    import FilesField from "./types/Files";
    import PassField from "./types/Pass";
    import SelectField from "./types/Select";
    import TextField from "./types/Text";
    import WyswygField from "./types/Wyswyg";

    export default {
        name: "field",
        props: {
            name: String,
            type: String,
            field: Object,
            order: Number,
            copy: Object
        },
        methods: {
            valid() {

                return this.$refs.field.valid();
            },
            getValue() {

                return this.$refs.field.getValue();
            }
        },
        components: {
            BooleanField,
            ColorField,
            FilesField,
            PassField,
            SelectField,
            TextField,
            WyswygField
        }
    }

</script>

<style lang="scss" scoped>

    .field {
        padding: 10px 0px;
        label {
            display: block;
            padding-bottom: 10px;
        }
        &.boolean {
            color: black;
        }
    }

</style>
