'use strict'

const express = require('express')
const homeController = require('../controllers/home')

let router = express.Router()

router.get('/', homeController.index)
router.get('/info', homeController.info)
router.get('/add', homeController.add)

module.exports = router
