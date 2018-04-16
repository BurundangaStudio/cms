<!--
    pages/page/_id.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <section class="page">
        <no-ssr>
            <formm ref="form" :fields="getFields()"></formm>
        </no-ssr>
        <button @click="save">SAVE</button>
    </section>
</template>

<script>

import _ from "underscore";

import Formm from "~/components/form/Form";
import structure from "~/config/database/content-structure/pages.json";

export default {
    name: "page",
    layout: "logged",
    data () {
        return { 
            structure
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        getFields() {
            const fields = this.$route.params.id ? _.defaults(this.structure.default, this.structure[this.$route.params.id]) : structure.default;
            return fields;
        },
        init() {

            this.fields = _.clone(structure.default)
        },
        async save() {

            await console.log("SAVE WITH DATA:", this.$refs.form.getData());
        }
    },
    destroyed() {
        this.fields = {}
    },
    components: {
        Formm
    }
}

</script>
