<!--
    components/form/components/Pass.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <div class="pass">
        <input type="password" ref="pass" v-model="pass" @input="clean"/>
        <input type="password" ref="cpass" v-model="cpass" @input="clean"/>
        <button v-if="pass.length > 0 || cpass.length > 0" @mousedown="show(true)" @mouseup="show(false)" v-text="'Show'"/>
    </div>
</template>

<script>

    import Rules from "~/config/form/rules";
    import { PassRules } from "~/config/form/rules";
    import ErrorHandler from "~/mixins/ErrorHandler";
    import LifecycleHooks from '~/mixins/LifecycleHooks';

    export default {
        name: "pass-field",
        mixins: [ ErrorHandler, LifecycleHooks ],
        props: {
            name: String,
            field: Object
        },
        data() {
            return {
                pass: "",
                cpass: "",
                rules: {}
            }
        },
        methods: {
            setInitValue() {

                this.pass = this.field.value;
                this.cpass = this.field.value;
            },
            init() {

                this.setRules();
                this.errorFrames.push(this.$refs.pass);
                this.errorFrames.push(this.$refs.cpass);
            },
            setRules() {

                this.rules = _.defaults(this.field.rules, PassRules, Rules);
            },
            show(state) {
                this.$refs.pass.type = state === true ? "text" : "password";
                this.$refs.cpass.type = state === true ? "text" : "password";
            },
            getValue() {

                return this.pass;
            },
            valid() {

                if (this.rules.required && this.pass.length === 0) {
                    this.error = {
                        name: this.name,
                        type: [ "required field" ]
                    }
                    this.dispatchError();
                    return false;
                } else if (this.pass !== this.cpass) {
                    this.error = {
                        name: this.name,
                        type: [ "passes didn't match" ]
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
    input {
        background: none;
        outline: 0;
        width: 100%;
        padding: 10px;
        font-size: 14px;
        @include inputBorder();
        &.error {
            border-color: $error_color;
        }
        &:first-child {
            margin-bottom: 10px;
        }
    }
</style>
