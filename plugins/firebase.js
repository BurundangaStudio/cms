//
// plugins/firebase.js

//
// Coded by Christian MacMillan (_@burundanga.studio)
// April 2018 | http://burundanga.studio

const firebase = require("firebase");
const config = require("../config/firebase/config.js");

module.exports = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
