<!--
    pages/albums.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <section class="albums">
        <h1 class="title" v-text="$t('albums')" />
        <div class="list">
            <div class="el" v-for="(album, index) in albums" :key="index" v-html="album" />
        </div>
    </section>
</template>

<script>

import fetch from "isomorphic-fetch";

export default {
    name: "albums",
    layout: "logged",
    async asyncData ({}) {
        const response = await fetch("https://burundanga-admin.firebaseio.com/web/albums.json");
        const albums = await response.json();
        return { albums };
    }
}

</script>
