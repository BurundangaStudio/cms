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

import _ from "lodash";
import fetch from "isomorphic-fetch";

import Config from "~/config/index";
import _defaultId from "~/config/database/id.json";
import FormComponent from "~/components/form/Form";

export default {
    name: "item",
    layout: "logged",
    async asyncData ({ params, store, error }) {

        const NEW = "new";
        const DEF = "_default";
        const ARRAY = "array";

        const NEW_ITEM = params.id === NEW;

        let type = params.item;

        let configResponse = await fetch(Config.fetchUrl + "admin/" + type + "/_config.json");
        let config = await configResponse.json();

        if (!config) return error({ statusCode: 404 })

        let id = NEW_ITEM ? DEF : params.id;

        let webResponse = await fetch(Config.fetchUrl + "web/" + type + "/" +  id + ".json");
        let adminResponse = await fetch(Config.fetchUrl + "admin/" + type + "/" + (config.modular ? DEF : id)  + ".json");
        let item = await webResponse.json();
        let fields = await adminResponse.json();

        if (!item && params.id !== NEW) return error({ statusCode: 404 });

        if (NEW_ITEM) fields.id = _defaultId;

        let array = []
        for (let field in fields) {
            if (fields[field].type === ARRAY) {
                let children = [];
                if (item && item[field]) {
                    Array.from(item[field]).forEach(value => {
                        let credit = _.cloneDeep(fields[field].children);
                        for (let field in credit) {
                            credit[field].value = value[field];
                        }
                        children.push(credit);
                    })
                }
                fields[field].value = children;
            } else {
                fields[field].value = item && item[field] ? item[field] : "";
            }
            fields[field].key = field;
            array[fields[field].order - (NEW_ITEM ? 0 : 1)] = fields[field];
        }

        const FIELDS = {};
        Array.from(array).forEach(f => {
            const KEY = f.key;
            delete f.key;
            FIELDS[KEY] = f;
        })

        return { id, type, fields: FIELDS, create: NEW_ITEM };
    },
    components: {
        FormComponent
    },
    methods: {
        save() {

            const data = this.$refs.form.getValue();

            if (data) {
                this.$store.dispatch("uploadStorage", { path: this.type + "/" + this.id, files: data.files});
            }
                // this.$store.dispatch("updateItem", {
                //     data,
                //     type: this.type,
                //     id: this.create ? data.id : this.id,
                //     create: this.create
                // })
        }
    }
}

</script>
