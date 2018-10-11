# OluetAPI
![ipa-api](app/resources/ipa-api.png)

 ## Mikä
 * nodejs
 * express
 * firebase
 * oluet raavittu alkon sivuilta

## Rest
Kaikki haut ovat case insensitive.
#### GET api/oluet
Palauttaa kaikki oluet kannasta.
#### GET api/oluet/nimi/pikku
Palauttaa oluet, joiden nimi sisältää "pikku".
#### GET api/oluet/valmistaja/rekolan panimo
Palauttaa oluet, joiden valmistaja sisältää "rekolan panimo".
#### GET api/oluet/haku/ipa
Yleishaku: palauttaa oluet, joiden nimi/valmistaja/tyyppi/kuvaus/suositukset sisältää "ipa".
#### POST api/oluet/?nimi=Upouusi IPA&valmistaja=Esimerkkipanimo&tyyppi=IPA, ale&alkoholi=5&kuvaus=sitruksinen, hunajainen&suositukset=Grilliruoka
Lisää uuden oluen tietokantaan em. parametrein.

## Käyttö
`npm start` projektin juuressa käynnistää node serverin localhostin porttiin 8082. Firebase service account key pitää olla projektin juuressa.
