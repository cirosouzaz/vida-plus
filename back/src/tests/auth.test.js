const request = require('supertest');
const app = require('../app');
const dataSource = require('../database/data-source');

describe('Auth', () => {
  if (!process.env.DATABASE_URL) {
    test('skip auth tests because DATABASE_URL is not configured', () => {
      expect(true).toBe(true);
    });
    return;
  }

  beforeAll(async () => {
    if (!dataSource.isInitialized) await dataSource.initialize();
  });

  afterAll(async () => {
    if (dataSource.isInitialized) await dataSource.destroy();
  });

  const email = `test+${Date.now()}@example.com`;
  it('should register and login', async () => {
    const registerRes = await request(app).post('/api/auth/register').send({ name: 'Test', email, password: 'pass123' });
    expect(registerRes.status).toBe(201);
    const loginRes = await request(app).post('/api/auth/login').send({ email, password: 'pass123' });
    expect(loginRes.status).toBe(200);
    expect(loginRes.body.token).toBeDefined();
  });
});
