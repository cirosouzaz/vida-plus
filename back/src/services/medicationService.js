const dataSource = require('../database/data-source');

const getRepo = () => dataSource.getRepository('Medication');

async function createMedication(userId, payload) {
  const repo = getRepo();
  const med = repo.create({ ...payload, user: { id: userId } });
  return repo.save(med);
}

async function listMedications(userId) {
  const repo = getRepo();
  return repo.find({ where: { user: { id: userId } }, order: { createdAt: 'DESC' } });
}

async function getMedication(id, userId) {
  const repo = getRepo();
  return repo.findOne({ where: { id, user: { id: userId } } });
}

async function updateMedication(id, userId, payload) {
  const repo = getRepo();
  const med = await getMedication(id, userId);
  if (!med) throw { status: 404, message: 'Medication not found' };
  Object.assign(med, payload);
  return repo.save(med);
}

async function deleteMedication(id, userId) {
  const repo = getRepo();
  const med = await getMedication(id, userId);
  if (!med) throw { status: 404, message: 'Medication not found' };
  return repo.remove(med);
}

module.exports = { createMedication, listMedications, getMedication, updateMedication, deleteMedication };
