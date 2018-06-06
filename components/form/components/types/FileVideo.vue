<!--
    components/form/components/FileVideo.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <ul>
        <span>
            {{ order }} PUT VIDEOOO LINK
        </span>
        <span>
            <button @click="$emit('delete-file', index)" v-text="$t('button:delete')"/>
        </span>
    </ul>
</template>

<script>

export default {
    name: "video-field",
    props: {
        index: Number,
        order: Number
    },
    methods: {
        getValue() {

            const value = {};
            value.order = this.order;
            value.type = "video";
            value.server = "youtube/vimeo";
            value.id = "2392i321";
            return value;
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

        span {
            width: 100%;
            border-right: 1px solid $light_grey;
            justify-self: start;
            &:last-child {
                border-right: none;
            }
        }
    }

</style>
