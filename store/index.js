//
// store/index.js

//
// Coded by Christian MacMillan (_@burundanga.studio)
// April 2018 | http://burundanga.studio

import Vuex from "vuex";

import authModule from "./modules/auth";

const Store = () => {
    return new Vuex.Store({
        modules: {
            auth: authModule
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
