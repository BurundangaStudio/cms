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
        setRef(state, ref) {
            state.ref = ref;
        },
        setUploading(state) {
            state.uploading = true;
        },
        setUploaded(state) {
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
