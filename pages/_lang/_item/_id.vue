<!--
    pages/_lang/_item/_id.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>

    <div class="item">
        <div class="header" ref="header">
            <div class="title">
                <h1 v-text="create ? 'New' : 'Edit ' + id"/>
            </div>
            <div class="langs">
                <button v-for="(lang, key) in copy" :key="key" v-text="key" :class="{ active : key === $store.state.lang.editLang }" @click="$store.dispatch('setEditLang', key)" />
            </div>
            <div class="save-button">
                <button class="button" v-html="$t('button:save')" @click="save" />
            </div>
        </div>
        <form-component ref="form" :copy="copy" :fields="fields" />
    </div>

</template>

<script>

    import _ from "lodash";
    import fetch from "isomorphic-fetch";

    import Config from "~/config/index";

    import Rules from "~/config/form/rules";

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
            for (let endPoint of endPoints) {

                let request = await fetch(endPoint.url);
                let response = await request.json();

                if (endPoint.required && !response) return error({ statusCode: 404 });

                if (endPoint.key === CONFIG)
                    endPoints.push({ key: "fields", url: Config.fetchUrl + "admin/" + TYPE + "/" + (response.modular ? DEF : ID) + ".json" });

                if (endPoint.subKey) {
                    if (!data[endPoint.key]) data[endPoint.key] = {}
                    data[endPoint.key][endPoint.subKey] = response;
                } else data[endPoint.key] = response;
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

            let editLang = store.state.lang.editLang ? store.state.lang.editLang : Config.webLangs[0];
            store.dispatch('setEditLang', editLang);

            return {
                id: ID,
                type: TYPE,
                create: NEW_ITEM,
                copy: data.copy,
                fields,
                scrollPoint: 0,
                scrollLimit: 0
            };
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {

                this.setListeners();
            },
            async save() {

                let data = this.$refs.form.getValue();
                console.log(data);
            },
            onScrollHandler() {
                this.scrollPoint = window.scrollY || window.pageYOffset;
                if (this.scrollPoint > this.scrollLimit) {
                    this.$el.classList.add("scrolling");
                    this.$refs.header.classList.add("fixed");
                } else {
                    this.$el.classList.remove("scrolling");
                    this.$refs.header.classList.remove("fixed");
                }
            },
            onResizeHandler() {
                this.scrollLimit = this.$refs.header.getBoundingClientRect().top;
            },
            setListeners() {
                this.onScrollHandler();
                window.addEventListener("scroll", this.onScrollHandler);
                this.onResizeHandler();
                window.addEventListener("resize", this.onResizeHandler);
            },
            destroyListeners() {
                window.removeEventListener("scroll", this.onScrollHandler);
                window.removeEventListener("resize", this.onResizeHandler);
            }
        },
        beforeDestroy() {
            this.destroyListeners();
        },
        components: {
            FormComponent
        }
    }

</script>


<style lang="scss" scoped>
    .item {
        &.scrolling {
            padding-top: 39px;
        }
        button {
            &.active {
                background: $light_grey;
            }
        }
        .header {

            display: grid;
            grid-template-columns: max-content 1fr max-content;

            &.fixed {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                background: lime;
            }

            .langs {
                text-align: right;
            }
        }
    }
</style>
