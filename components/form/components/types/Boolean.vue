<!--
    components/form/components/Boolean.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <div class="boolean">
        <input type="checkbox" :id="'bool-' + name + '-' + k" v-model="bool">
        <label :for="'bool-' + name + '-' + k"></label>
    </div>
</template>

<script>

    import LifecycleHooks from "~/mixins/LifecycleHooks";

    export default {
        name: "boolean-field",
        mixins: [ LifecycleHooks ],
        props: {
            name: String,
            field: Object,
            k: String
        },
        data() {
            return {
                bool: false
            }
        },
        methods: {
            getValue() {
                return !this.bool;
            },
            valid() {
                return true;
            }
        }
    }

</script>

<style lang="scss" scoped>

    $color2: #3e8a38;
    $color3: white;
    $switch-height: 30px;
    $switch-width: $switch-height;
    $knob-height: 24px;
    $translate-distance: $switch-width;
    $first-flag: $light_grey center;
    $second-flag: #34762f center;

    *, *:before, *:after {
        box-sizing: border-box;
    }

    .boolean {
        cursor: pointer;
        position: relative;
        outline: 0;
        -webkit-perspective: 1000;
        -webkit-backface-visibility: hidden;
        -webkit-transform:translate3d(0,0,0);
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        width: 60px;
        height: $switch-height;
        margin: 5px 0px;

        input{
            display:none;
        }

        input + label {
            display: block;
            position: absolute;
            cursor: pointer;
            user-select: none;
            width: 60px;

            &:before, &:after {
                content: "";
                position: absolute;
                border-radius: 30px;
                transition: all 0.25s ease-in-out;
            }

            &:before {
                height: $switch-height;
                width: $switch-width*2;
                background-color: $color2;
            }

            &:after {
                top: 3px;
                left: 3px;
                border: 2px solid white;
                width: $knob-height;
                height: $knob-height;
                background: $second-flag;
                transform:  translate($translate-distance, 0);
                -webkit-transform: translate($translate-distance, 0);

            }
        }

        input:checked + label:after {
            background: $first-flag;
            transition: all 0.25s ease-in-out;
            -webkit-transform: translate(0 ,0);
            transform: translate(0 ,0);
        }

        input:checked + label:before {
            background-color: $light_grey;
        }
    }
</style>

