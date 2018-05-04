//
// plugins/database.js

//
// Coded by Christian MacMillan (_@burundanga.studio)
// April 2018 | http://burundanga.studio

const fs = require("fs");
const _ = require("lodash");
const firebase = require("./firebase.js");
const database = require("firebase/database");

const _DB = firebase.database();
const _FILES = fs.readdirSync("config/database");

const _ADMIN = "admin/";
const _WEB = "web/";
let _UPDATE = false;

let ref = "";
let refs = [];
let json = "";
let i = 0;

process.argv.forEach((val, index) => {
    _UPDATE = index == 2;
});

Array.from(_FILES).forEach(_file => {
    const _json = require("../config/database/" + _file);
    const _collection = _file.replace(".json", "");
    for (var _doc in _json) {
        const ref = _collection + "/" + _doc;
        const json =
            adminRef(ref)
                ? _.cloneDeep(_json[_doc])
                : _.defaults(
                      _.cloneDeep(_json["_default"]),
                      _.cloneDeep(_json[_doc])
                  );
        refs.push({ ref, json });
    }
});

function setRef() {

    ref = refs[i].ref;
    json = refs[i].json;

    const adminFields = {};
    const webFields = {};

    for (let f in json) {
        adminFields[f] = json[f];
        webFields[f] = "";
    }

    _DB.ref(_ADMIN + ref).set(adminFields).then(() => {
        !adminRef(ref) && !_UPDATE
            ? _DB.ref(_WEB + ref).set(webFields).then(next).catch(error)
            : next();
    }).catch(error);
}

function adminRef(ref) {
    return ref.includes("_config") || ref.includes("_default");
}

function next() {
    console.log(ref + (_UPDATE ? " updated" : " created") +  " successfully!");
    if (i < refs.length - 1) {
        i++;
        setRef();
    } else {
        _DB.ref(_ADMIN + "_config").set({ dataset: true }).then(() => {
            console.log("\n- DATABASE SETTED! \n");
            process.exit();
        }).catch(error);
    }
}

function error(error) {
    console.error(error);
    process.exit();
}

setRef();
