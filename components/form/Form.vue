<!--
    components/form/Form.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <div class="form">
        <div class="fields">
            <div v-for="(field, key) in fields" :key="key">
                <field v-if="field.type !== IS_ARRAY" ref="field" :name="key" :field="field" />
                <fields-array v-else ref="field" :name="key" :field="field" />
            </div>
        </div>
    </div>
</template>

<script>

import Field from "~/components/form/components/Field";
import FieldsArray from "~/components/form/components/Array";

export default {
    data() {
        return {
            data: [],
            error: false,
            IS_ARRAY: "array"
        }
    },
    name: "formm",
    props: {
        fields: Object
    },
    methods: {
        getValue() {

            this.data = {};
            this.error = false;

            if (this.$refs.field) {
                Array.from(this.$refs.field).forEach(field => {
                    if (!field.valid()) this.error = true;
                    else this.data[field.name] = field.getValue();
                })
            }

            if (this.error) return false;

            this.$store.dispatch("cleanErrors");
            return this.data;
        }
    },
    components: {
        Field,
        FieldsArray
    }
}

</script>

<style lang="scss" scoped>

</style>

