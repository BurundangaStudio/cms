<!--
    components/form/components/Pass.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <div class="pass">
        Pass
    </div>
</template>

<script>

export default {
    name: "pass-field",
    methods: {
        getValue() {
            return "Pass";
        },
        valid() {
            return true;
        }
    }
}

</script>

