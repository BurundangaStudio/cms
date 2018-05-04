<!--
    components/form/components/Boolean.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <div class="boolean">
        Boolean
    </div>
</template>

<script>

export default {
    name: "boolean-field",
    methods: {
        getValue() {
            return "Boolean";
        },
        valid() {
            return true;
        }
    }
}

</script>

