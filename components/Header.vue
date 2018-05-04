<!--
    components/Header.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <header>
        <nav class="navigation">
            <ul>
                <li v-for="(link, index) in links" :key="index">
                    <nuxt-link :to="{ name: getNameOf(link) }" v-text="$t(link)" />
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

    import Config from "~/config/index"

    export default {
        data() {
            return {
                links: Array
            }
        },
        computed: {
            lang() {
                return this.$store.state.lang.locale
            }
        },
        created() {
            this.setConfig()
        },
        methods: {
            setConfig() {

                this.links = Config.menu
            },

            getNameOf(link) {
                return "lang-" + link;
            },

            async logout() {

                await this.$store.dispatch('logout');
                this.$router.push("/" + this.lang);
            }
        }
    }
</script>

<style lang="scss">

    header {
        padding: 0px 0px 20px;

        display: grid;

        grid-template-columns: 1fr max-content;
        -ms-grid-columns: 1fr max-content;
        grid-template-rows: 1fr;
        -ms-grid-row: 1fr;

        nav {
            &.account {
                a {
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
