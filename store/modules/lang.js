//
// store/modules/lang.js

//
// Coded by Christian MacMillan (_@burundanga.studio)
// April 2018 | http://burundanga.studio

export default {
    state: {
        locales: ["en", "es"],
        locale: "en",
        editLang: ""
    },
    mutations: {
        SET_LANG(state, locale) {
            if (state.locales.indexOf(locale) !== -1) {
                state.locale = locale;
            }
        },
        SET_EDIT_LANG(state, lang) {
            state.editLang = lang;
        }
    },
    actions: {
        setEditLang({ commit }, lang) {
            commit("SET_EDIT_LANG", lang);
        }
    }
};
