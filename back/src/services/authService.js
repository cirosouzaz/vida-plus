const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dataSource = require('../database/data-source');

const User = require('../entities/User.entity');

const getRepository = () => dataSource.getRepository('User');

async function register({ name, email, password, cep, street, neighborhood, city, state }) {
  const repo = getRepository();
  const existing = await repo.findOne({ where: { email } });
  if (existing) throw { status: 400, message: 'Email already in use' };
  const hashed = await bcrypt.hash(password, 10);
  const user = repo.create({ name, email, password: hashed, cep, street, neighborhood, city, state });
  await repo.save(user);
  return { id: user.id, name: user.name, email: user.email };
}

async function login({ email, password }) {
  const repo = getRepository();
  const user = await repo.findOne({ where: { email } });
  if (!user) throw { status: 401, message: 'Invalid credentials' };
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw { status: 401, message: 'Invalid credentials' };
  const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' });
  return { token };
}

module.exports = { register, login };
