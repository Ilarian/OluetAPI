'use strict';

const
    express = require('express'),
    oluetService = require('../../../services/oluet');

let router = express.Router();

router.get('/', oluetService.getOluet);
router.get('/:nimi', oluetService.getOlutByName);

module.exports = router;
