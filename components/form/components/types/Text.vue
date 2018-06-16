<!--
    components/form/components/Text.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <div class="text">
        <input v-if="!field.lang" type="text" v-model="text" @input="clean"/>
        <div v-else class="langs">
            <div class="indicators">
                <p v-for="(lang, key) in copy" :key="key" class="lang" :class="'lang-' + key" v-text="key" @click="$store.dispatch('setEditLang', key)" />
            </div>
            <input v-for="(lang, key) in copy" :key="key" class="lang" :class="'lang-' + key" ref="lang" :data-lang="key" type="text" @input="clean" />
        </div>
    </div>
</template>

<script>

    export default {
        name: "text-field",
        props: {
            name: String,
            field: Object,
            copy: Object
        },
        data() {
            return {
                text: "",
                error: {
                    name: "",
                    type: []
                }
            }
        },
        created() {
            this.setInitValue();
        },
        mounted() {
            this.init();
        },
        methods: {
            setInitValue() {

                this.text = this.field.value;
            },
            init() {

                this.input = this.$el.querySelector("input");
            },
            clean() {

                this.input.classList.remove("error");
            },
            getValue() {
                if (this.field.lang) {
                    let val = {}
                    val.key = this.text;
                    this.$refs.lang.forEach(el => {
                        val[el.dataset.lang] = el.value;
                    });
                    return val;
                } else return this.text;
            },
            valid() {

                if (this.field.rules.required && this.text.length === 0) {
                    this.error = {
                        name: this.name,
                        type: [ "required field" ]
                    }
                    this.dispatchError();
                    return false;
                }
                return true;
            },
            dispatchError() {

                this.input.classList.add("error");
                this.$store.dispatch("pushError", this.error);
            }
        }
    }

</script>

<style lang="scss" scoped>
    .text {
        position: relative;
        input[type="text"] {
            background: none;
            outline: 0;
            width: 100%;
            padding: 10px;
            font-size: 14px;
            @include inputBorder();
            &.error {
                border-color: $error_color;
            }
        }
        .indicators {
            position: absolute;
            right: 0;
            top: 0;
            p {
                font-size: 10px;
                margin: 0 2.5px;
                display: inline-block;
                text-transform: uppercase;
                @include transform(translateY(-25px));
            }
        }
    }
</style>
