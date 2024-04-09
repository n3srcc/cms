const request = require('supertest');
const app = require('../server');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

describe('User Controller', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/user/register')
      .send({ username: 'testuser', email: 'test@example.com', password: 'password123', userType: 'admin' });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
  });

  it('should authenticate an existing user', async () => {
    const hashedPassword = await bcrypt.hash('password123', 10);
    await User.create({ username: 'testuser', email: 'test@example.com', password: hashedPassword, userType: 'admin' });

    const res = await request(app)
      .post('/api/user/auth')
      .send({ username: 'testuser', password: 'password123' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');

    const decoded = jwt.verify(res.body.token, process.env.JWT_SECRET);
    expect(decoded).toHaveProperty('userId');
    expect(decoded).toHaveProperty('role', 'admin');
  });
});
