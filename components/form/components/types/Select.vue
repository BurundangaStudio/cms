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

    export default {
        name: "select-field",
        props: {
            name: String,
            field: Object
        },
        data() {
            return {
                select: undefined,
                error: false
            }
        },
        created() {
            this.setInitValue();
        },   
        methods: {
            setInitValue() {
                this.select = this.field.value ? this.field.value : 0;
            },
            getValue() {
                return this.select;
            },
            clean() {
                this.$refs.select.classList.remove("error");
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
            },
            dispatchError() {

                this.$refs.select.classList.add("error");
                this.$store.dispatch("pushError", this.error);
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
