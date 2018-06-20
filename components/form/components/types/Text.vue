<!--
    components/form/components/Text.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <div class="text">
        <input type="text" ref="input" v-model="text" :maxlength="field.rules.limit" @input="clean"/>
    </div>
</template>

<script>

    import ErrorHandler from "./mixins/ErrorHandler";

    export default {
        name: "text-field",
        mixins: [ ErrorHandler ],
        props: {
            name: String,
            value: String,
            field: Object
        },
        data() {
            return {
                text: ""
            }
        },
        created() {
            this.setInitValue();
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {

                this.errorFrames.push(this.$refs.input);
            },
            setInitValue() {

                this.text = this.value ? this.value : this.field.value;
            },
            getValue() {

                return this.text;
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
    }
</style>
