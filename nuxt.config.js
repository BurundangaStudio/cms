//
// nuxt.config.js
//

//
// Coded by Christian MacMillan (_@burundanga.studio)
// April 2018 | http://burundanga.studio

module.exports = {
    head: {
        title: "Burundanga Studio CMS",
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1"
            },
            {
                hid: "BurundangaStudioCMS",
                name: "Burundanga Studio CMS",
                content: "Burundanga Studio CMS for websites."
            }
        ],
        link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
    },

    loading: false,

    transition: require("./local_modules/transitions/default.js"),

    css: ["@/assets/css/main.scss"],

    plugins: [
        { src: "~/plugins/firebase.js", ssr: false },
        { src: "~/plugins/init.js", ssr: false }
    ],

    serverMiddleware: [ "~/serverMiddleware/auth-cookie.js" ],

    build: {
        extend(config, { isDev, isClient }) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: "pre",
                    test: /\.(js|vue)$/,
                    loader: "eslint-loader",
                    exclude: /(node_modules)/
                });
            }
        }
    }
};
