<!--
    components/common/overlays/Error.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <div class="overlay error">
        <div class="error" v-for="(error, i) in errors" :key="i">
            <p>{{ error.name }}</p>
            <p v-for="(t, i) in error.type" :key="i">
                {{ t }}
            </p>
        </div>
        <button @click="clean">Clean</button>
    </div>
</template>

<script>

export default {
    computed: {
        errors() {
            return this.$store.state.errors.errors
        }
    },
    methods: {
        clean() {

            this.$store.dispatch("cleanErrors");
        }
    }
}

</script>

<style lang="scss" scoped>
</style>
