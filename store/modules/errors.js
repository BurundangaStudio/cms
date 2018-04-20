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

        push(state, error) {
            state.errors.push(_.cloneDeep(error));
        },
        clean(state) {
            state.errors = [];
        }
    },
    actions: {

        pushError({ commit }, error) {
            commit("push", error);
        },
        cleanErrors({ commit }) {
            commit("clean");
        }
    }
};
