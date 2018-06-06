<!--
    components/form/components/Color.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <div class="color">
        <span class="show" ref="show" :class="{ empty : !validColor }" />
        <span class="hash" ref="hash" />
        <span class="input">
            <input type="text" ref="input" v-model="color"/>
        </span>
    </div>
</template>

<script>

import { TweenMax } from "gsap";

export default {
    name: "color-field",
    data() {
        return {
            color: "",
            validColor: false,
            error: false
        }
    },
    watch: {
        color() {
            this.validColor = this.color.length !== 0 && this.color.length > 2 && this.color.length < 7;
            TweenMax.to(this.$refs.show, 1, { background: "#" + (this.validColor ? this.color : "fff") });
        }
    },
    methods: {
        getValue() {
            return "Color";
        },
        valid() {
            return true;
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
        input[type="text"] {
            background: none;
            outline: 0;
            width: 100%;
            padding: 10px;
            font-size: 14px;
            border: none;
            &.error {
                border-color: $error_color;
            }
        }
        .show {
            &.empty {
                @include inputBorder();
                border-right: 0;
            }
        }
        .hash {
            background: #f6f6f6;
        }
    }
</style>
