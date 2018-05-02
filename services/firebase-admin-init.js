//
// services/firebase-admin-init.js

//
// Coded by Christian MacMillan (_@burundanga.studio)
// April 2018 | http://burundanga.studio
//
// Partial credits David Roger :: https://github.com/davidroyer

const admin = require('firebase-admin');
const key = require("../config/firebase/service-account.json");

module.exports = admin.initializeApp({
    credential: admin.credential.cert(key),
    databaseURL: `https://${key.project_id}.firebaseio.com`
});
