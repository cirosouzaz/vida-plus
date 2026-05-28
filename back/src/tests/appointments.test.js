const request = require('supertest');
const app = require('../app');
const dataSource = require('../database/data-source');

describe('Appointments CRUD', () => {
  if (!process.env.DATABASE_URL) {
    test('skip appointments tests because DATABASE_URL is not configured', () => {
      expect(true).toBe(true);
    });
    return;
  }

  let token;
  let appointmentId;
  const email = `appt+${Date.now()}@example.com`;
  const password = 'pass';

  beforeAll(async () => {
    if (!dataSource.isInitialized) await dataSource.initialize();
    await request(app).post('/api/auth/register').send({ name: 'A', email, password });
    const login = await request(app).post('/api/auth/login').send({ email, password });
    token = login.body.token;
  });

  afterAll(async () => {
    if (dataSource.isInitialized) await dataSource.destroy();
  });

  it('creates a new appointment', async () => {
    const response = await request(app)
      .post('/api/appointments')
      .set('Authorization', `Bearer ${token}`)
      .send({ doctor: 'Dr X', specialty: 'Cardio', date: new Date().toISOString(), notes: 'Notes' });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({ doctor: 'Dr X', specialty: 'Cardio', notes: 'Notes' });
    appointmentId = response.body.id;
  });

  it('lists existing appointments', async () => {
    const response = await request(app)
      .get('/api/appointments')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.some((item) => item.id === appointmentId)).toBe(true);
  });

  it('updates an appointment', async () => {
    const response = await request(app)
      .put(`/api/appointments/${appointmentId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ notes: 'Updated notes' });

    expect(response.status).toBe(200);
    expect(response.body.notes).toBe('Updated notes');
  });

  it('deletes an appointment', async () => {
    const response = await request(app)
      .delete(`/api/appointments/${appointmentId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204);
  });

  it('returns 404 when updating a missing appointment', async () => {
    const response = await request(app)
      .put('/api/appointments/00000000-0000-0000-0000-000000000000')
      .set('Authorization', `Bearer ${token}`)
      .send({ notes: 'Should fail' });

    expect(response.status).toBe(404);
  });
});
