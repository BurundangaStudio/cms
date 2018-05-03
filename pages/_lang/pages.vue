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
        </div>
    </section>
</template>

<script>

import fetch from "isomorphic-fetch";

export default {
    name: "pages",
    layout: "logged",
    async asyncData ({}) {
        const response = await fetch("https://burundanga-admin.firebaseio.com/web/pages.json");
        const pages = await response.json();
        return { pages };
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
