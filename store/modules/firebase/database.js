//
// store/modules/firebase/database.js

//
// Coded by Christian MacMillan (_@burundanga.studio)
// April 2018 | http://burundanga.studio

import _ from "lodash";
import firebase from "~/plugins/firebase";
import Parser from "~/plugins/parser";
import Config from "~/config/index";

export default {
    state: {
        db: undefined,
        menu: []
    },
    mutations: {
        SET_DB(state, db) {
            state.db = db;
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

            if (_.isUndefined(state.ref)) await dispatch("setDatabase");

            state.db
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

        parseData({ dispatch, commit }, upload) {

            let id = upload.context.create ? Date.now() : upload.context.id;
            upload.context.id = id;

            Parser.getDataFrom(upload);

            // let storageData = Parser.getStorageDataFromWithContext(upload.data, upload.context);
            // let langData = {};
            // let webData = {};

            // let uploadData = Parser.getUploadData();

            // console.log(storageData);
        },

        async updateItem({ state }, data) {

            delete data.data.id;

            state.db
                .ref("web/" + data.type + "/" + data.id).set(data.data)
                .then(res => {
                    if (data.create) this.$router.push({ name: "lang-item-id", params: { item: data.type, id: data.id }});
                }).catch(error => {
                    console.log(error)
                });
        },

        setDatabase({ commit }) {

            commit("SET_DB", firebase.database());
        }
    }
};
