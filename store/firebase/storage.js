//
// store/modules/firebase/storage.js

//
// Coded by Christian MacMillan (_@burundanga.studio)
// April 2018 | http://burundanga.studio

import _ from "lodash";
import * as firebase from "firebase";

export const state = () => ({
    ref: undefined,
        files: undefined,
        uploading: false,
        uploaded: false,
        path: undefined,
        progress: 0,
        filesUploaded: 0,
        totalFiles: 0,
});
export const getters = {};
export const mutations = {
    SET_REF(state, ref) {
        state.ref = ref;
    },
    SET_UPLOAD_DATA(state, data) {
        state.path = data.path;
        state.files = data.files;
        state.totalFiles = data.files.length
        state.filesUploaded = 0;
        state.uploading = true;
    },
    SET_UPLOADED(state) {
        state.uploaded = true;
        state.uploading = false;
    },
    INCREMENT_FILES_UPLOADED(state) {
        state.filesUploaded++;
    }
};
export const actions = {

    async uploadStorage({ dispatch, commit, state }, data) {

        if (_.isUndefined(state.ref))
            await dispatch("setRef");

        commit("SET_UPLOAD_DATA", data);
        dispatch("uploadFile");
    },

    uploadFile({ commit, dispatch, state }) {

        const file = state.files[state.filesUploaded].file;
        const path = "images/" + state.path + "/" + file.name;
        const uploadTask = state.ref.child(path).putString(file.data_url, "data_url");
        uploadTask.on("state_changed", snapshot => {

            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload " + (state.filesUploaded + 1) + "/" + state.totalFiles + " is " + progress + "% done");
        }, error => {

            console.log("ERROR: " + error.code);
        }, () => {

            var downloadURL = uploadTask.snapshot.downloadURL;
            console.log("COMPLETED WITH URL: " + downloadURL);

            if (state.filesUploaded != state.totalFiles - 1) {
                commit("INCREMENT_FILES_UPLOADED");
                dispatch("uploadFile");
            }
        });
    },

    setRef({ commit }) {

        commit("SET_REF", firebase.storage().ref());
    }
};
