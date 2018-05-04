<!--
    layouts/logged.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <div class="layout logged">
        <header-component/>
        <error-overlay/>
        <nuxt/>
        <footer-component/>
    </div>
</template>

<script>

    import _ from "lodash";

    import HeaderComponent from "~/components/Header";
    import FooterComponent from "~/components/Footer";

    import ErrorOverlay from "~/components/overlays/Error";

    export default {

        name: "logged",

        middleware: "auth",

        components: {

            HeaderComponent,
            FooterComponent,
            ErrorOverlay
        }
    }

</script>
