const request = require('supertest');
const app = require('../app');

describe('Medications CRUD', () => {
  if (!process.env.DATABASE_URL) {
    test('skip medications tests because DATABASE_URL is not configured', () => {
      expect(true).toBe(true);
    });
    return;
  }

  let token;
  beforeAll(async () => {
    const email = `med+${Date.now()}@example.com`;
    await request(app).post('/api/auth/register').send({ name: 'M', email, password: 'pass' });
    const login = await request(app).post('/api/auth/login').send({ email, password: 'pass' });
    token = login.body.token;
  });

  it('create list update delete', async () => {
    const create = await request(app).post('/api/medications').set('Authorization', `Bearer ${token}`).send({ name: 'Med1', dosage: '10mg', schedule: 'Daily' });
    expect(create.status).toBe(201);
    const list = await request(app).get('/api/medications').set('Authorization', `Bearer ${token}`);
    expect(list.status).toBe(200);
    const id = create.body.id;
    const upd = await request(app).put(`/api/medications/${id}`).set('Authorization', `Bearer ${token}`).send({ dosage: '20mg' });
    expect(upd.status).toBe(200);
    const del = await request(app).delete(`/api/medications/${id}`).set('Authorization', `Bearer ${token}`);
    expect(del.status).toBe(204);
  });
});
