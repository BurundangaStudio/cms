<!--
    pages/album/_id.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <section>
        Album {{ id }}
    </section>
</template>

<script>

export default {
    name: "album",
    layout: "logged",
    data() {
        return {
            id: undefined
        }
    },
    watch: {
        $route: "setData"
    },
    created() {
        this.setData();
    },
    mounted() {
        this.init();
    },
    methods: {
        setData() {
            this.id = this.$route.params.id;
        },
        init() {

            console.log("Album " + this.id);
        }
    }
}

</script>
