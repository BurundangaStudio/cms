//
// store/index.js

//
// Coded by Christian MacMillan (_@burundanga.studio)
// April 2018 | http://burundanga.studio

export const actions = {

    async nuxtServerInit({ dispatch }, { req }) {

        await dispatch("firebase/auth/setUser", req.user);
    },

    init({ dispatch }) {

        dispatch("firebase/database/init");
        dispatch("firebase/auth/onStateChanged");
    }
}
