//
// plugins/parser.js

//
// Coded by Christian MacMillan (_@burundanga.studio)
// Juny 2018 | http://burundanga.studio
//


// TODO! FRONT/BACK PHOTOS

const ARRAY_TYPE = "array";
const FILES_TYPE = "files";

export default {

    context: {},

    webData: {},
    copyData: {},
    storageData: [],

    getDataFrom(upload) {

        this.context = upload.context;

        this.webData = upload.data;
        this.storageData = [];
        this.prepareStorageData();
        this.prepareCopyData();

        console.log(this.webData, this.storageData);

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

        // let path = "images/" + this.context.type + "/" + this.context.id + "/";

        // this.webData.forEach(field => {
        //     if (field.type === FILES_TYPE) {
        //         this.addFilesOfTo(field.value, path);
        //     } else if (field.type === ARRAY_TYPE) {
        //         field.value.forEach(item => {
        //             for (let child in item) {
        //                 if (item[child].type === FILES_TYPE) {
        //                     this.addFilesOfTo(item[child].value, path);
        //                 }
        //             }
        //         })
        //     }
        // });
    },
}
