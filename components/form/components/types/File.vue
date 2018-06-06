<!--
    components/form/components/File.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <section :class="{ withBack }">
        <span>
            <span v-if="limit !== 1">{{ order }}</span>
            <img v-if="!loading" :src="file.preview" />
            {{ file.file.fileName }}
            {{ (file.file.size * 0.001).toFixed(0) }}KB
            {{ file.size }}
        </span>
        <span class="second-file" v-if="withBack">
            <span v-if="backFile">
                <img v-if="!backFile.loading" :src="backFile.preview" />
                {{ backFile.file.fileName }}
                {{ (backFile.file.size * 0.001).toFixed(0) }}KB
                {{ backFile.size }}
            </span>
            <span v-else>
                <p class="text" v-text="$t('form:drag:drop:placeholder')"></p>
                <button class="upload" v-text="$t('button:select:file')" />
            </span>
        </span>
        <span class="buttons">
            <button v-if="backEnabled" @click="withBack = !withBack" v-text="$t(withBack ? 'button:remove:back' : 'button:add:back')" />
            <button @click="$emit('delete-file', index)" v-text="$t('button:delete')"/>
        </span>
    </section>
</template>

<script>

import _ from "lodash";
import Resumable from "resumablejs";

export default {
    name: "file-field",
    props: {
        index: Number,
        order: Number,
        loading: Boolean,
        preview: String,
        file: Object,
        backEnabled: Boolean,
        limit: Number
    },
    data() {
        return {
            withBack: false,
            r: undefined,
            error: {},
            backFile: undefined
        }
    },
    watch: {
        withBack() {
            if (this.withBack) this.$nextTick(this.initSecondFile);
            else this.backFile = undefined;
        }
    },
    methods: {
        initSecondFile() {

            this.box = this.$el.querySelector(".second-file");
            this.button = this.$el.querySelector(".second-file button");

            this.r = new Resumable({ maxFiles: 1 });
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
        isValid(file) {

            this.error.name = file.fileName;
            this.error.type = [];

            if (!this.$parent.rules.format.includes(this.$parent.getFileExtensionOf(file.fileName))) this.error.type.push("Wrong format.");
            if (this.$parent.rules.maxSize < (file.size * 0.001)) this.error.type.push("Max size exceeded - " + file.size * 0.001);

            const valid = this.error.type == 0;
            if (!valid) file.cancel();
            return valid;
        },
        dispatchError() {

            this.$store.dispatch("pushError", this.error);
        },
        load(file) {

            let image = {};

            image.file = file;
            image.loading = true;
            this.backFile = image;

            const fileReader = new FileReader();
            fileReader.readAsDataURL(image.file.file);
            fileReader.onload = file => {
                image.data_url = file.target.result;
                image.preview = file.target.result;
                image.loading = false;
            }
        },
        getValue() {

            const value = {};
            value.order = this.order;
            value.type = this.backFile ? "after/before" : "default"
            if (value.type == "default") {
                value.file = { name: this.file.file.fileName, data_url: this.file.data_url };
            } else {
                value.files = [];
                value.files.push({ name: this.file.file.fileName, data_url: this.file.data_url } );
                value.files.push({ name: this.backFile.file.fileName, data_url: this.backFile.data_url });
            }
            return value;
        }
    }
}

</script>

<style lang="scss" scoped>

    section {

        padding: 0px 10px;

        list-style: none;

        display: grid;

        grid-template-rows: 1fr;
        grid-template-columns: 1fr max-content;

        &.withBack {

            grid-template-columns: 1fr 1fr max-content;
        }

        > span {
            pointer-events: none;
            display: block;
            align-self: center;
            padding: 10px 0px;
            width: 100%;
            border-right: 1px solid $light_grey;
            &.buttons, &.second-file  {
                pointer-events: auto;
                button {
                    cursor: pointer;
                }
            }
            &:last-child {
                border-right: none;
            }
            img {
                width: 30px;
                height: 30px;
                object-fit: cover;
            }
        }
    }

</style>
