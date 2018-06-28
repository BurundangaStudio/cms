//
//  components/types/mixins/ErrorHandler.js

//  Coded by Christian MacMillan (_@burundanga.studio)
//  Juny 2018 | http://burundanga.studio
//

export default {
    data() {
        return {
            error: {},
            errorFrames: []
        }
    },
    methods: {
        clean() {
            this.errorFrames.forEach(frame => {
                frame.classList.remove("error")
            });
        },
        dispatchError() {
            this.errorFrames.forEach(frame => {
                frame.classList.add("error")
            });
            this.$store.dispatch("errors/push", this.error);
        }
    }
};
