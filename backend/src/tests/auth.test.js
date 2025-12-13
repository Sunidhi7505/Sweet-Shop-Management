require('dotenv').config();

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Auth API', () => {

  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('token');
  });

  it('should login an existing user', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Login User',
        email: 'login@example.com',
        password: 'password123'
      });

    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'login@example.com',
        password: 'password123'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should not allow duplicate email registration', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({
        name: 'User One',
        email: 'duplicate@example.com',
        password: 'password123'
      });

    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'User Two',
        email: 'duplicate@example.com',
        password: 'password123'
      });

    expect(response.statusCode).toBe(400);
  });

  it('should not login with invalid password', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Invalid Login User',
        email: 'invalidlogin@example.com',
        password: 'correctpassword'
      });

    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'invalidlogin@example.com',
        password: 'wrongpassword'
      });

    expect(response.statusCode).toBe(401);
  });

  it('should deny access to protected route without token', async () => {
    const response = await request(app).get('/api/protected');
    expect(response.statusCode).toBe(401);
  });

  it('should allow access to protected route with valid token', async () => {
  // Register user
  const registerRes = await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Protected User',
      email: 'protected@example.com',
      password: 'password123'
    });

  const token = registerRes.body.token;

  // Access protected route with token
  const response = await request(app)
    .get('/api/protected')
    .set('Authorization', `Bearer ${token}`);

  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty('user');
});

it('should return empty sweets list for authenticated user', async () => {
  // register user
  const registerRes = await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Sweet User',
      email: 'sweetuser@example.com',
      password: 'password123'
    });

  const token = registerRes.body.token;

  // get sweets
  const response = await request(app)
    .get('/api/sweets')
    .set('Authorization', `Bearer ${token}`);

  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual([]);
});

it('should allow ADMIN to add a new sweet', async () => {
  // register admin user
  const registerRes = await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123'
    });

  const adminToken = registerRes.body.token;

  // make this user ADMIN directly (test setup)
  const User = require('../models/user.model');
  await User.findOneAndUpdate(
    { email: 'admin@example.com' },
    { role: 'ADMIN' }
  );

  // add sweet
  const response = await request(app)
    .post('/api/sweets')
    .set('Authorization', `Bearer ${adminToken}`)
    .send({
      name: 'Gulab Jamun',
      category: 'Indian',
      price: 10,
      quantity: 50
    });

  expect(response.statusCode).toBe(201);
  expect(response.body).toHaveProperty('_id');
  expect(response.body.name).toBe('Gulab Jamun');
});



});
