'use strict';

const
    express = require('express'),
    oluetController = require('../../controllers/api/oluet');

let router = express.Router();

router.use('/oluet', oluetController);
//router.use('/oluet/nimi', oluetController);


module.exports = router;
