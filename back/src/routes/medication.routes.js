const express = require('express');
const router = express.Router();
const medicationController = require('../controllers/medicationController');

router.get('/', medicationController.list);
router.post('/', medicationController.create);
router.put('/:id', medicationController.update);
router.delete('/:id', medicationController.remove);

module.exports = router;
