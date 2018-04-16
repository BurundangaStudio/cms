<!--
    components/form/components/Field.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <div class="field">
        <p>{{ name }} : {{ field }}</p>
    </div>
</template>

<script>

export default {
    name: "field",
    props: {
        name: String,
        field: Object
    },
    mounted() {
        console.log("Field");
    }
}

</script>

