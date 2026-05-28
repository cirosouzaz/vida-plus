const jwt = require('jsonwebtoken');
const dataSource = require('../database/data-source');

module.exports = async function (req, res, next) {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ message: 'No token provided' });
    const parts = auth.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ message: 'Invalid token format' });
    const token = parts[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
    const userId = decoded.sub;
    const userRepo = dataSource.getRepository('User');
    const user = await userRepo.findOne({ where: { id: userId } });
    if (!user) return res.status(401).json({ message: 'User not found' });
    req.user = { id: user.id, name: user.name, email: user.email };
    next();
  } catch (err) {
    next({ status: 401, message: 'Invalid token' });
  }
};