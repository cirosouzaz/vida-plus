const { DataSource } = require('typeorm');
const User = require('../entities/User.entity');
const Appointment = require('../entities/Appointment.entity');
const Medication = require('../entities/Medication.entity');

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl || dbUrl.includes('host') || dbUrl.includes('your')) {
  throw new Error(
    'DATABASE_URL is not configured correctly. Copy back/.env.example to back/.env and replace the placeholder values with your actual PostgreSQL connection data.'
  );
}

const dataSource = new DataSource({
  type: 'postgres',
  url: dbUrl,
  synchronize: true,
  logging: false,
  entities: [User, Appointment, Medication]
});

module.exports = dataSource;
