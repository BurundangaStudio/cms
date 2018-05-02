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

let refs = [];

Array.from(_files).forEach(_file => {
    const _json = require("../config/database/" + _file);
    const _collection = _file.replace(".json", "");
    for (var _doc in _json) {
        const ref = _collection + "/" + _doc;
        refs.push(ref);
    }
});

setRef(0);

function setRef(i) {
    const ref = refs[i];
    _db
        .doc(ref)
        .get()
        .then(snap => {
            console.log(ref + " snapexists: " + snap.exists);
            if (i < refs.length - 1) {
                i++;
                setRef(i);
            } else {
                console.log("\nDATABASE SETTED! \n");
                process.exit();
            }
        });
}
