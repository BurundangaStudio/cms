<!--
    pages/post/_id.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <section class="post">
        <h1 class="title">{{ $t('post') + " " + id }}</h1>
    </section>
</template>

<script>

export default {
    name: "post",
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

            console.log("Post " + this.id);
        }
    }
}

</script>
