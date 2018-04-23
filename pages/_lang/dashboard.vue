<!--
    pages/dashboard.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <section class="dashboard">
        <h1 class="title" v-text="$t('dashboard')"/>
    </section>
</template>

<script>

export default {
    name: "dashboard",
    layout: "logged"
}

</script>
