const appointmentService = require('../services/appointmentService');

async function create(req, res, next) {
  try {
    const ap = await appointmentService.createAppointment(req.user.id, req.body);
    res.status(201).json(ap);
  } catch (err) { next(err); }
}

async function list(req, res, next) {
  try {
    const items = await appointmentService.listAppointments(req.user.id);
    res.json(items);
  } catch (err) { next(err); }
}

async function update(req, res, next) {
  try {
    const ap = await appointmentService.updateAppointment(req.params.id, req.user.id, req.body);
    res.json(ap);
  } catch (err) { next(err); }
}

async function remove(req, res, next) {
  try {
    await appointmentService.deleteAppointment(req.params.id, req.user.id);
    res.status(204).end();
  } catch (err) { next(err); }
}

module.exports = { create, list, update, remove };
