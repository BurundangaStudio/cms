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
    async asyncData ({ params, store, error }) {

        const NEW = "new";
        const DEF = "_default";

        let type = params.item;

        let configResponse = await fetch(Config.fetchUrl + "admin/" + type + "/_config.json");
        let config = await configResponse.json();
        if (!config) return error({ statusCode: 404 })

        let id = params.id === NEW ? DEF : params.id;

        let webResponse = await fetch(Config.fetchUrl + "web/" + type + "/" +  id + ".json");
        let adminResponse = await fetch(Config.fetchUrl + "admin/" + type + "/" + (config.modular ? DEF : id)  + ".json");
        let item = await webResponse.json();
        let fields = await adminResponse.json();

        if (!item && params.id !== NEW) return error({ statusCode: 404 });

        let array = []
        let aux = 0;
        for (let field in fields) {
            fields[field].value = item && item[field] ? item[field] : "";
            fields[field].key = field;
            array[fields[field].order - 1] = fields[field];
        }
        const FIELDS = {};
        Array.from(array).forEach(f => {
            const KEY = f.key;
            delete f.key;
            FIELDS[KEY] = f;
        })

        return { fields: FIELDS };
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
