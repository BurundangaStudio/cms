<!--
    layouts/logged.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <div class="logged-layout">
        <header-component/>
        <nuxt/>
        <footer-component/>
    </div>
</template>

<script>

    import HeaderComponent from "~/components/common/Header"
    import FooterComponent from "~/components/common/Footer"

    export default {

        name: "logged",

        middleware: "auth",

        components: {

            HeaderComponent,
            FooterComponent
        }
    }

</script>
