const express = require("express");
const router = express.Router();

const UrlController = require('../controllers/UrlController')

router.post('/url/shorten', UrlController.createShortURL)
router.get('/:urlCode', UrlController.redirectToOriginalURL)

module.exports = router;
