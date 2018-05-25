<!--
    components/form/components/Array.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <div class="array">
        <div class="child" v-for="(child, key) in children" :key="key">
            <div ref="field" v-for="(field, key) in field.children" :key="key">
                {{ field }}
                <!-- <field :name="key" :field="field" /> -->
            </div>
        </div>
        <button class="button" v-text="$t('button:add:item')" :aria-label="$t('button:add:item')" @click="addItem"/>
    </div>
</template>

<script>

import Field from "~/components/form/components/Field";

export default {
    name: "array-field",
    data() {
        return {
            data: [],
            error: false,
            children: []
        }
    },
    props: {
        name: String,
        field: Object
    },
    created() {
        this.setData();
    },
    methods: {
        setData() {
            let children = []
            Array.from(this.field.value).forEach(value => {
                let credit = { ...this.field.children };
                for (let field in credit) {
                    credit[field].value = value[field];
                }
                children.push(credit);
            })
            this.children = { ...children };
        },
        getValue() {

            // this.data = [];
            // this.error = false;

            // if (this.$refs.field) {
            //     Array.from(this.$refs.field).forEach(field => {
            //         if (!field.valid()) this.error = true;
            //         else this.data[field.name] = field.getValue();
            //     })
            // }

            // if (this.error) return false;

            // this.$store.dispatch("cleanErrors");
            return "ARRAY";
        },
        valid() {
            return true;
        },
        addItem() {
            this.children.push(this.field.children);
            console.log(this.children);
        }
    },
    components: {
        Field
    }
}

</script>

<style lang="scss" scoped>
    .array {
        @include inputBorder();
        .item {
            width: 20%;
            @include inputBorder();
        }
    }
</style>
