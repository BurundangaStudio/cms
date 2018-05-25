<!--
    components/form/Form.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <div class="form">
        <div class="fields">
            <field ref="field" v-for="(field, key) in fields" :key="key" :name="key" :field="field" />
        </div>
    </div>
</template>

<script>

import Field from "~/components/form/components/Field";

export default {
    data() {
        return {
            data: [],
            error: false
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
                    console.log(field.name + " " + field.getValue());
                })
            }

            if (this.error) return false;

            this.$store.dispatch("cleanErrors");
            return this.data;
        }
    },
    components: {
        Field
    }
}

</script>

<style lang="scss" scoped>

</style>

