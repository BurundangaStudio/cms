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
            }

            const _val = snap.val();
            const _exists = !_.isNull(_val);

            const _ref = docRef.ref;
            const _json = docRef.json;

            const _remove = _exists
                ? Object.size(_val) > Object.size(_json)
                : false;

            _exists
                ? console.log(_ref + " already exists!")
                : console.log("Creating " + _ref + "...");

            const fields = {};

            for (let f in _json) {
                if (!_exists) {
                    fields[f] = getInitValueOf(f);
                } else if (_.isUndefined(_val[f])) {
                    fields[f] = getInitValueOf(f);
                }
            }

            if (_remove) {
                for (let f in _val) {
                    if (!_json.hasOwnProperty(f)) fields[f] = null;
                }
            }

            _db
                .ref(_DATABASE + _ref)
                .update(fields)
                .then(() => {
                    let msg = "";
                    msg = _exists
                        ? Object.size(fields) > 0
                            ? "updated succesfully"
                            : "without changes"
                        : "created successfully!";
                    console.log(_ref + " " + msg + "\n");
                    next(i);
                })
                .catch(error => {
                    console.error(error);
                    process.exit();
                });
        })
        .catch(error => {
            console.error(error);
            process.exit();
        });
}

function getInitValueOf() {
    return "";
}

function next(i) {
    if (i < refs.length - 1) {
        i++;
        setRef(i);
    } else {
        _db
            .ref(_DATABASE + "_config")
            .set({
                dataset: true,
                dynamic: [ "albums", "posts" ]
            })
            .then(() => {
                console.log("\n- DATABASE SETTED! \n");
                process.exit();
            });
    }
}

Object.size = function(obj) {
    var size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
