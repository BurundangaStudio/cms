//
// middleware/i18n.js

//
// Coded by Christian MacMillan (_@burundanga.studio)
// April 2018 | http://burundanga.studio

export default function({ isHMR, app, store, route, params, redirect }) {

    const defaultLocale = app.i18n.fallbackLocale;

    if (isHMR) return;

    const locale = params.lang || defaultLocale;

    store.commit("SET_LANG", locale);

    app.i18n.locale = store.state.lang.locale;

    // if (store.state.lang.locales.indexOf(locale) === -1 || !params.lang) {

    //     let routeParts = route.fullPath.split("/");
    //     let redir = "/";

    //     if (!params.lang) {
    //         console.log("entro")
    //         redir += defaultLocale + route.fullPath
    //     } else {
    //         redir = getSameRouteWithLang(routeParts, defaultLocale);
    //     }
    //     console.log(redir);
    //     // return redirect(redir);
    // }
}

function getSameRouteWithLang(routeParts, lang, noLang = false) {
    if (!noLang) routeParts.splice(0, 2);
    let route = "/" + lang;
    Array.from(routeParts).forEach((routePart, index) => {
        route += ((noLang && index == 0) ? "" : "/") + routePart;
    })
    return route;
}
