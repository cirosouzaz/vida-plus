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
  const password = 'pass123';

  it('registers a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Test', email, password });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({ id: expect.any(String), name: 'Test', email });
  });

  it('prevents duplicate registration', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Test', email, password });

    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/Email already in use/i);
  });

  it('logs in with valid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email, password });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it('rejects login with invalid password', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email, password: 'wrongpass' });

    expect(response.status).toBe(401);
    expect(response.body.message).toMatch(/invalid credentials/i);
  });

  it('rejects login for non-existing user', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: `missing+${Date.now()}@example.com`, password });

    expect(response.status).toBe(401);
    expect(response.body.message).toMatch(/invalid credentials/i);
  });
});
