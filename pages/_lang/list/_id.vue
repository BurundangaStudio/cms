<!--
    pages/list/_id.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <section class="list-page">
        <h1 class="title" v-text="$t(id)" />
        <list-component :items="items" />
        {{ config._config }}
    </section>
</template>

<script>

import fetch from "isomorphic-fetch";

import Config from "~/config/index";
import ListComponent from "~/components/list/List";

export default {
    name: "list",
    layout: "logged",
    async asyncData ({ params, redirect, store }) {
        const id = params.id;
        const webResponse = await fetch(Config.fetchUrl + "web/" + id + ".json");
        const adminResponse = await fetch(Config.fetchUrl + "admin/" + id + ".json");
        const items = await webResponse.json();
        const config = await adminResponse.json();
        if (!config) return redirect("/" + store.state.lang.locale + "/" + Config.entryPoint);
        else return { id, items, config };
    },
    components: {
        ListComponent
    }
}

</script>
