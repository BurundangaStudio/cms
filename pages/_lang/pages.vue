<!--
    pages/pages.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <section class="pages">
        <h1 class="title">Pages</h1>
        <nuxt-link to="/page/eva">Eva page</nuxt-link>
        <nuxt-link to="/page">New page</nuxt-link>
    </section>
</template>

<script>

export default {
    name: "pages",
    layout: "logged"
}

</script>

<style lang="scss" scoped>
    .pages {
        a {
            display: block;
        }
    }
</style>
