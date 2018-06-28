//
// plugins/database.js

//
// Coded by Christian MacMillan (_@burundanga.studio)
// April 2018 | http://burundanga.studio

const fs = require("fs");
const _ = require("lodash");
const firebase = require("./firebase.js");

const Config = require("../config/index");
const langs = Config.webLangs;

const langsInit = {};
langs.forEach(lang => {
    langsInit[lang] = { init: "true" };
})

const _DB = firebase.database();
const _FILES = fs.readdirSync("config/database");

const _ADMIN = "admin/";
const _WEB = "web/";
const _LANG = "lang/";
let _UPDATE = false;

let ref = "";
let refs = [];
let json = "";
let i = 0;

process.argv.forEach((val, index) => {
    _UPDATE = index == 2;
});

_FILES.forEach(_file => {
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

    let order = 1;

    for (let f in json) {
        if (f !== "modular") json[f].order = order;
        order++;
        if (json[f].type === "array") {
            let childOrder = 1;
            for (let c in json[f].children) {
                json[f].children[c].order = childOrder;
                c.order = childOrder;
                childOrder++;
            }
        }
        adminFields[f] = json[f];
        webFields[f] = "";
    }

    _DB.ref(_ADMIN + ref).set(adminFields).then(() => {
        !adminRef(ref) && !_UPDATE
            ? _DB.ref(_WEB + ref).set(webFields).then(next).catch(error)
            : next();
    }).catch(error);
}

function setLangs() {
    _DB.ref(_LANG).once("value").then(snap => {
        if (snap.val()) {
            console.log(snap.val());
        } else {
            _DB.ref(_LANG).set(langsInit).then(end).catch(error);
        }
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
        _DB.ref(_ADMIN + "_config").set({ dataset: true }).then(setLangs).catch(error);
    }
}

function end() {
    console.log("\n- DATABASE SETTED! \n");
    process.exit();
}

function error(error) {
    console.error(error);
    process.exit();
}

setRef();
