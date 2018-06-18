//
// nuxt.config.js

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
        script: [
            { src: "https://cdn.quilljs.com/1.3.6/quill.js" }
        ],
        link: [
            { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
            {
                rel: "stylesheet",
                href: "https://cdn.quilljs.com/1.3.6/quill.snow.css"
            }
        ]
    },

    router: {
        middleware: 'i18n'
    },

    loading: {
        color: 'black'
    },

    transition: require("./local_modules/transitions/default.js"),

    modules: ["nuxt-sass-resources-loader"],

    sassResources: ["@/assets/css/main.scss"],

    plugins: [
        { src: "~/plugins/sortable.js", ssr: false },
        { src: "~/plugins/firebase.js", ssr: false },
        { src: "~/plugins/init.js", ssr: false },
        { src: "~/plugins/i18n.js", ssr: true }
    ],

    serverMiddleware: ["~/serverMiddleware/auth-cookie.js"],

    build: {
        vendor: ["lodash", "isomorphic-fetch"],
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
