const request = require('supertest');
const app = require('../app');
const dataSource = require('../database/data-source');

describe('Medications CRUD', () => {
  if (!process.env.DATABASE_URL) {
    test('skip medications tests because DATABASE_URL is not configured', () => {
      expect(true).toBe(true);
    });
    return;
  }

  let token;
  let medicationId;
  const email = `med+${Date.now()}@example.com`;
  const password = 'pass';

  beforeAll(async () => {
    if (!dataSource.isInitialized) await dataSource.initialize();
    await request(app).post('/api/auth/register').send({ name: 'M', email, password });
    const login = await request(app).post('/api/auth/login').send({ email, password });
    token = login.body.token;
  });

  afterAll(async () => {
    if (dataSource.isInitialized) await dataSource.destroy();
  });

  it('creates a new medication', async () => {
    const response = await request(app)
      .post('/api/medications')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Med1', dosage: '10mg', schedule: 'Daily' });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({ name: 'Med1', dosage: '10mg', schedule: 'Daily' });
    medicationId = response.body.id;
  });

  it('lists existing medications', async () => {
    const response = await request(app)
      .get('/api/medications')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.some((item) => item.id === medicationId)).toBe(true);
  });

  it('updates a medication', async () => {
    const response = await request(app)
      .put(`/api/medications/${medicationId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ dosage: '20mg' });

    expect(response.status).toBe(200);
    expect(response.body.dosage).toBe('20mg');
  });

  it('deletes a medication', async () => {
    const response = await request(app)
      .delete(`/api/medications/${medicationId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204);
  });

  it('returns 404 when deleting a missing medication', async () => {
    const response = await request(app)
      .delete('/api/medications/00000000-0000-0000-0000-000000000000')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
  });
});
