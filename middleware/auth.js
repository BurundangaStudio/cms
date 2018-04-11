//
// middleware/authenticated.js

//
// Coded by Christian MacMillan (_@burundanga.studio)
// April 2018 | http://burundanga.studio


export default function ({ store, redirect }) {

    if (!store.state.auth.logged) {
        return redirect("/");
    }
}
