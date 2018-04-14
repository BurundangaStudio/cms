<!--
    pages/page/_id.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <section class="page">
        <h1 class="title">{{ id ? "Page " + id : "New page" }}</h1>
        <form-component :fields="fields"></form-component>
        <button @click="save">SAVE</button>
    </section>
</template>

<script>

import _ from "underscore";

import FormComponent from "~/components/form/Form";
import Config from "~/config/content/pages.json";

export default {
    name: "page",
    layout: "logged",
    data() {
        return {
            id: undefined,
            fields: undefined
        }
    },
    watch: {
        $route: "setData"
    },
    created() {
        this.setData();
    },
    mounted() {
        this.init();
    },
    methods: {
        setData() {
            this.id = this.$route.params.id;
            this.fields = this.id ? _.defaults(Config.default, Config[this.id]) : Config.default;
        },
        init() {

        },
        save() {
            console.log("SAVE WITH DATA");
        }
    },
    components: {
        FormComponent
    }
}

</script>
