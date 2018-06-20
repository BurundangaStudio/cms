<!--
    components/form/components/Select.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <div class="select">
        <div ref="select" class="frame">
            <select v-model="select" @change="clean">
                <option value="0" disabled v-text="$t('select:default')" />
                <option v-for="(val, i) in field.options" :key="i" :value="i + 1" v-text="$t(val)" />
            </select>
        </div>
    </div>
</template>

<script>

    import ErrorHandler from "./mixins/ErrorHandler";
    import LifecycleHooks from './mixins/LifecycleHooks';

    export default {
        name: "select-field",
        mixins: [ ErrorHandler, LifecycleHooks ],
        props: {
            name: String,
            field: Object
        },
        data() {
            return {
                select: 0
            }
        },
        methods: {
            setInitValue() {
                this.select = this.field.value ? this.field.value : 0;
            },
            init() {
                this.errorFrames.push(this.$refs.select);
            },
            getValue() {
                return this.select;
            },
            valid() {
                if (this.select == 0) {
                    this.error = {
                        name: this.name,
                        type: [ "Select any option" ]
                    }
                    this.dispatchError();
                    return false;
                }
                return true;
            }
        }
    }

</script>

<style lang="scss">

    .select {
        .frame {
            @include inputBorder();
            padding: 0px 5px;
            &.error {
                border-color: $error_color;
            }
            select {
                background: none;
                outline: 0;
                width: 100%;
                padding: 10px;
                height: 40px;
                font-size: 14px;
                border: none; 
            }
        }
    }

</style>
