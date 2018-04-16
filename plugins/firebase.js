//
// plugins/firebase.js

//
// Coded by Christian MacMillan (_@burundanga.studio)
// April 2018 | http://burundanga.studio

import * as firebase from "firebase";
import config from "~/config/database/firebase.js";

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
