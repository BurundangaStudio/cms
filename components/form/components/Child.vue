<template>
    <div class="child">
        <field v-for="(field, key) in child" ref="field" :key="key" :name="key" :field="field" />
    </div>
</template>

<script>

    import Field from "./Field";

    export default {
        props: {
            child: Object
        },
        methods: {
            getValue() {

                this.data = {};
                this.error = false;

                if (this.$refs.field) {
                    Array.from(this.$refs.field).forEach(field => {
                        if (!field.valid()) this.error = true;
                        else this.data[field.name] = field.getValue();
                    })
                }

                if (this.error) return false;

                return this.data;
            },
            valid() {
                return true;
            }
        },
        components: {
            Field
        }
    }
</script>

<style lang="scss" scoped>

</style>
