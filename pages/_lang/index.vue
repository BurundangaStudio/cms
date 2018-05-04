<!--
    pages/index.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <section class="page login">
        <div class="grid">
            <div class="centered">
                <h1 class="title" v-text="$t('login')" />
                <input type="text" name="email" id="email" :placeholder="$t('login:email:placeholder')" value="_@burundanga.studio">
                <input type="password" name="password" id="password" :placeholder="$t('login:pass:placeholder')" value="Burundanga.1">
                <button class="button" @click="login" v-text="$t('login')" />
            </div>
        </div>
    </section>
</template>

<script>

    import config from "~/config/index"
    import { TweenMax } from "gsap";

    export default {
        name: "login",
        head: {
            title: "Burundanga Studio | Login"
        },
        transition: {
            enter(el, done) {
                TweenMax.to(el, 1, { opacity: 1 })
            }
        },
        computed: {
            lang() {
                return this.$store.state.lang.locale
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {

                this.emailInput = this.$el.querySelector("#email");
                this.passwordInput = this.$el.querySelector("#password");
            },

            async login() {

                const email = this.emailInput.value;
                const password = this.passwordInput.value;

                await this.$store.dispatch("login", { email, password });
                this.$router.push("/" + this.lang + "/" + config.entryPoint);
            }
        }
    }

</script>

<style lang="scss" scoped>
    .login {
        opacity: 0;
        will-change: opacity;
        height: 100vh;

        .grid {
            display: grid;

            grid-template-columns: 1fr;
            grid-template-rows: 1fr;

            height: 100%;

            .centered {
                grid-column: 1;
                grid-row: 1;
                -ms-grid-column: 1;
                -ms-grid-row: 1;

                align-self: center;
                margin: 0 auto;

                text-align: center;

                h1 {
                    margin-bottom: 10px;
                }

                input, button {

                    width: 100%;
                    padding: 10px;
                    margin: 5px 0px;
                    background: none;
                    border: 1px solid rgba(0,0,0,0.25);
                    border-radius: 5px;
                }
            }
        }
    }
</style>
