//
// store/modules/firebase/auth.js

//
// Coded by Christian MacMillan (_@burundanga.studio)
// April 2018 | http://burundanga.studio

import * as firebase from "firebase";

export default {
    state: {
        user: undefined,
        logged: undefined
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user;
            state.logged = user ? true : false;
        }
    },
    actions: {
        setUser({ commit }, user) {
            commit("SET_USER", user);
        },

        async login({}, data) {
            await firebase
                .auth()
                .signInWithEmailAndPassword(data.email, data.password);
        },

        async logout() {
            await firebase.auth().signOut();
        },

        authState({ dispatch }) {
            firebase.auth().onAuthStateChanged(user => {

                dispatch("setUser", user ? user : undefined);

                if (user) {
                    firebase
                        .auth()
                        .currentUser.getIdToken(true)
                        .then(idToken => {
                            document.cookie =
                                "__session=" + idToken + ";max-age=3600;path=/";
                        });
                } else {
                    document.cookie = "__session=0;max-age=0;path=/";
                }
            });
        }
    }
};
