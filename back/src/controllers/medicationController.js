const medicationService = require('../services/medicationService');

async function create(req, res, next) {
  try {
    const m = await medicationService.createMedication(req.user.id, req.body);
    res.status(201).json(m);
  } catch (err) { next(err); }
}

async function list(req, res, next) {
  try {
    const items = await medicationService.listMedications(req.user.id);
    res.json(items);
  } catch (err) { next(err); }
}

async function update(req, res, next) {
  try {
    const m = await medicationService.updateMedication(req.params.id, req.user.id, req.body);
    res.json(m);
  } catch (err) { next(err); }
}

async function remove(req, res, next) {
  try {
    await medicationService.deleteMedication(req.params.id, req.user.id);
    res.status(204).end();
  } catch (err) { next(err); }
}

module.exports = { create, list, update, remove };
