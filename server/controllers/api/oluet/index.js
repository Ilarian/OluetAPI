'use strict';

const
    express = require('express'),
    oluetService = require('../../../services/oluet');

let router = express.Router();

router.get('/', oluetService.getOluet);
router.get('/nimi/:nimi', oluetService.getOlutByName);
router.get('/valmistaja/:valmistaja', oluetService.getOlutByValmistaja);

module.exports = router;
