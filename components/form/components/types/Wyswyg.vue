<!--
    components/form/components/Wyswyg.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <div class="wyswyg">
        <div class="editor"></div>
    </div>
</template>

<script>

export default {
    name: "wyswyg-field",
    data() {
        return {
            quill: undefined
        }
    },
    mounted() {
        this.$nextTick(this.init);
    },
    methods: {
        init() {
            const options = {
                placeholder: 'Compose an epic...',
                theme: 'snow'
            }
            this.quill = new Quill(this.$el.querySelector(".editor"), options);
        },
        getData() {
            return "wyswyg";
        }
    }
}

</script>

