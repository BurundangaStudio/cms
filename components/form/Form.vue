<!--
    components/form/Form.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <div class="form">
        <div class="fields">
            <div v-for="(field, key) in fields" :key="key">
                <field v-if="field.type !== ARRAY" ref="field" :name="key" :type="field.type" :field="field" :copy="copy" />
                <fields-array v-else ref="field" :name="key" :type="field.type" :field="field" :copy="copy" />
            </div>
        </div>
    </div>
</template>

<script>

import Field from "~/components/form/components/Field";
import FieldsArray from "~/components/form/components/Array";

export default {
    name: "formm",
    computed: {
        editLang() {
            return this.$store.state.lang.editLang;
        }
    },
    props: {
        copy: Object,
        fields: Object
    },
    data() {
        return {
            data: [],
            error: false,
            ARRAY: "array"
        }
    },
    watch: {
        editLang() { this.activeLang(); }
    },
    mounted() {
        this.activeLang();
    },
    methods: {
        getValue() {

            this.data = [];
            this.error = false;

            if (this.$refs.field) {
                Array.from(this.$refs.field).forEach(field => {
                    if (!field.valid()) this.error = true;
                    else this.data.push({
                        key: field.name,
                        type: field.type,
                        value: field.getValue()
                    });
                })
            }

            if (this.error) return false;

            this.$store.dispatch("cleanErrors");
            return this.data;
        },
        activeLang() {
            this.$el.querySelectorAll(".lang").forEach(el => { el.classList.remove("visible") });
            this.$el.querySelectorAll(".lang-" + this.editLang).forEach(el => { el.classList.add("visible") });
        }
    },
    components: {
        Field,
        FieldsArray
    }
}

</script>

<style lang="scss">
    .form {
        p {
            &.lang {
                cursor: pointer;
                color: $light_grey;
            }
            &.visible {
                color: black !important;
            }
        }
        div, input {
            &.lang {
                display: none;
            }
            &.visible {
                display: block;
            }
        }
    }
</style>
