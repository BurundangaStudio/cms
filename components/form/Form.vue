<!--
    components/form/Form.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <div class="form">
        <p>Form</p>
    </div>
</template>

<script>

export default {
    name: "form-component",
    props: {
        fields: Object
    },
    mounted() {
        console.log("Form with fields: ", this.fields);
    }
}

</script>

