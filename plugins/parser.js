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
    copyData: {},
    storageData: [],

    getDataFrom(upload) {

        this.context = upload.context;

        this.webData = upload.data;

        this.storageData = [];
        this.copyData = {};

        this.prepareStorageData();
        this.prepareCopyData();
        this.prepareWebData();

        console.log(this.webData);
        console.log(this.copyData);
        console.log(this.storageData);

        return {};
    },

    prepareStorageData() {

        let path = "images/" + this.context.type + "/" + this.context.id + "/";

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

        value.forEach(asset => {
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

    prepareCopyData() {

        this.webData.forEach(field => {
            if (field.type === ARRAY_TYPE) {
                field.value.forEach(item => {
                    for (let child in item) {
                        this.readCopyOf(item[child], field.key + ":" + child);
                    }
                })
            } else this.readCopyOf(field);
        });
    },

    readCopyOf(field, child = false) {

        if (field.lang) {
            let key = this.context.type + ":" + this.context.id + ":" + (child ? child : field.key);
            for (let lang in field.value) {
                if (!this.copyData[lang]) this.copyData[lang] = {};
                this.copyData[lang][key] = field.value[lang];
            }
            field.value = key;
        }
    },

    prepareWebData() {
        let data = {};

        this.webData.forEach(field => {
            if (field.type === ARRAY_TYPE) {
                data[field.key] = [];
                // console.log(field);
            } else data[field.key] = field.value;
        });

        this.webData = data;
    }
}
