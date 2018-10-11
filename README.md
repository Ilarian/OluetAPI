# OluetAPI
![ipa-api](app/resources/ipa-api.png)

## Rest
Kaikki haut ovat case insensitive.
#### GET api/oluet
Palauttaa kaikki oluet kannasta.
#### GET api/oluet/nimi/pikku pässi
Palauttaa oluet, joiden nimi sisältää "pikku pässi".
#### GET api/oluet/valmistaja/fiskarsin
Palauttaa oluet, joiden valmistaja sisältää "fiskarsin".
#### GET api/oluet/haku/ipa
Yleishaku: palauttaa oluet, joiden nimi/valmistaja/tyyppi/kuvaus/suositukset sisältää "ipa".
#### POST api/oluet/?nimi=Upouusi IPA&valmistaja=Esimerkkipanimo&tyyppi=IPA, ale&alkoholi=5&kuvaus=sitruksinen, hunajainen&suositukset=Grilliruoka
Lisää uuden oluen tietokantaan em. parametrein.

## Tietokanta
Tietokantana toimii Firebase.
