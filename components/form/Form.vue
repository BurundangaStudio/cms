<!--
    components/form/Form.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <div class="form">
        Form
        <div class="fields">
            <field ref="field" v-for="(field, key) in fields" :key="key" :name="key" :field="field"></field>
        </div>
    </div>
</template>

<script>

import Field from "~/components/form/components/Field";

export default {
    name: "formm",
    props: {
        fields: Object
    },
    methods: {
        getData() {
            const data = [];
            Array.from(this.$refs.field).forEach(field => {
                data.push(field.getData());
            })
            return data;
        }
    },
    components: {
        Field
    }
}

</script>

<style lang="scss" scoped>

</style>

