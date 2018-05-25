//
// store/modules/firebase/database.js

//
// Coded by Christian MacMillan (_@burundanga.studio)
// April 2018 | http://burundanga.studio

import _ from "lodash";
import firebase from "~/plugins/firebase";
import database from "firebase/database";
import Config from "~/config/index"

export default {
    state: {
        ref: undefined,
        menu: []
    },
    mutations: {
        SET_DB_REF(state, ref) {
            state.ref = ref;
        },
        SET_MENU(state, menu) {
            const aux = [ Config.entryPoint ];
            for (let key in menu) {
                if (key != "_config") aux.push(key);
            }
            state.menu = aux;
        }
    },
    actions: {

        async initDatabase({ dispatch, commit, state }) {

            if (_.isUndefined(state.ref)) await dispatch("setDatabaseRef");

            state.ref
                .ref("admin")
                .once("value")
                .then(snap => {
                    if (_.isNull(snap.val())) {
                        console.error("DATABASE NOT SETTED! run 'npm run init-database'");
                    } else {
                        commit("SET_MENU", snap.val());
                    }
                });
        },

        async updateItem({ commit }, data) {

            delete data.data.id;

            console.log("update", data);
        },

        setDatabaseRef({ commit }) {

            commit("SET_DB_REF", firebase.database());
        }
    }
};
