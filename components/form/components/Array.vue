<!--
    components/form/components/Array.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <div class="array">
        <label v-text="$t(name)" />
        <div class="grid" v-sortable="{ onEnd: reorder }">
            <p v-if="children.length == 0" class="text" v-text="$t('add:new') + $t(name)"></p>
            <item
                v-for="(item, index) in children"
                ref="item"
                :key="item.key"
                :index="index"
                :order="index + 1"
                :item="item"
                :copy="copy"
                v-on:delete-item="deleteItem" />
        </div>
        <button @click="addItem" :aria-label="$t('button:add:item')" v-text="$t('button:add:item')"/>
    </div>
</template>

<script>

    import Item from "./types/Item";

    export default {
        name: "Array",
        props: {
            name: String,
            type: String,
            field: Object,
            copy: Object
        },
        data() {
            return {
                data: [],
                error: false,
                children: []
            }
        },
        created() {
            this.setData();
        },
        methods: {
            setData() {

                this.itemKey = 0;

                this.children = [ ...this.ordered(this.field.value) ];
            },
            ordered(data) {
                const ORDERED = [];
                Array.from(data).forEach(item => {
                    const AUX = {};
                    AUX.key = this.itemKey++;
                    AUX.fields = {};
                    for (let field in item) {
                        item[field].key = field;
                    }
                    let array = Object.values(item);
                    array.sort(this.compare);
                    Array.from(array).forEach(field => {
                        let key = field.key;
                        delete field.key;
                        AUX.fields[key] = field;
                    })
                    ORDERED.push(AUX);
                })
                return ORDERED;
            },
            compare(a,b) {
                if (a.order < b.order)
                    return -1;
                if (a.order > b.order)
                    return 1;
                return 0;
            },
            reorder({ oldIndex, newIndex }) {

                const movedItem = this.children.splice(oldIndex, 1)[0];
                this.children.splice(newIndex, 0, movedItem);
            },
            getValue() {

                this.data = [];

                if (this.$refs.item) {
                    Array.from(this.$refs.item).forEach(item => {
                        this.data[item.order - 1] = item.getValue();
                    })
                }

                return this.data;
            },
            valid() {
                this.error = false;
                if (this.$refs.item) {
                    Array.from(this.$refs.item).forEach(item => {
                        if (!item.valid()) this.error = true;
                    })
                }
                return !this.error;
            },
            addItem() {
                let data = [];
                data.push(this.field.children);
                this.children.push(this.ordered(data)[0]);
                this.$nextTick(() => { 
                    this.$emit("new-field"); 
                });
            },
            deleteItem(index) {

                this.children.splice(index, 1);
            }
        },
        components: {
            Item
        }
    }

</script>

<style lang="scss" scoped>

    .array {
        padding: 10px 0px;
        label {
            display: block;
            padding-bottom: 10px;
        }
        .grid {
            position: relative;
            @include inputBorder();
            display: flex;
            flex-wrap: wrap;
            padding: 0;
            cursor: grab;
            min-height: 50px;
            .text {
                position: absolute;
                @include centerXY();
            }
            .item {
                &.sortable-ghost {
                    cursor: grabbing;
                }
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
