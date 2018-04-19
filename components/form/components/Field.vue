<!--
    components/form/components/Field.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <div class="field">
        {{ name }}
        <component ref="field" :is="field.type + '-field'" />
    </div>
</template>

<script>

import AreaField from "./types/Area"
import ImageField from "./types/Image"
import ImagesField from "./types/Images"
import PassField from "./types/Pass"
import TextField from "./types/Text"
import WyswygField from "./types/Wyswyg"

export default {
    name: "field",
    props: {
        name: String,
        field: Object
    },
    mounted() {
        console.log(this.field.type);
    },
    components: {
        AreaField,
        ImageField,
        ImagesField,
        PassField,
        TextField,
        WyswygField
    }
}

</script>

<style lang="scss" scoped>

.field {
    padding: 10px 0px;
}

</style>
