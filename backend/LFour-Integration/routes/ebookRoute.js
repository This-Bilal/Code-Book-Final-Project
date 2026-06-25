const express = require('express')
const { adminProtect } = require('../middleware/authMiddleware')
const { createEbook, getAnEbook, getAllEbook, updateEbook } = require('../controllers/ebookController')
const router = express.Router()

router.post('/createEbook', adminProtect, createEbook)
router.get('/singleEbook/:id', getAnEbook)
router.get('/allEbooks', getAllEbook)
router.patch('/updateEbook/:id', adminProtect, updateEbook)

module.exports = router