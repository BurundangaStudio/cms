<!--
    pages/_lang/_item/_id.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>

    <div class="item">
        <div class="header" ref="header">
            <div class="title">
                <h1 v-text="create ? 'New' : 'Edit'"/>
            </div>
            <div class="langs">
                <button v-for="(l, key) in lang" :key="key" v-text="key" :class="{ active : key === $store.state.lang.editLang }" @click="$store.dispatch('setEditLang', key)" />
            </div>
            <div class="save-button">
                <button class="button" v-html="$t('button:save')" @click="save" />
            </div>
        </div>
        <form-component ref="form" :lang="lang" :fields="fields" />
    </div>

</template>

<script>

    import _ from "lodash";
    import fetch from "isomorphic-fetch";

    import Config from "~/config/index";

    import Rules from "~/config/form/rules";

    import FormComponent from "~/components/form/Form";

    import LifecycleHooks from "~/mixins/LifecycleHooks";

    export default {
        name: "item",
        layout: "logged",
        head () {
            return {
                title: "Album"
            }
        },
        mixins: [ LifecycleHooks ],
        async asyncData ({ params, store, error }) {

            const NEW = "new";
            const DEF = "_default";
            const ARRAY = "array";
            const CONFIG = "config";

            const NEW_ITEM = params.id === NEW;
            const ID = NEW_ITEM ? DEF : params.id;

            const TYPE = params.item;

            let endPoints = [
                { key: CONFIG, url: `${Config.fetchUrl}admin/${TYPE}/_config.json`, required: true },
                { key: "item", url: `${Config.fetchUrl}web/${TYPE}/${ID}.json`, required: !NEW_ITEM }
            ];

            Config.webLangs.forEach(lang => {
                endPoints.push({ key: "lang", subKey: lang, url: `${Config.fetchUrl}lang/${lang}.json` })
            });

            let data = {};
            for (let endPoint of endPoints) {

                let request = await fetch(endPoint.url);
                let response = await request.json();

                if (endPoint.required && !response) return error({ statusCode: 404 });

                if (endPoint.key === CONFIG)
                    endPoints.push({ key: "fields", url: `${Config.fetchUrl}admin/${TYPE}/${response.modular ? DEF : ID}.json` });

                if (endPoint.subKey) {
                    if (!data[endPoint.key]) data[endPoint.key] = {}
                    data[endPoint.key][endPoint.subKey] = response;
                } else data[endPoint.key] = response;
            }

            let array = [];
            for (let field in data.fields) {
                let obj = data.fields[field];
                if (obj.type === ARRAY) {
                    let children = [];
                    if (data.item && data.item[field]) {
                        data.item[field].forEach(value => {
                            let child = _.cloneDeep(obj.children);
                            for (let field in child) {
                                child[field].value = value[field];
                            }
                            children.push(child);
                        })
                    }

                    obj.value = children;
                } else {

                    obj.value = data.item && data.item[field] ? data.item[field] : "";
                }
                obj.key = field;
                obj.rules = { ...Rules, ...obj.rules };
                array[obj.order - 1] = obj;
            }

            let fields = {};
            array.forEach(f => {
                const KEY = f.key;
                delete f.key;
                delete f.order;
                fields[KEY] = f;
            });

            let editLang = store.state.lang.editLang ? store.state.lang.editLang : Config.webLangs[0];
            store.dispatch("setEditLang", editLang);

            return {
                id: ID,
                type: TYPE,
                create: NEW_ITEM,
                lang: data.lang,
                fields,
                scrollPoint: 0,
                scrollLimit: 0
            };
        },
        methods: {
            init() {

                this.setListeners();
            },

            save() {

                let data = this.$refs.form.getValue();
                let context = {
                    id: this.id,
                    type: this.type,
                    create: this.create
                }
                if (data) this.$store.dispatch("parseData", { context, data });
            },

            onScrollHandler() {
                if (this.$el.getBoundingClientRect().top < 0) {
                    this.$el.classList.add("scrolling");
                    this.$refs.header.classList.add("fixed");
                } else {
                    this.$el.classList.remove("scrolling");
                    this.$refs.header.classList.remove("fixed");
                }
            },
            onResizeHandler() {
                this.scrollLimit = this.$el.getBoundingClientRect().top + this.scrollPoint;
            },
            setListeners() {
                window.addEventListener("scroll", this.onScrollHandler);
            },
            destroyListeners() {
                window.removeEventListener("scroll", this.onScrollHandler);
            }
        },
        components: {
            FormComponent
        }
    }

</script>


<style lang="scss" scoped>
    .item {
        &.scrolling {
            padding-top: 59px;
        }
        button {
            &.active {
                background: $light_grey;
            }
        }
        .header {

            padding: 10px 0px;
            display: grid;
            grid-template-columns: max-content 1fr max-content;

            &.fixed {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                background: white;
                z-index: 9;
                padding: 10px 20px;
                border-bottom: 1px solid $light_grey;
            }

            .langs {
                text-align: right;
                padding-right: 20px;
                button {
                    width: 50px;
                    border-left: none;
                    &:first-child {
                        border-left: 1px solid $light_grey;
                    }
                }
            }
        }
    }
</style>
