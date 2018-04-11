<!--
    pages/index.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <section class="page login">
        <div class="grid">
            <div class="centered">
                <h1 class="title">Login form</h1>
                <input type="text" name="email" id="email" placeholder="Enter your email" value="_@burundanga.studio">
                <input type="text" name="password" id="password" placeholder="Enter your password" value="Burundanga.1">
                <button class="button" @click="login">Login</button>
            </div>
        </div>
    </section>
</template>

<script>

    import { TweenMax } from "gsap"
    import { setTimeout } from 'timers';

    export default {
        name: "index",
        head: {
            title: "Test | Admin login"
        },
        transition: {
            enter(el, done) {
                TweenMax.to(el, 1, { opacity: 1 })
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

                await this.$store.dispatch('login', { email, password });
                this.$router.push("/panel");
            }
        }
    }

</script>

<style lang="scss" scoped>
    .login {
        opacity: 0;
        will-change: opacity;
        .grid {
            display: grid;

            grid-template-columns: 1fr;
            grid-template-rows: 1fr;

            .centered {
                grid-column: 1;
                grid-row: 1;
                -ms-grid-column: 1;
                -ms-grid-row: 1;
            }
        }
    }
</style>
