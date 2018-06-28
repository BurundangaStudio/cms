<!--
    components/form/components/Field.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <div class="field" :class="field.type">
        <label v-text="$t(name)" />
        <component v-if="!field.rules.lang" ref="field" :is="field.type + '-field'" :name="name" :field="field" />
        <div v-else class="langs">
            <div class="indicators">
                <p v-for="(lang, key) in lang" :key="key" class="lang" :class="'lang-' + key" v-text="key" @click="$store.dispatch('setEditLang', key)" />
            </div>
            <component v-for="(lang, key) in lang" :key="key" :k="key" class="lang" :class="'lang-' + key" ref="field" :data-lang="key" :is="field.type + '-field'" :name="name" :field="field" :value="lang[key][field.value]"/>
        </div>
    </div>
</template>

<script>

    import * as FieldTypes from "./types/_Fields";

    export default {
        name: "field",
        props: {
            name: String,
            type: String,
            field: Object,
            order: Number,
            lang: Object
        },
        methods: {
            valid() {
                let error = false;
                if (Array.isArray(this.$refs.field)) {
                    this.$refs.field.forEach(field => {
                        if (!field.valid()) {
                            error = true;
                            this.$store.dispatch("setEditLang", field.$el.dataset.lang);
                        }
                    });
                } else error = !this.$refs.field.valid();
                return !error;
            },
            getValue() {
                let value = {};
                if (Array.isArray(this.$refs.field)) {
                    this.$refs.field.forEach(field => {
                        value[field.$el.dataset.lang] = field.getValue();
                    });
                } else value = this.$refs.field.getValue();
                return value;
            }
        },
        components: {
            ...FieldTypes
        }
    }

</script>

<style lang="scss" scoped>

    .field {
        position: relative;
        padding: 10px 0px;
        label {
            display: block;
            padding-bottom: 10px;
        }
        &.boolean {
            color: black;
        }
        .indicators {
            position: absolute;
            right: 0;
            top: 10px;
            p {
                font-size: 10px;
                margin: 0 2.5px;
                display: inline-block;
                text-transform: uppercase;
            }
        }
    }

</style>
