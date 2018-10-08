'use strict'

const
  _ = require('lodash')

const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

function randomString (length = 32, chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') {
  let result = ''
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
  return result
}

const firebase = require('firebase-admin')

const serviceAccount = require('../../../olutapi-96b26-firebase-adminsdk-c97wl-b810725bd8.json')

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://olutapi-96b26.firebaseio.com'
})

// populateDb();

function populateDb () {
  let xmlhttp = new XMLHttpRequest()
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      let obj = JSON.parse(xmlhttp.responseText)
      for (let i = 0; i < obj.length; i++) {
        console.log('Pushing to firebase: ' + obj[i].nimi)
        firebase.database().ref(randomString())
          .set({
            nimi: obj[i].nimi,
            valmistaja: obj[i].valmistaja,
            alkoholi: obj[i].alkoholi,
            tyyppi: obj[i].tyyppi,
            maku: obj[i].maku,
            ruoka: obj[i].ruoka
          })
      }
      console.log('\nFirebase population done.')
    }
  }
  let jsonFile = 'file://' + __dirname + '/../../../oluet.json'
  console.log(jsonFile)
  xmlhttp.open('GET', jsonFile, true)
  xmlhttp.send()
}

function getOluet (req, res) {
  firebase.database().ref().on('value', function (snapshot) {
    res.json(snapshot.val())
  })
}

function getOlutByName (req, res) {
  let nimi = req.params.nimi || 0

  let result = []
  firebase.database().ref().on('value', function (snapshot) {
    snapshot.forEach(item => {
      if (_.includes(item.child('nimi').val().toLowerCase(), nimi.toLowerCase())) {
        result.push(item.val())
      }
    })
    res.json(result)
  })
}

function getOlutByValmistaja (req, res) {
  let valmistaja = req.params.valmistaja || 0

  let result = []
  firebase.database().ref().on('value', function (snapshot) {
    snapshot.forEach(item => {
      if (_.includes(item.child('valmistaja').val().toLowerCase(), valmistaja.toLowerCase())) {
        result.push(item.val())
      }
    })
    res.json(result)
  })
}

function getOlutByGeneralQuery (req, res) {
  let haku = req.params.haku || 0

  let result = []
  firebase.database().ref().on('value', function (snapshot) {
    let n = 0
    snapshot.forEach(item => {
      console.log('Query - comparing (' + n++ + '): ' + item.child('nimi').val())
      if (_.includes(item.child('valmistaja').val().toLowerCase(), haku.toLowerCase())) {
        result.push(item.val())
      } else if (_.includes(item.child('nimi').val().toLowerCase(), haku.toLowerCase())) {
        result.push(item.val())
      } else if (_.includes(item.child('tyyppi').val().toLowerCase(), haku.toLowerCase())) {
        result.push(item.val())
      } else if (_.includes(item.child('maku').val().toLowerCase(), haku.toLowerCase())) {
        result.push(item.val())
      } else if (_.includes(item.child('ruoka').val().toLowerCase(), haku.toLowerCase())) {
        result.push(item.val())
      }
    })
    console.log('Items in query result: ' + result.length)
    let sizeBytes = roughSizeOfObject(result)
    console.log('Memory size of result object: ' + sizeBytes / 1000 + 'kB')
    res.json(result)
  })
}

function addOlut (req, res) {
  let nimi = req.query.nimi
  let valmistaja = req.query.valmistaja
  let tyyppi = req.query.tyyppi
  let alkoholi = req.query.alkoholi
  let maku = req.query.kuvaus
  let ruoka = req.query.suositukset
  console.log(nimi, valmistaja, tyyppi, alkoholi, maku, ruoka)
  firebase.database().ref(randomString()).set({
    nimi: nimi,
    valmistaja: valmistaja,
    tyyppi: tyyppi,
    alkoholi: alkoholi,
    maku: maku,
    ruoka: ruoka
  })
}

function roughSizeOfObject (object) {
  var objectList = []
  var stack = [ object ]
  var bytes = 0

  while (stack.length) {
    var value = stack.pop()

    if (typeof value === 'boolean') {
      bytes += 4
    } else if (typeof value === 'string') {
      bytes += value.length * 2
    } else if (typeof value === 'number') {
      bytes += 8
    } else if
    (
      typeof value === 'object' &&
            objectList.indexOf(value) === -1
    ) {
      objectList.push(value)

      for (var i in value) {
        stack.push(value[ i ])
      }
    }
  }
  return bytes
}

module.exports = {
  getOluet: getOluet,
  getOlutByName: getOlutByName,
  getOlutByValmistaja: getOlutByValmistaja,
  getOlutByGeneralQuery: getOlutByGeneralQuery,
  addOlut: addOlut
}
