<!--
    components/form/components/Images.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <div class="images">
        <div class="box">
            <p v-if="images.length == 0" class="text" v-text="$t('form:drag:drop:placeholder')"></p>
            <ul class="list" v-sortable="{ onEnd: reorder }">
                <li class="item" v-for="(i, index) in images" :key="i.order">
                    {{ i.file.fileName }} <button @click="deleteItem(index)" v-text="$t('button:delete')"/>
                </li>
            </ul>
        </div>
        <button class="select-files" v-text="$t('button:select:files')" />
    </div>
</template>

<script>

import _ from "lodash";
import Resumable from "resumablejs";
import Rules from "~/config/form/rules";
import { FilesRules } from "~/config/form/rules";

export default {
    name: "images-field",
    props: {
        field: Object,
        name: String
    },
    data() {
        return {
            r: {},
            images: [],
            rules: {},
            error: {
                name: "",
                type: []
            }
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {

            this.setRules();

            this.box = this.$el.querySelector(".box");
            this.list = this.box.querySelector(".list");
            this.button = this.$el.querySelector(".select-files");

            this.initResumable();
        },
        setRules() {

            this.rules = _.defaults(this.field.rules, FilesRules, Rules);
        },
        initResumable() {

            this.r = new Resumable();
            this.r.assignDrop(this.box);
            this.r.assignBrowse(this.button);
            this.r.on("fileAdded", this.readAddedFile);
        },
        readAddedFile(file) {

            this.box.classList.remove("error");

            this.isValidFile(file)
            ? this.images.push({ order: this.images.length + 1, file })
            : this.dispatchError();
        },
        reorder({ oldIndex, newIndex }) {

            const movedItem = this.images.splice(oldIndex, 1)[0];
            this.images.splice(newIndex, 0, movedItem);
        },
        deleteItem(key) {

            this.images[key].file.cancel();
            this.images.splice(key, 1);
        },
        isValidFile(file) {

            this.error.name = file.fileName;
            this.error.type = [];

            if (this.images.length + 1 > this.rules.limit) this.error.type.push("Limit exceeded.");
            if (!this.rules.format.includes(this.getFileExtensionOf(file.fileName))) this.error.type.push("Wrong format.");
            if (this.rules.maxSize < (file.size * 0.001)) this.error.type.push("Max size exceeded - " + file.size * 0.001);

            const valid = this.error.type == 0;
            if (!valid) file.cancel();
            return valid;
        },
        getFileExtensionOf(name) {

            const segments = name.split(".");
            return segments[segments.length - 1];
        },
        dispatchError() {

            this.$store.dispatch("pushError", this.error);
        },
        getValue() {
            return this.images;
        },
        valid() {
            const valid = !(this.rules.required && this.images.length == 0);
            if (!valid) {
                this.box.classList.add("error");
                this.error = {
                    name: this.name,
                    type: [ "required field" ]
                }
                this.dispatchError();
            }
            return valid;
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
        &.error {
            border-color: $error_color;
        }
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
