<!--
    pages/json/_type/_id.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <section>
        JSON {{ type }} {{ id }}
    </section>
</template>

<script>

export default {
    data() {
        return {
            id: undefined,
            type: undefined
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
            this.type = this.$route.params.type;
        },
        init() {

            console.log("JSON type" + this.type + " and id " + this.id);
        }
    }
}

</script>
