<!--
    layouts/data.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <nuxt/>
</template>

<script>

    export default {

        mounted() {

            console.log("DATA LAYOUT")
        },

        watch: {

            $route: 'fetchRoute'
        },

        methods: {

            fetchRoute() {

                console.log('DATA LAYOUT GOING TO: ' + this.$route.name)
            }
        }
    }

</script>
