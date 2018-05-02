//
// plugins/database.js

//
// Coded by Christian MacMillan (_@burundanga.studio)
// April 2018 | http://burundanga.studio

const fs = require("fs");
const _ = require("lodash");
const firebase = require("./firebase.js");
const firestore = require("firebase/firestore");

const _db = firebase.firestore();
const _files = fs.readdirSync("config/database");

Array.from(_files).forEach(_file => {
    const _json = require("../config/database/" + _file);
    const _collection = _file.replace(".json", "");
    for (var _doc in _json) {
        const ref = _collection + "/" + _doc;
        const _docRef = _db
            .doc(ref)
            .get()
            .then(snap => {
                console.log(ref + " exists: " + snap.exists);
            });
    }
});
