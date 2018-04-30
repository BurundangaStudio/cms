//
// store/modules/firebase/database.js

//
// Coded by Christian MacMillan (_@burundanga.studio)
// April 2018 | http://burundanga.studio

import _ from "lodash";
import * as firebase from "firebase";
import firestore from "firebase/firestore";

export default {
    state: {
        ref: undefined,
        db: undefined
    },
    mutations: {
        SET_DB_REF(state, ref) {
            state.ref = ref;
        },
        SET_DB_DATA(state, data) {
            state.db = data;
        }
    },
    actions: {

        async initDatabase({ dispatch, state }) {

            if (_.isUndefined(state.ref))
                await dispatch("setRef");

            dispatch("watchDatabase");
        },

        watchDatabase({ state }) {
            console.log(state.ref);
            state.ref.get().then(snap => {
                console.log(snap, snap.exists);
                if (snap && snap.exists) {

                    console.log("EHHH: " +  snap.data().title);
                    commit("SET_DB_DATA", snap.data());
                }
            }).catch(error => {
                console.log(error);
            })
        },

        setRef({ commit }) {

            commit("SET_DB_REF", firebase.firestore().collection("albums").doc("test"));
        }
    }
};
