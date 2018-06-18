<template>
    <div class="item">
        {{ order }}
        <field v-for="(field, key) in item.fields" ref="field" :key="key" :name="key" :field="field" :copy="copy" />
        <button @click="$emit('delete-item', index)" v-text="$t('button:delete')"/>
    </div>
</template>

<script>

    import Field from "../Field";

    export default {
        name: "item",
        props: {
            item: Object,
            copy: Object,
            index: Number,
            order: Number
        },
        methods: {
            getValue() {

                this.data = {};

                if (this.$refs.field) {
                    Array.from(this.$refs.field).forEach(field => {
                        this.data[field.name] = field.getValue();
                    })
                }

                return this.data;
            },
            valid() {
                this.error = false
                if (this.$refs.field) {
                    Array.from(this.$refs.field).forEach(field => {
                        if (!field.valid()) this.error = true;
                    })
                }
                return !this.error;
            }
        },
        components: {
            Field
        }
    }
</script>
