//
// store/modules/firebase/database.js

//
// Coded by Christian MacMillan (_@burundanga.studio)
// April 2018 | http://burundanga.studio

import _ from "lodash";
import firebase from "~/plugins/firebase";
import database from "firebase/database";

export default {
    state: {
        ref: undefined,
        data: Array
    },
    mutations: {
        SET_DB_REF(state, ref) {
            state.ref = ref;
        },
        SET_DB_DATA(state, data) {
            state.data = data;
        }
    },
    actions: {

        async initDatabase({ dispatch, commit, state }) {

            if (_.isUndefined(state.ref)) await dispatch("setDatabaseRef");

            state.ref
                .ref("admin/_config")
                .once("value")
                .then(snap => {
                    if (_.isNull(snap.val())) {
                        console.error("DATABASE NOT SETTED! run 'npm run init-database'");
                    }
                });
        },

        setDatabaseRef({ commit }) {

            commit("SET_DB_REF", firebase.database());
        }
    }
};
