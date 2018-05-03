//
// plugins/database.js

//
// Coded by Christian MacMillan (_@burundanga.studio)
// April 2018 | http://burundanga.studio

const fs = require("fs");
const _ = require("lodash");
const firebase = require("./firebase.js");
const database = require("firebase/database");

const _db = firebase.database();
const _files = fs.readdirSync("config/database");

const _DATABASE = "web/";

let refs = [];

Array.from(_files).forEach(_file => {
    const _json = require("../config/database/" + _file);
    const _collection = _file.replace(".json", "");
    for (var _doc in _json) {
        const ref = _collection + "/" + _doc;
        const json = ref.includes("_default")
            ? _.cloneDeep(_json[_doc])
            : _.defaults(
                  _.cloneDeep(_json["_default"]),
                  _.cloneDeep(_json[_doc])
              );
        refs.push({ ref, json });
    }
});

setRef(0);

function setRef(i) {
    const docRef = refs[i];
    _db
        .ref(_DATABASE + docRef.ref)
        .once("value")
        .then(snap => {
            if (!snap) {
                console.error("ERROR!");
                process.exit();
            } else if (snap.val()) {
                console.log(docRef.ref + " already exists!");
                next(i);
            } else {
                console.log("Creating " + docRef.ref + "...");
                const fields = {};
                for (let f in docRef.json) fields[f] = "";
                _db
                    .ref(_DATABASE + docRef.ref)
                    .set(fields)
                    .then(() => {
                        console.log(docRef.ref + " created successfully!");
                        next(i);
                    })
                    .catch(error => {
                        console.error(error);
                        process.exit();
                    });
            }
        })
        .catch(error => {
            console.error(error);
        });
}

function next(i) {
    if (i < refs.length - 1) {
        i++;
        setRef(i);
    } else {
        _db
            .ref(_DATABASE + "config/init")
            .set({ dataset: true })
            .then(() => {
                console.log("\n- DATABASE SETTED! \n");
                process.exit();
            });
    }
}
