'use strict';

const
    express = require('express'),
    oluetController = require('../../controllers/api/oluet');

let router = express.Router();

router.use('/oluet', oluetController);

module.exports = router;
