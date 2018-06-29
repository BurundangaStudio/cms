<!--
    components/list/components/Item.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <li>
        <section name="grid">
            {{ name }} <nuxt-link :to="{ name: 'lang-item-id', params: { lang, item: type, id: name }}" v-html="$t('button:edit')" />
        </section>
    </li>
</template>

<script>

    import { mapState } from "vuex";

    export default {
        name: "item-component",
        props: {
            name: String,
            item: Object,
            type: String
        },
        computed: {
            ...mapState({
                lang: state => state.lang.locale
            })
        },
        methods: {
            getLinkOf() {
                return "lang-item-id"
            }
        }
    }

</script>
