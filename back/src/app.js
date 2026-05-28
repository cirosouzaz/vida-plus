require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', routes);
console.log('API documentation available at /api/docs');

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Internal server error' });
});

module.exports = app;
