//
// store/index.js

//
// Coded by Christian MacMillan (_@burundanga.studio)
// April 2018 | http://burundanga.studio

import Vuex from "vuex";

import authModule from "./modules/firebase/auth";
import databaseModule from "./modules/firebase/database"
import storageModule from "./modules/firebase/storage";
import errorsModule from "./modules/errors";
import langModule from "./modules/lang";

const Store = () => {
    return new Vuex.Store({
        modules: {
            auth: authModule,
            database: databaseModule,
            storage: storageModule,
            errors: errorsModule,
            lang: langModule
        },
        actions: {

            nuxtServerInit({ dispatch }, { req }) {

                dispatch("setUser", req.user);
            },

            init({ dispatch }) {

                dispatch("authState");
                dispatch("initDatabase");
            }
        }
    });
};

export default Store;
