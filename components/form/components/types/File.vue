<!--
    components/form/components/File.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <section :class="{ withBack }">
        <span>
            <span v-if="limit !== 1">{{ order }}</span>
            <img v-if="!loading" :src="file.data_url" />
            {{ file.size }}KB
            {{ file.type }}
        </span>
        <span class="second-file" v-if="withBack">
            <span v-if="backFile">
                <img v-if="!backFile.loading" :src="backFile.data_url" />
                {{ backFile.size }}KB
                {{ backFile.type }}
            </span>
            <span v-else>
                <p class="text" v-text="$t('form:drag:drop:placeholder')"></p>
                <button class="upload" v-text="$t('button:select:file')" />
            </span>
        </span>
        <span class="buttons">
            <button v-if="backEnabled && file.new" @click="withBack = !withBack" v-text="$t(withBack ? 'button:remove:back' : 'button:add:back')" />
            <button @click="$emit('delete-file', index)" v-text="$t('button:delete')"/>
        </span>
    </section>
</template>

<script>

    import _ from "lodash";
    import Resumable from "resumablejs";

    import ErrorHandler from "~/mixins/ErrorHandler";
    import LifecycleHooks from "~/mixins/LifecycleHooks";

    export default {
        name: "file-field",
        mixins: [ LifecycleHooks, ErrorHandler ],
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
            setInitValue() {

                if (this.file.back) {
                    this.withBack = true;
                    this.backFile = this.file;
                }
            },
            initSecondFile() {

                this.box = this.$el.querySelector(".second-file");
                this.button = this.$el.querySelector(".second-file button");

                if (this.backFile) return
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
                if (this.$parent.rules.maxSize < (file.size * 0.001)) this.error.type.push(`Max size exceeded -  ${file.size * 0.001}`);

                const valid = this.error.type == 0;
                if (!valid) file.cancel();
                return valid;
            },
            load(file) {

                let image = {};

                image.file = file;
                image.size = (file.size * 0.001).toFixed(0);
                image.type = file.fileName.split(".")[1].toUpperCase();
                image.loading = true;
                this.backFile = image;

                const fileReader = new FileReader();
                fileReader.readAsDataURL(image.file.file);
                fileReader.onload = file => {
                    image.new = true;
                    image.data_url = file.target.result;
                    image.loading = false;
                    delete image.file;
                }
            },
            getValue() {

                const value = {};
                value.order = this.order;
                value.type = this.backFile ? "after/before" : "default";
                value.files = [];
                value.files.push({ data_url: this.file.data_url, size: this.file.size, type: this.file.type, new: this.file.new });
                if (this.backFile) {
                    value.files.push({ data_url: this.backFile.data_url, size: this.backFile.size, type: this.backFile.type, new: this.backFile.new });
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
            > span, img {
                vertical-align: middle;
                margin-right: 10px;
            }
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
