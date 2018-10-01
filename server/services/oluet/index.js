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
    console.log(nimi);
    for (let i = 0; i < oluet.length; i++) {
        console.log("ffwe");
        if (oluet[i].nimi === nimi) {
            console.log("löyty");
            result = oluet[i];
            break;
        }
    }

    res.json(result);
}

module.exports = {
    getOluet: getOluet,
    getOlutByName: getOlutByName
};