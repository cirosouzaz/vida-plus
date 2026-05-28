const request = require('supertest');
const app = require('../app');

describe('Appointments CRUD', () => {
  if (!process.env.DATABASE_URL) {
    test('skip appointments tests because DATABASE_URL is not configured', () => {
      expect(true).toBe(true);
    });
    return;
  }

  let token;
  beforeAll(async () => {
    const email = `appt+${Date.now()}@example.com`;
    await request(app).post('/api/auth/register').send({ name: 'A', email, password: 'pass' });
    const login = await request(app).post('/api/auth/login').send({ email, password: 'pass' });
    token = login.body.token;
  });

  it('create list update delete', async () => {
    const create = await request(app).post('/api/appointments').set('Authorization', `Bearer ${token}`).send({ doctor: 'Dr X', specialty: 'Cardio', date: new Date().toISOString(), notes: 'Notes' });
    expect(create.status).toBe(201);
    const list = await request(app).get('/api/appointments').set('Authorization', `Bearer ${token}`);
    expect(list.status).toBe(200);
    const id = create.body.id;
    const upd = await request(app).put(`/api/appointments/${id}`).set('Authorization', `Bearer ${token}`).send({ notes: 'updated' });
    expect(upd.status).toBe(200);
    const del = await request(app).delete(`/api/appointments/${id}`).set('Authorization', `Bearer ${token}`);
    expect(del.status).toBe(204);
  });
});
