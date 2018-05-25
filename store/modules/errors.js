//
// store/modules/errors.js

//
// Coded by Christian MacMillan (_@burundanga.studio)
// April 2018 | http://burundanga.studio

import _ from "lodash";

export default {
    state: {
        errors: []
    },
    mutations: {

        PUSH(state, error) {
            state.errors.push(_.cloneDeep(error));
        },
        CLEAN(state) {
            state.errors = [];
        }
    },
    actions: {

        pushError({ commit, state }, error) {
            commit("PUSH", error);
        },
        cleanErrors({ commit }) {
            commit("CLEAN");
        }
    }
};
