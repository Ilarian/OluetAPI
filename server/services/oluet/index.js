'use strict';

const
    oluet = [{
        nimi: "Fiskarsin Pikku Pässi Bock",
        valmistaja: "Fiskarsin Panimo",
        alkoholi: 6.6,
        tyyppi: ["vahva lager", "bock"],
        maku: [
            "kastanjanruskea",
            "samea",
            "keskitäyteläinen",
            "voimakkaasti humaloitu",
            "karamellimaltainen",
            "hedelmätorttuinen",
            "hennon siirappinen",
            "mausteinen"
        ],
        ruoka: [
            "pataruoka",
            "riista",
            "nauta",
            "seurustelujuoma"
        ]
    }, {
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
    }];


function getOluet(req, res) {
    res.json(oluet);
}

function getOlutByName(req, res) {
    let nimi = req.params.nimi || 0,
        result = {};
    for (let i = 0; i < oluet.length; i++) {
        if (oluet[i].nimi === nimi) {
            result = oluet[i];
            break;
        }
    }

    res.json(result);
}

function getOlutByValmistaja(req, res){
    let valmistaja = req.params.valmistaja || 0,
        result = {};
    for(let i = 0; i < oluet.length; i++){
        if (oluet[i].valmistaja === valmistaja){
            result = oluet[i];
            break;
        }
    }
    res.json(result);
}

module.exports = {
    getOluet: getOluet,
    getOlutByName: getOlutByName,
    getOlutByValmistaja: getOlutByValmistaja
};