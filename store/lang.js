//
// store/modules/lang.js

//
// Coded by Christian MacMillan (_@burundanga.studio)
// April 2018 | http://burundanga.studio

export const state = () => ({
    locales: ["en", "es"],
    locale: "en",
    formLang: ""
});

export const mutations = {

    SET_LANG(state, locale) {
        if (state.locales.indexOf(locale) !== -1) {
            state.locale = locale;
        }
    },
    SET_FORM_LANG(state, lang) {
        state.formLang = lang;
    }
};

export const actions = {

    setLang({ commit }, lang) {
        commit("SET_LANG", lang);
    },
    setFormLang({ commit }, lang) {
        commit("SET_FORM_LANG", lang);
    }
};
