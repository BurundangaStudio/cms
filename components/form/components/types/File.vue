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
            <button class="upload" v-text="$t('button:second:upload')" />
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
            r: undefined
        }
    },
    watch: {
        withBack() {
            if (this.withBack) this.$nextTick(this.initSecondFile);
        }
    },
    methods: {
        initSecondFile() {

            this.r = new Resumable();
            this.r.assignDrop(this.$el.querySelector(".second-file"));
            this.r.assignBrowse(this.$el.querySelector(".second-file button"));
            this.r.on("fileAdded", this.readAddedFile);
        },
        readAddedFile(file) {
            console.log(file)
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
