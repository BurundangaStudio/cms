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
import Structure from "~/config/database/albums.json";


export default {
    name: "album",
    layout: "logged",
    data () {
        return {
            Structure,
            mode: undefined
        }
    },
    methods: {
        getFields() {

            // const aux = JSON.parse(JSON.stringify(this.Structure));
            // return this.$route.params.id
            //        ? _.defaults(aux.default, aux[this.$route.params.id])
            //        : aux.default;
        },
        async save() {

            const formData = this.$refs.form.getValue();

           if (formData) {

                const storageData = this.getStorageDataOf(formData);
                await this.$store.dispatch("uploadStorage", storageData);
            }

        },
        getStorageDataOf(formData) {

            const storageData = {};
            storageData.path = "albums/" + formData.link
            storageData.files = [];
            Array.from(formData.files).forEach(data => {
                if (data.type == "default") storageData.files.push(data.file);
                if (data.type == "after/before") {
                    Array.from(data.files).forEach(file => {
                        storageData.files.push(file);
                    });
                }
            });
            return storageData;
        }
    },
    components: {
        Formm
    }
}

</script>
