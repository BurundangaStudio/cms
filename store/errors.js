//
// store/modules/errors.js

//
// Coded by Christian MacMillan (_@burundanga.studio)
// April 2018 | http://burundanga.studio

import _ from "lodash";

export const state = () => ({
    errors: []
})

export const mutations = {

    PUSH(state, error) {
        state.errors.push(_.cloneDeep(error));
    },
    CLEAN(state) {
        state.errors = [];
    }
}

export const actions = {

    push({ commit }, error) {
        commit("PUSH", error);
    },
    clean({ commit }) {
        commit("CLEAN");
    }
}
