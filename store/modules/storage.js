//
// store/modules/storage.js

//
// Coded by Christian MacMillan (_@burundanga.studio)
// April 2018 | http://burundanga.studio

import * as firebase from "firebase";

export default {
    state: {
        ref: undefined,
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

        async uploadStorage({ dispatch, commit, state }, data) {

            if (_.isUndefined(state.ref))
                await dispatch("setRef");

            console.log("upload: ", data.assets);
            console.log(" to " + data.path);
        },

        setRef({ commit }) {

            console.log("SET FIREBASE STORAGE REF");
            commit("SET_REF", firebase.storage().ref());
        }
    }
};
