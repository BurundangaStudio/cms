<!--
    components/overlays/Error.vue

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
        <button v-if="errors.length != 0" @click="clean" v-text="$t('clean')"></button>
    </div>
</template>

<script>

    import { mapState } from "vuex";

    export default {
        computed: {
            ...mapState({
                errors: state => state.errors.errors
            })
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
