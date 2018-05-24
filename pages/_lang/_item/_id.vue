<!--
    pages/_lang/_item/_id.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <section class="item">
        <form-component ref="form" :fields="fields" />
        <button class="button" v-html="$t('button:save')" @click="save" />
    </section>
</template>

<script>

import fetch from "isomorphic-fetch";

import Config from "~/config/index";
import FormComponent from "~/components/form/Form";

export default {
    name: "item",
    layout: "logged",
    async asyncData ({ params, redirect, store }) {
        let id = params.id === "new" ? "_default" : params.id;
        let type = params.item;
        let webResponse = await fetch(Config.fetchUrl + "web/" + type + "/" +  id + ".json");
        let adminResponse = await fetch(Config.fetchUrl + "admin/" + type + "/" + id + ".json");
        let item = await webResponse.json();
        let config = await adminResponse.json();
        for (let field in config) {
            config[field].value = item && item[field] ? item[field] : "";
        }
        const FIELDS = { ...config };
        if (!config) return redirect("/" + store.state.lang.locale + "/" + Config.entryPoint);
        else return { fields: FIELDS };
    },
    components: {
        FormComponent
    },
    methods: {
        save() {
            console.log(this.$refs.form.getValue());
        }
    }
}

</script>
