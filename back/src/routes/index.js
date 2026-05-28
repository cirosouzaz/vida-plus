const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');
const appointmentRoutes = require('./appointment.routes');
const medicationRoutes = require('./medication.routes');
const addressRoutes = require('./address.routes');
const authMiddleware = require('../middlewares/authMiddleware');

router.use('/auth', authRoutes);
router.use('/users/address', addressRoutes);

// Protected routes
router.use('/appointments', authMiddleware, appointmentRoutes);
router.use('/medications', authMiddleware, medicationRoutes);

module.exports = router;
