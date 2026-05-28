const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');

router.get('/:cep', addressController.lookup);

module.exports = router;
