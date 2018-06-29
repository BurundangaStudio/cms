<!--
    components/form/Form.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <div class="form">
        <div class="fields">
            <div v-for="(field, key) in fields" :key="key">
                <field v-if="field.type !== 'array'" ref="field" :name="key" :type="field.type" :field="field" :lang="lang" />
                <fields-array v-else ref="field" :name="key" v-on:new-field="activeLang" :type="field.type" :field="field" :lang="lang" />
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
        lang: Object,
        fields: Object
    },
    watch: {
        editLang() { this.activeLang(); }
    },
    mounted() {
        this.activeLang();
    },
    methods: {
        getValue() {

            let data = [];
            let errors = false;
            this.$store.dispatch("cleanErrors");

            this.$refs.field.forEach(field =>  {
                if (!field.valid()) errors = true;
                else data.push({
                    key: field.name,
                    lang: field.field.rules.lang === true,
                    type: field.type,
                    value: field.getValue()
                });
            });

            if (errors) return false;
            else return data;
        },
        activeLang() {
            this.$el.querySelectorAll(".lang").forEach(el => { el.classList.remove("visible") });
            this.$el.querySelectorAll(`.lang-${this.editLang}`).forEach(el => { el.classList.add("visible") });
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
