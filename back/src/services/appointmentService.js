const dataSource = require('../database/data-source');

const getRepo = () => dataSource.getRepository('Appointment');

async function createAppointment(userId, payload) {
  const repo = getRepo();
  const appointment = repo.create({ ...payload, user: { id: userId } });
  return repo.save(appointment);
}

async function listAppointments(userId) {
  const repo = getRepo();
  return repo.find({ where: { user: { id: userId } }, order: { date: 'ASC' } });
}

async function getAppointment(id, userId) {
  const repo = getRepo();
  return repo.findOne({ where: { id, user: { id: userId } } });
}

async function updateAppointment(id, userId, payload) {
  const repo = getRepo();
  const ap = await getAppointment(id, userId);
  if (!ap) throw { status: 404, message: 'Appointment not found' };
  Object.assign(ap, payload);
  return repo.save(ap);
}

async function deleteAppointment(id, userId) {
  const repo = getRepo();
  const ap = await getAppointment(id, userId);
  if (!ap) throw { status: 404, message: 'Appointment not found' };
  return repo.remove(ap);
}

module.exports = { createAppointment, listAppointments, getAppointment, updateAppointment, deleteAppointment };
