<!--
    components/form/components/Array.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <div class="array">
        <label v-text="$t(name)" />
        <div class="grid" :class="{ empty : (children.length === 0) }">
            <child v-for="(child, key) in children" ref="child" :key="key" :child="child" />
        </div>
        <button @click="addItem" :aria-labe="$t('button:add:item')" v-text="$t('button:add:item')"/>
    </div>
</template>

<script>

    import Child from "./Child";

    export default {
        name: "Array",
        data() {
            return {
                data: [],
                error: false,
                children: []
            }
        },
        props: {
            name: String,
            field: Object
        },
        created() {
            this.setData();
        },
        methods: {
            setData() {
                this.children = [ ...this.field.value ];
            },
            getValue() {

                this.data = [];
                this.error = false;

                if (this.$refs.child) {
                    Array.from(this.$refs.child).forEach(child => {
                        if (!child.valid()) this.error = true;
                        else this.data.push(child.getValue());
                    })
                }

                if (this.error) return false;

                return this.data;
            },
            valid() {
                return true;
            },
            addItem() {
                this.children.push(this.field.children);
            }
        },
        components: {
            Child
        }
    }

</script>

<style lang="scss" scoped>

    .array {
        label {
            display: block;
            padding-bottom: 5px;
        }
        .grid {
            @include inputBorder();
            display: flex;
            flex-wrap: wrap;
            &.empty {
                border: none;
            }
            .child {
                @include transform(scale(0.85));
                padding: 10px;
                width: 25%;
                label {
                    display: block;
                    padding-bottom: 5px;
                }
            }
        }
    }

</style>
