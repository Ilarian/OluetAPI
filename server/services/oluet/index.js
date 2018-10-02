'use strict';

const _ = require('lodash');

function randomString(length, chars) {
    let result = '';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

const firebase = require("firebase-admin");

const serviceAccount = require("../../../olutapi-96b26-firebase-adminsdk-c97wl-b810725bd8.json");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://olutapi-96b26.firebaseio.com"
});

function populateDb() {
    //TODO: ota alkon sivuilta raavitusta jsonista tiedot ja puske ne firebaseen
    firebase.database().ref(randomString(32, "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"))
        .set({
            nimi: "Firestone Pivo Hoppy Pils",
            valmistaja: "Firestone Walker",
            alkoholi: 5.3,
            tyyppi: ["pils"],
            maku: [
                "kullankeltainen",
                "keskitäyteläinen",
                "voimakkaasti humaloitu",
                "aromikas",
                "hedelmäinen",
                "sitruksinen"
            ],
            ruoka: [
                "grilliruoka",
                "itämainen ruoka",
                "pasta ja pizza",
                "vähärasvainen kala"
            ]
        });
}

function getOluet(req, res) {
    firebase.database().ref().on("value", function(snapshot) {
        res.json(snapshot.val());
    });
}

function getOlutByName(req, res) {
    let nimi = req.params.nimi || 0,
        result = [];
    firebase.database().ref().on("value", function(snapshot) {
        snapshot.forEach(item => {
            if (_.includes(item.child("nimi").val().toLowerCase(), nimi.toLowerCase())) {
                result[result.length] = item.val();
            }
        });
        res.json(result);
    });
}

function getOlutByValmistaja(req, res){
    let valmistaja = req.params.valmistaja || 0,
        result = [];
    firebase.database().ref().on("value", function(snapshot) {
        snapshot.forEach(item => {
            if (_.includes(item.child("valmistaja").val().toLowerCase(), valmistaja.toLowerCase())) {
                result[result.length] = item.val();
            }
        });
        res.json(result);
    });
}

function getOlutByGeneralQuery(req, res) {
    let haku = req.params.haku || 0,
        result = [];
    firebase.database().ref().on("value", function(snapshot) {
        snapshot.forEach(item => {
            if (_.includes(item.child("valmistaja").val().toLowerCase(), haku.toLowerCase())) {
                result[result.length] = item.val();
            } else if (_.includes(item.child("nimi").val().toLowerCase(), haku.toLowerCase())) {
                result[result.length] = item.val();
            } else {
                let match = false;
                for (let i = 0; i < item.child("tyyppi").val().length; i++) {
                    if (_.includes(item.child("tyyppi").val()[i].toLowerCase(), haku.toLowerCase())) {
                        match = true;
                    }
                }
                if (!match) {
                    for (let i = 0; i < item.child("maku").val().length; i++) {
                        if (_.includes(item.child("maku").val()[i].toLowerCase(), haku.toLowerCase())) {
                            match = true;
                        }
                    }
                }
                if (!match) {
                    for (let i = 0; i < item.child("ruoka").val().length; i++) {
                        if (_.includes(item.child("ruoka").val()[i].toLowerCase(), haku.toLowerCase())) {
                            match = true;
                        }
                    }
                }
                if (match) result[result.length] = item.val();
            }
        });
        res.json(result);
    });
}

module.exports = {
    getOluet: getOluet,
    getOlutByName: getOlutByName,
    getOlutByValmistaja: getOlutByValmistaja,
    getOlutByGeneralQuery: getOlutByGeneralQuery
};