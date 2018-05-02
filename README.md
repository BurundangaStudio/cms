# CMS

Code for Burundanga.Studio custom CMS template.

## Tech Overview
- [NUXT.js](https://nuxtjs.org//) : Nuxt.js is a framework for creating Universal Vue.js Applications. Its main scope is UI rendering while abstracting away the client/server distribution.
- [Firebase](https://firebase.google.com/) : Firebase provides a realtime database and backend as a service. The service provides application developers an API that allows application data to be synchronized across clients and stored on Firebase's cloud.
## Require
- Node v8.11.1

## Setup & Development
The first time you run the project you should follow ALL the steps.

### Firebase
- Go to the [Firebase console](https://console.firebase.google.com/) and create a new project.
- Open `~config/firebase/config_base.js` and introduce the config data.
- Rename `~config/firebase/config_base.js` -> `~config/firebase/config.js`. This file now will be `.gitignore`d.
- Go to [Google Cloud Platform](https://console.cloud.google.com/projectselector/iam-admin/serviceaccounts) and create a new Service Account for the project. 
- Save the .json that it will download like `service-account.json` into `~config/firebase/`. This file will be `.gitignore`d as well.

### Database
- Enter into your new project in firebase. Go to database and create a new cloud firestore. You can find some basic info about this [here](https://firebase.google.com/docs/firestore/quickstart).
- Add a new collection `config` and a new doc (inside config collection) `init` in your firestore. Then add a field named `dataset` with the default value `false`.
- Go to the firestore rules and change the default `false` permissions to `true`. This is just to create the structure of the database. Then we will defined it again. The rules should now look like :
```
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```
- The structure of the database have to be defined in your directory `~/config/database`.

### Server
- `npm install`
- Run development server: `npm run dev` and go to `localhost:3000` / `0.0.0.0:3000`

## Compile the code for production or staging
This process will compile the html templates, scss & JS.
- *Production:* `npm run build`
