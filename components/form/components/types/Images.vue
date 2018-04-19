<!--
    components/form/components/Images.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <div class="images">
        <div class="box">
            <p v-if="images.length == 0" class="text">Drag/drop here your images</p>
            <ul class="list" v-sortable="{ onEnd: reorder }">
                <li class="item" v-for="(i, index) in images" :key="i.order">
                    {{ i.file.fileName }} <button @click="deleteItem(index)">DELETE</button>
                </li>
            </ul>
        </div>
        <button class="select-files">Select files</button>
    </div>
</template>

<script>

import Resumable from "resumablejs";

export default {
    name: "images-field",
    data() {
        return {
            r: {},
            images: []
        }
    },
    mounted() {
        this.init();
    },
    watch: {
        images() {
            console.log(this.images)
        }
    },
    methods: {
        init() {

            this.box = this.$el.querySelector(".box");
            this.list = this.box.querySelector(".list");
            this.button = this.$el.querySelector(".select-files");

            this.initResumable();
        },
        initResumable() {

            this.r = new Resumable();
            this.r.assignDrop(this.box);
            this.r.assignBrowse(this.button);
            this.r.on("fileAdded", this.readAddedFile);
        },
        readAddedFile(file) {

            this.images.push({ order: this.images.length + 1, file });
        },
        reorder({ oldIndex, newIndex }) {

            const movedItem = this.images.splice(oldIndex, 1)[0];
            this.images.splice(newIndex, 0, movedItem);
        },
        deleteItem(key) {

            this.images.splice(key, 1);
        }
    }
}

</script>

<style lang="scss" scoped>
    .box {
        position: relative;
        min-height: 80px;
        max-height: 200px;
        overflow-y: scroll;
        @include inputBorder();
        margin: 20px 0px;
        .text {
            position: absolute;
            @include centerXY();
        }
        .list {
            cursor: grab;
            &.dragging {
                cursor: grabbing;
            }
            list-style: none;
            padding: 0;
            .item {
                border-bottom: 1px solid $light_grey;
                padding: 10px 20px;
                &:last-child {
                    border-bottom: none;
                }
            }
        }
    }
</style>
