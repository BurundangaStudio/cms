//
// store/modules/firebase/storage.js

//
// Coded by Christian MacMillan (_@burundanga.studio)
// April 2018 | http://burundanga.studio

import _ from "lodash";
import * as firebase from "firebase";

export default {
    state: {
        ref: undefined,
        files: undefined,
        uploading: false,
        uploaded: false,
        path: undefined,
        progress: 0,
        filesUploaded: 0,
        totalFiles: 0,
    },
    mutations: {
        SET_REF(state, ref) {
            state.ref = ref;
        },
        SET_UPLOAD_DATA(state, files) {
            state.files = files;
            state.totalFiles = Object.keys(files).length
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
    },
    actions: {

        async updateStorageData({ dispatch, commit, state }, files) {

            if (_.isUndefined(state.ref))
                await dispatch("setRef");

            commit("SET_UPLOAD_DATA", files);
            dispatch("uploadFile");
        },

        uploadFile({ commit, dispatch, state }) {

            const file = state.files[state.filesUploaded].file;
            const path = state.files[state.filesUploaded].path;

            const uploadTask = state.ref.child(path).putString(file, "data_url");

            uploadTask.on("state_changed", snapshot => {

                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload ${(state.filesUploaded + 1)}/${state.totalFiles} is ${progress} % done`);
            }, error => {

                console.log(`ERROR: ${error.code}`);
            }, () => {

                var downloadURL = uploadTask.snapshot.downloadURL;
                console.log(`COMPLETED WITH URL: ${downloadURL}`);

                if (state.filesUploaded != state.totalFiles - 1) {
                    commit("INCREMENT_FILES_UPLOADED");
                    dispatch("uploadFile");
                } else {
                    commit("SET_UPLOADED");
                }
            });
        },

        setRef({ commit }) {

            commit("SET_REF", firebase.storage().ref());
        }
    }
};
