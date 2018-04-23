//
// store/modules/storage.js

//
// Coded by Christian MacMillan (_@burundanga.studio)
// April 2018 | http://burundanga.studio

import * as firebase from "firebase";

export default {
    state: {
        ref: Object,
        uploading: false,
        uploaded: false,
        progress: 0
    },
    mutations: {
        SET_REF(state, ref) {
            state.ref = ref;
        },
        SET_UPLOADING(state) {
            state.uploading = true;
        },
        SET_UPLOADED(state) {
            state.uploaded = true;
        }
    },
    actions: {

        async uploadStorage({ dispatch, commit }, assets) {

            await dispatch("setRef");
            console.log(assets);
        },

        setRef({ dispatch, commit }) {

        }
    }
};
