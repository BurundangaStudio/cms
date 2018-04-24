<!--
    components/form/components/File.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <ul :class="{ withBack }">
        <span>
            {{ order }}
            <img v-if="!loading" :src="preview" />
            {{ file.fileName }}
            {{ (file.size * 0.001).toFixed(0) }} KB
        </span>
        <span class="second-file" v-if="withBack">
            <span v-if="backFile">
                <img v-if="!backFile.loading" :src="backFile.preview" />
                {{ backFile.file.fileName }}
                {{ (backFile.file.size * 0.001).toFixed(0) }} KB
            </span>
            <span v-else>
                <button class="upload" v-text="$t('button:second:upload')" />
            </span>
        </span>
        <span>
            <button @click="withBack = !withBack" v-text="$t(withBack ? 'button:remove:back' : 'button:add:back')" />
            <button @click="$emit('delete-file', index)" v-text="$t('button:delete')"/>
        </span>
    </ul>
</template>

<script>

import _ from "lodash";
import Resumable from "resumablejs";

export default {
    props: {
        index: Number,
        order: Number,
        loading: Boolean,
        preview: String,
        file: Object
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
                image.preview = file.target.result;
                image.loading = false;
            }
        }
    }
}

</script>

<style lang="scss" scoped>

    ul {
        height: 50px;
        list-style: none;

        display: grid;

        grid-template-rows: 1fr;
        grid-template-columns: 1fr max-content;

        &.withBack {

            grid-template-columns: 1fr 1fr max-content;
        }

        span {
            width: 100%;
            border-right: 1px solid $light_grey;
            justify-self: start;
            &:last-child {
                border-right: none;
            }
            img {
                width: 20px;
            }
        }
    }

</style>