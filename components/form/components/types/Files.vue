<!--
    components/form/components/Files.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <div class="files">
        <div class="box">
            <p v-if="files.length == 0" class="text" v-text="$t('form:drag:drop:placeholder')"></p>
            <ul class="list" v-sortable="{ onEnd: reorder }">
                <li class="file" v-for="(file, index) in files" :key="file.key">
                    <file-video
                        ref="file"
                        v-if="file.type == TYPE_VIDEO"
                        :index="index"
                        :limit="rules.limit"
                        :order="index + 1"
                        v-on:delete-file="deleteFile"
                    />
                    <file
                        ref="file"
                        v-else
                        :index="index"
                        :order="index + 1"
                        :file="file"
                        :limit="rules.limit"
                        :loading="file.loading"
                        :preview="file.preview"
                        :back-enabled="rules.backEnabled"
                        v-on:delete-file="deleteFile"
                        v-on:is-valid="isValid"
                        v-on:dispatch-error="dispatchError"
                    />
                </li>
            </ul>
        </div>
        <button v-if="rules.videoEnabled" @click="addVideo" v-text="$t('button:add:video')" />
        <button class="select-files" v-text="$t('button:select:files')" />
    </div>
</template>

<script>

import _ from "lodash";
import Resumable from "resumablejs";
import Rules from "~/config/form/rules";
import { FilesRules } from "~/config/form/rules";

import File from "./File";
import FileVideo from "./FileVideo";

export default {
    name: "files-field",
    props: {
        field: Object,
        name: String
    },
    data() {
        return {
            r: {},
            files: [],
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

            this.TYPE_VIDEO = "video";
            this.TYPE_IMAGE = "image";

            this.filesKey = 0;

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

            this.isValid(file)
            ? this.load(file)
            : this.dispatchError();
        },
        load(file) {

            if (this.rules.limit === this.files.length)
                this.deleteFile(this.files.length - 1)

            let image = {};

            image.key = this.filesKey++;
            image.file = file;
            image.loading = true;
            this.files.push(image);

            const index = this.files.length - 1;

            const fileReader = new FileReader();
            fileReader.readAsDataURL(image.file.file);
            fileReader.onload = file => {
                this.files[index].data_url = file.target.result;
                this.files[index].preview = file.target.result;
                this.files[index].loading = false;
            }
        },
        reorder({ oldIndex, newIndex }) {

            const movedItem = this.files.splice(oldIndex, 1)[0];
            this.files.splice(newIndex, 0, movedItem);
        },
        deleteFile(key) {

            if (this.files[key].type != this.TYPE_VIDEO) this.files[key].file.cancel();
            this.files.splice(key, 1);
        },
        isValid(file) {

            this.error.name = file.fileName;
            this.error.type = [];

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
            const value = [];
            if (this.$refs.file) {
                this.$refs.file.forEach(file => {
                    const fieldValue = file.getValue();
                    value[fieldValue.order - 1] = fieldValue;
                })
            }
            return value;
        },
        valid() {
            const valid = !(this.rules.required && this.files.length == 0);
            if (!valid) {
                this.box.classList.add("error");
                this.error = {
                    name: this.name,
                    type: [ "required field" ]
                }
                this.dispatchError();
            }
            return valid;
        },
        addVideo() {

            this.box.classList.remove("error");

            const video = {
                type: this.TYPE_VIDEO,
                key: this.filesKey++
            }
            this.files.push(video);
        }
    },
    components: {
        File,
        FileVideo
    }
}

</script>

<style lang="scss" scoped>
    .box {
        position: relative;
        min-height: 53px;
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
            list-style: none;
            padding: 0;
            .file {
                &.sortable-ghost {
                    cursor: grabbing;
                }
                border-bottom: 1px solid $light_grey;
                &:last-child {
                    border-bottom: none;
                }
            }
        }
    }
</style>
