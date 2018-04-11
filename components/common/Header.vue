<!--
    components/common/Header.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <header>
        <nav class="navigation">
            <ul>
                <li v-for="(link, index) in links" :key="index">
                    <nuxt-link :to="link" v-text="link" />
                </li>
            </ul>
        </nav>
        <nav class="account">
            <ul>
                <li>
                    <a class="loggout" @click="logout">Logout</a>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>

    import config from "~/config/navigation"

    export default {
        data() {
            return {
                links: Array
            }
        },
        created() {
            this.setConfig()
        },
        methods: {
            setConfig() {

                this.links = config.menu
            },

            async logout() {

                await this.$store.dispatch('logout');
                this.$router.push("/");
            }
        }
    }
</script>

<style lang="scss">

    header {
        padding: 20px 0px;
        a {
            padding: 0px 20px 0px 0px;
        }
    }

</style>
