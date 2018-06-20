//
// plugins/parser.js

//
// Coded by Christian MacMillan (_@burundanga.studio)
// Juny 2018 | http://burundanga.studio
//


// TODO! CLEAN, FRONT/BACK PHOTOS, REPLACE PER LINKS
export default {
    getStorageDataFromWithContext(data, context) {
        let storageData = [];
        let path = "images/" + context.type + "/" + context.id + "/";
        data.forEach(field => {
            if (field.type === "files") {
                field.value.forEach(asset => {
                    if (asset.type === "default") {
                        if (!this.fileExistsIn(asset.file.data_url, storageData)) {
                            storageData.push({
                                path: path + asset.file.name,
                                file: asset.file.data_url 
                            });
                        } 
                    }
                })
            }
            if (field.type === "array") {
                field.value.forEach(item => {
                    for (let child in item) {
                        if (item[child].type === "files") {
                            item[child].value.forEach(asset => {
                                if (asset.type === "default") {
                                    if (!this.fileExistsIn(asset.file.data_url, storageData)) {
                                        storageData.push({
                                            path: path + asset.file.name,
                                            file: asset.file.data_url 
                                        });
                                    } 
                                }
                            })
                        }
                    }
                })
            }
        });
        return storageData;
    },

    fileExistsIn(file, group) {
        let exists = false;
        group.forEach(item => {
            if (item.file === file) exists = true;
        })
        return exists;
    }
}