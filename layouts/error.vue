<!--
    layouts/error.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <div class="container">
        <h1 v-if="error.statusCode === 404">Page not found</h1>
        <h1 v-else>An error occurred</h1>
    </div>
</template>

<script>
    export default {
        props: ['error'],
        mounted() {
            console.log("ERROR LAYOUT");
        }
    }
</script>
