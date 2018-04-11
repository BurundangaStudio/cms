//
// serverMiddleware/auth-cookie.js

//
// Coded by Christian MacMillan (_@burundanga.studio)
// April 2018 | http://burundanga.studio
//
// Partial credits David Roger :: https://github.com/davidroyer

const firebaseAdmin = require("../services/firebase-admin-init.js");
const cookieParser = require("cookie-parser")();
global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = function(req, res, next) {
    getIdToken(req, res).then(idToken => {
        if (idToken) {
            addDecodedIdToken(idToken, req).then(() => {
                next();
            });
        } else {
            next();
        }
    });
};

function getIdToken(req, res) {
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
    ) {
        return Promise.resolve(req.headers.authorization.split("Bearer ")[1]);
    }
    return new Promise(function(resolve) {
        cookieParser(req, res, () => {
            if (req.cookies && req.cookies.__session) {
                resolve(req.cookies.__session);
            } else {
                resolve();
            }
        });
    });
}

function addDecodedIdToken(idToken, req) {
    return firebaseAdmin
        .auth()
        .verifyIdToken(idToken)
        .then(decodedIdToken => {
            req.user = decodedIdToken;
        });
}
