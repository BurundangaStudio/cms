// getStorageDataFrom(data) {

//     let files = [];
//     let dataFiles = [];
//     let path = "images/" + this.type + "/" + data.id;

//     Array.from(data.files).forEach(file => {
//         if (file.type === "video") return;
//         if (!file.files) {
//             console.log
//             if (!this.dataContainsItem(files, file.file)) files.push(file.file);
//         } else {
//             Array.from(file.files).forEach(file => {
//                 if (!this.dataContainsItem(files, file)) files.push(file);
//             });
//         }
//     });

//     return { path, files, dataFiles };
// },

// dataContainsItem(data, item) {
//     let exists = false;
//     Array.from(data).forEach((el, index) => {
//         if (el.data_url === item.data_url) exists = true;
//     })
//     return exists;
// },

// generateRandomNameFrom(file) {
//     let nameParts = file.name.split(".");
//     let format = nameParts[nameParts.length - 1];
//     let fileName = Math.random().toString(36).substr(2, 5) + file.size +  "." + format;
// },
