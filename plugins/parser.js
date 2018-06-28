//
// plugins/parser.js

//
// Coded by Christian MacMillan (_@burundanga.studio)
// Juny 2018 | http://burundanga.studio
//

const ARRAY_TYPE = "array";
const FILES_TYPE = "files";
const TYPE_VIDEO = "video";

export default {

    context: {},

    webData: {},
    langData: {},
    storageData: [],

    getDataFrom(upload) {

        this.context = upload.context;

        this.webData = upload.data;

        this.storageData = [];
        this.langData = {};

        this.prepareStorageData();
        this.prepareLangData();
        this.prepareWebData();

        return {
            webData: this.webData,
            langData: this.langData,
            storageData: this.storageData
        };
    },

    prepareStorageData() {

        let path = `images/${this.context.type}/${this.context.id}/`;

        this.webData.forEach(field => {
            if (field.type === FILES_TYPE) {
                this.addFilesOfTo(field.value, path);
            } else if (field.type === ARRAY_TYPE) {
                field.value.forEach(item => {
                    for (let child in item) {
                        if (item[child].type === FILES_TYPE) {
                            this.addFilesOfTo(item[child].value, path);
                        }
                    }
                })
            }
        });
    },

    addFilesOfTo(value, path) {

        value = value.length === undefined ? value : { std: value };

        for (let val in value) {
            value[val].forEach(asset => {
                if (asset.type === TYPE_VIDEO) return;
                asset.files.forEach((file, index) => {
                    let existingFile = this.fileExists(file.data_url);
                    if (!existingFile) {
                        this.storageData.push({
                            path: path + file.name,
                            file: file.data_url
                        })
                    }
                    asset.files[index] = existingFile ? existingFile : path + file.name;
                })
            })
        }
    },

    fileExists(file) {

        let exists = false;

        this.storageData.forEach(item => {
            if (item.file === file) {
                exists = item.path;
            }
        });
        return exists;
    },

    prepareLangData() {

        this.webData.forEach(field => {
            if (field.type === ARRAY_TYPE) {
                let order = 0;
                field.value.forEach(item => {
                    order++;
                    for (let child in item) {
                        this.readLangOf(item[child], `${field.key}:${order}:${child}`);
                    }
                })
            } else this.readLangOf(field);
        });
    },

    readLangOf(field, child = false) {

        if (field.lang) {
            let key = `_lang:${this.context.type}:${this.context.id}:${(child ? child : field.key)}`;
            for (let lang in field.value) {
                if (!this.langData[lang]) this.langData[lang] = {};
                this.langData[lang][key] = field.value[lang];
            }
            field.value = key;
        }
    },

    prepareWebData() {

        let data = {};

        this.webData.forEach(field => {
            if (field.type === ARRAY_TYPE) {
                data[field.key] = [];
                field.value.forEach(children => {
                    for (let child in children) {
                        children[child] = children[child].value;
                    }
                    data[field.key].push(children);
                })
            } else data[field.key] = field.value;
        });
        this.webData = data;
    }
}
