'use strict';

const
    _ = require('lodash'),
    XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function randomString(length=32, chars="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ") {
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

//populateDb();

function populateDb() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            let obj = JSON.parse(xmlhttp.responseText);
            for (let i = 0; i < obj.length; i++) {
                firebase.database().ref(randomString())
                    .set({
                        nimi: obj[i].nimi,
                        valmistaja: obj[i].valmistaja,
                        alkoholi: obj[i].alkoholi,
                        tyyppi: obj[i].tyyppi,
                        maku: obj[i].maku,
                        ruoka: obj[i].ruoka
                    });
            }
        }
    };
    xmlhttp.open("GET", "file:///home/juha/WebstormProjects/nodejs-exercise/AlkoDatabase.json", true);
    xmlhttp.send();

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
            } else if (_.includes(item.child("tyyppi").val().toLowerCase(), haku.toLowerCase())) {
                result[result.length] = item.val();
            } else if (_.includes(item.child("maku").val().toLowerCase(), haku.toLowerCase())) {
                result[result.length] = item.val();
            } else if (_.includes(item.child("ruoka").val().toLowerCase(), haku.toLowerCase())) {
                result[result.length] = item.val();
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