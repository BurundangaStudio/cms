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
                .ref("web/config/init")
                .get()
                .then(snap => {
                    const dataset =
                        snap && snap.exists ? snap.data().dataset : false;
                    if (!dataset)
                        console.error(
                            "MISSING DATABASE: RUN 'npm run set-database'"
                        );
                });
        },

        setDatabaseRef({ commit }) {

            commit("SET_DB_REF", firebase.database());
        }
    }
};
