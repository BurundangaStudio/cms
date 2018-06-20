//
//  components/types/mixins/LifecycleHooks.js

//  Coded by Christian MacMillan (_@burundanga.studio)
//  Juny 2018 | http://burundanga.studio
//

export default {
    created() {
        this.setInitValue();
    },
    mounted() {
        this.init();
    },
    methods: {
        setInitValue() {},
        init() {},
        destroyListeners() {}
    },
    beforeDestroy() {
        this.destroyListeners();
    }
};