<!--
    components/Header.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <header>
        <nav class="navigation">
            <ul>
                <li v-for="(link, index) in menu" :key="index">
                    <nuxt-link :to="{ name: getNameOf(link), params: { id: link }}" v-html="link" />
                </li>
            </ul>
        </nav>
        <nav class="account">
            <ul>
                <li>
                    <a class="loggout" @click="logout" v-text="$t('logout')"></a>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>

    import { mapState } from "vuex";

    import Config from "~/config/index"

    export default {
        computed: {
            ...mapState({
                formLang: state => state.lang.formLang,
                menu: state => state.firebase.database.menu
            })
        },
        methods: {

            getNameOf(link) {
                return link == Config.entryPoint ? "lang-" + link : "lang-list-id";
            },

            async logout() {

                await this.$store.dispatch('auth/logout');
                this.$router.push("/" + this.lang);
            }
        }
    }
</script>

<style lang="scss">

    header {

        background: $light_grey;
        padding: 20px;

        display: grid;

        grid-template-columns: 1fr max-content;
        -ms-grid-columns: 1fr max-content;
        grid-template-rows: 1fr;
        -ms-grid-row: 1fr;

        nav {
            a, a:hover, a:focus, a:active {
                color: black;
                text-decoration: none;
                text-transform: capitalize;
            }
            &.account {
                a, a:hover, a:focus, a:active {
                    padding: 0;
                }
            }
            ul {
                list-style: none;
                padding: 0px;
                li {
                    display: inline-block;
                    a {
                        padding: 0px 20px 0px 0px;
                    }
                }
            }
        }
    }

</style>
