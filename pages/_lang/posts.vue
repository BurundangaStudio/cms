<!--
    pages/posts.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <section class="posts">
        <h1 class="title" v-text="$t('posts')" />
        <div class="list">
            <div class="el" v-for="(post, index) in posts" :key="index" v-html="post" />
        </div>
    </section>
</template>

<script>

import fetch from "isomorphic-fetch";

export default {
    name: "posts",
    layout: "logged",
    async asyncData ({}) {
        const response = await fetch("https://burundanga-admin.firebaseio.com/web/posts.json");
        const posts = await response.json();
        return { posts };
    }
}

</script>
