<!--
    pages/_lang/_item/_id.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <div class="item">
        <div>
            <pre v-text="data" />
        </div>
        <div>
            <pre v-text="fields" />
        </div>

        <!-- <div class="header">
            <h1 v-text="create ? 'New' : 'Edit ' + id"/>

            <div class="langs">
                <div class="menu">
                    <button v-for="lang in langs" :key="lang" v-text="lang" @click="active(lang)" />
                </div>
            </div>

            <button class="button" v-html="$t('button:save')" @click="save" />
        </div>

        <form-component ref="form" :fields="fields" /> -->

    </div>
</template>

<script>

import _ from "lodash";
import fetch from "isomorphic-fetch";

import Config from "~/config/index";

import Rules, { FilesRules, PassRules } from "~/config/form/rules";

import TextField from "~/components/form/components/types/Text";
import FormComponent from "~/components/form/Form";

export default {
    name: "item",
    layout: "logged",
    async asyncData ({ params, store, error }) {

        const NEW = "new";
        const DEF = "_default";
        const ARRAY = "array";
        const CONFIG = "config";

        const NEW_ITEM = params.id === NEW;
        const ID = NEW_ITEM ? DEF : params.id;

        const TYPE = params.item;

        let endPoints = [
            { key: CONFIG, url: Config.fetchUrl + "admin/" + TYPE + "/_config.json", required: true },
            { key: "item", url: Config.fetchUrl + "web/" + TYPE + "/" + ID + ".json", required: !NEW_ITEM }
        ];

        for (let lang of Config.webLangs) {
            endPoints.push({ key: "copy", subKey: lang, url: Config.fetchUrl + "copy/" + lang + ".json" })
        }

        let data = {};
        for (let ep of endPoints) {

            let req = await fetch(ep.url);
            let res = await req.json();

            if (ep.required && !res) return error({ statusCode: 404 });

            if (ep.key === CONFIG)
                endPoints.push({ key: "fields", url: Config.fetchUrl + "admin/" + TYPE + "/" + (res.modular ? DEF : ID) + ".json" });

            if (ep.subKey) {
                if (!data[ep.key]) data[ep.key] = {}
                data[ep.key][ep.subKey] = res;
            } else data[ep.key] = res;
        }

        if (NEW_ITEM)
            data.fields.id =  { "order": 0, "type": "text", "rules": { "limit": 10, "required": true, "no-spaces": true } };

        let array = [];
        for (let field in data.fields) {
            let obj = data.fields[field];
            if (obj.type === ARRAY) {
                let children = [];
                if (data.item && data.item[field]) {
                    for (let value of data.item[field]) {
                        let credit = _.cloneDeep(obj.children);
                        for (let field in credit) {
                            credit[field].value = value[field];
                        }
                        children.push(credit);
                    }
                }

                obj.value = children;
            } else {

                obj.value = data.item && data.item[field] ? data.item[field] : "";
            }
            obj.key = field;
            obj.rules = { ...Rules, ...obj.rules };
            array[obj.order - (NEW_ITEM ? 0 : 1)] = obj;
        }

        let fields = {};
        for (let f of array) {
            const KEY = f.key;
            delete f.key;
            delete f.order;
            fields[KEY] = f;
        }

        return {
            // id,
            // copy,
            // type: TYPE,
            // fields: FIELDS,
            // create: NEW_ITEM,
            // langs: Config.webLangs
            data: data.fields,
            fields
        };
    },
    methods: {
        async save() {

            let data = this.$refs.form.getValue();

            console.log(data);

            // let storageData = this.getStorageDataFrom(data);

            // console.log(storageData);


            if (data) {
                // this.$store.dispatch("uploadStorage", { path: this.type + "/" + this.id, files: data.files});
            }
                // this.$store.dispatch("updateItem", {
                //     data,
                //     type: this.type,
                //     id: this.create ? data.id : this.id,
                //     create: this.create
                // })
        },

        getStorageDataFrom(data) {

            let files = [];
            let dataFiles = [];
            let path = "images/" + this.type + "/" + data.id;

            Array.from(data.files).forEach(file => {
                if (file.type === "video") return;
                if (!file.files) {
                    console.log
                    if (!this.dataContainsItem(files, file.file)) files.push(file.file);
                } else {
                    Array.from(file.files).forEach(file => {
                        if (!this.dataContainsItem(files, file)) files.push(file);
                    });
                }
            });

            return { path, files, dataFiles };
        },

        dataContainsItem(data, item) {
            let exists = false;
            Array.from(data).forEach((el, index) => {
                if (el.data_url === item.data_url) exists = true;
            })
            return exists;
        },

        generateRandomNameFrom(file) {
            let nameParts = file.name.split(".");
            let format = nameParts[nameParts.length - 1];
            let fileName = Math.random().toString(36).substr(2, 5) + file.size +  "." + format;
        },

        active(lang) {
            console.log("active lang-" + lang);
        }
    },
    components: {
        TextField,
        FormComponent
    }
}

</script>


<style lang="scss" scoped>
    .item {
        display: flex;
        > div {
            width: 50%;
        }
    }
</style>
