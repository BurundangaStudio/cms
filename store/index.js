//
// store/index.js

//
// Coded by Christian MacMillan (_@burundanga.studio)
// April 2018 | http://burundanga.studio

import Vuex from "vuex";

import authModule from "./modules/auth";
import storageModule from "./modules/storage";
import errorsModule from "./modules/errors"

const Store = () => {
    return new Vuex.Store({
        modules: {
            auth: authModule,
            storage: storageModule,
            errors: errorsModule
        },
        actions: {

            nuxtServerInit({ dispatch }, { req }) {
                dispatch("setUser", req.user);
            },

            init({ dispatch }) {
                dispatch("authState");
            }
        }
    });
};

export default Store;
