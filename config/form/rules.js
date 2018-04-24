//
// config/form/rules.js

//
// Coded by Christian MacMillan (_@burundanga.studio)
// April 2018 | http://burundanga.studio


export default {
    required: false
}


export const FilesRules = {
    limit: undefined,
    backEnabled: false,
    videoEnabled: false,
    format: [ "png", "jpg", "svg", "gif", "mp4", "ogg", "webm", "ogv", "pdf" ],
    maxSize: 2000
}

export const StorageFields = [
    "files"
]
