//
// middleware/i18n.js

//
// Coded by Christian MacMillan (_@burundanga.studio)
// April 2018 | http://burundanga.studio

export default function({ isHMR, app, store, route, params, redirect }) {
    const defaultLocale = app.i18n.fallbackLocale;

    if (isHMR) return;

    const locale = params.lang || defaultLocale;

    store.dispatch("lang/setLang", locale);

    app.i18n.locale = store.state.lang.locale;

    if (store.state.lang.locales.indexOf(locale) === -1 || !params.lang) {

        let routeParts = cleanArrayOf(route.fullPath.split("/"));
        let redir = "/";

        if (params.lang) routeParts.splice(0, 1);

        redir += defaultLocale;
        routeParts.forEach(part => {
            redir += "/" + part;
        });

        return redirect(redir);
    }
}

function cleanArrayOf(array) {
    const newArray = [];
    array.forEach(part => {
        if (part != "") newArray.push(part);
    });
    return newArray;
}
