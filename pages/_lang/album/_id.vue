<!--
    pages/album/_id.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <section>
        <no-ssr>
            <formm ref="form" :fields="getFields()"></formm>
        </no-ssr>
        <button @click="save" v-text="$t('button:save')"/>
    </section>
</template>

<script>

import _ from "lodash";

import Formm from "~/components/form/Form";
import { StorageFields } from "~/config/form/rules";
import Structure from "~/config/content/albums.json";


export default {
    name: "album",
    layout: "logged",
    data () {
        return {
            Structure
        }
    },
    methods: {
        getFields() {

            const aux = JSON.parse(JSON.stringify(this.Structure))
            return this.$route.params.id
                   ? _.defaults(aux.default, aux[this.$route.params.id])
                   : aux.default;
        },
        async save() {

            const formData = this.$refs.form.getValue();

           if (formData) {

                const storageData = this.getStorageDataOf(formData);

                // await this.$store.dispatch("uploadStorage", storageData);
            }

        },
        getStorageDataOf(formData) {
            const storageData = {};
            console.log(formData);
            // storageData.path = "albums/" + this.link.
            // Array.from(formData).forEach(field => {
            //     if (StorageFields.includes(field.key)) storageData.push(field);
            // })
            return storageData;
        }
    },
    components: {
        Formm
    }
}

</script>
