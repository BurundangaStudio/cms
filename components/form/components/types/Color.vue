<!--
    components/form/components/Color.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <div class="color">
        <span class="show" ref="show" :class="{ empty : !validColor, white : whiteColor }" />
        <span class="hash" ref="hash" />
        <span class="input" ref="input">
            <input type="text" v-model="color" maxlength="6" @input="clean"/>
        </span>
    </div>
</template>

<script>

import { TweenMax } from "gsap";

export default {
    name: "color-field",
    props: {
        name: String,
        field: Object
    },
    data() {
        return {
            color: "",
            validColor: false,
            whiteColor: false,
            error: false
        }
    },
    watch: {
        color() {
            this.whiteColor = this.color.match(/^(fff|ffff|fffff|ffffff)$/);
            this.validColor = this.color.length !== 0 && this.color.length > 2 && this.color.length < 7;
            TweenMax.to(this.$refs.show, 1, { background: "#" + (this.validColor ? this.color : "fff") });
        }
    },
    created() {
        this.setData();
    },
    methods: {
        setData() {

            this.color = this.field.value ? this.field.value.replace("#", "") : "fff";
        },
        clean() {

            this.$refs.input.classList.remove("error");
        },
        getValue() {
            return this.color;
        },
        valid() {

            if (!(this.color.length !== 0 && this.color.length > 2 && this.color.length < 7)) {
                this.error = {
                    name: this.name,
                    type: [ "bad structure" ]
                }
                this.dispatchError();
                return false;
            } else if (this.color.length === 0 && this.field.required) {
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

            this.$refs.input.classList.add("error");
            this.$store.dispatch("pushError", this.error);
        }
    }
}

</script>

<style lang="scss" scoped>
    .color {
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: 39px 40px 1fr ;
        .input, .hash {
            @include inputBorder();
        }
        .hash {
            position: relative;
            border-right: 0;
            &::after {
                position: absolute;
                content: "#";
                color: #999;
                @include centerXY();
            }
        }
        .input {
            &.error {
                border-color: $error_color;
            }
            input[type="text"] {
                background: none;
                outline: 0;
                width: 100%;
                padding: 10px;
                font-size: 14px;
                border: none;
            }
        }
        .show {
            &.empty, &.white {
                @include inputBorder();
                border-right: 0;
            }
        }
        .hash {
            background: #f6f6f6;
        }
    }
</style>
