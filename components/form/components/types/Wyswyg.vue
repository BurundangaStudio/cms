<!--
    components/form/components/Wyswyg.vue

    Coded by Christian MacMillan (_@burundanga.studio)
    April 2018 | http://burundanga.studio
-->

<template>
    <div class="wyswyg" @click="getValue">
        <div class="editor" />
    </div>
</template>

<script>

export default {
    name: "wyswyg-field",
    props: {
        field: Object
    },
    data() {
        return {
            quill: undefined
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {

            const options = {
                theme: 'snow',
                modules: {
                    toolbar: [
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                        ['bold', 'italic', 'underline' ],
                        ['link']
                    ]
                }
            };
            this.quill = new Quill(this.$el.querySelector(".editor"), options);
            this.quill.clipboard.dangerouslyPasteHTML(0, this.field.value);
        },
        getValue() {

            return this.quill.container.firstChild.innerHTML;
        },
        valid() {

            return true;
        }
    }
}

</script>

