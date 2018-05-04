<!--
    pages/pages.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <section class="pages">
        <h1 class="title" v-text="$t('pages')" />
        <div class="list">
            <div class="el" v-for="(page, index) in pages" :key="index" v-html="page" />
            {{ config._config }}
        </div>
    </section>
</template>

<script>

import fetch from "isomorphic-fetch";

import Config from "~/config/index";

export default {
    name: "pages",
    layout: "logged",
    async asyncData ({}) {
        const webResponse = await fetch(Config.fetchUrl + "web/pages.json");
        const adminResponse = await fetch(Config.fetchUrl + "admin/pages.json");
        const pages = await webResponse.json();
        const config = await adminResponse.json();
        return { pages, config };
    }
}

</script>

<style lang="scss" scoped>
    .pages {
        a {
            display: block;
        }
    }
</style>
