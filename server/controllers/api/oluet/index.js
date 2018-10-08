'use strict'

const
  express = require('express')

const oluetService = require('../../../services/oluet')

let router = express.Router()

router.get('/', oluetService.getOluet)
router.get('/nimi/:nimi', oluetService.getOlutByName)
router.get('/valmistaja/:valmistaja', oluetService.getOlutByValmistaja)
router.get('/haku/:haku', oluetService.getOlutByGeneralQuery)
router.post('/', oluetService.addOlut)

module.exports = router
