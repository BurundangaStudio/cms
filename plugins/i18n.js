//
// plugins/i18n.js

//
// Coded by Christian MacMillan (_@burundanga.studio)
// April 2018 | http://burundanga.studio

import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Config from "~/config/index";

Vue.use(VueI18n);

export default ({ app, store }) => {

  app.i18n = new VueI18n({
    locale: store.state.lang.locale,
    fallbackLocale: Config.entryLang,
    messages: {
      'en': require('~/copy/en.json'),
      'es': require('~/copy/es.json')
    }
  })

  app.i18n.path = (link) => {
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`
    }

    return `/${app.i18n.locale}/${link}`
  }
}
