const UserController = require('../../controllers/UserController');
const User = require('../models/User');

describe('UserController', () => {
  describe('registerUser', () => {
    it('should register a new user', async () => {
      const req = {
        body: {
          username: 'testuser',
          email: 'test@example.com',
          password: 'testpassword'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };
      await UserController.registerUser(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalled();
    });

    it('should return error if user already exists', async () => {
      const req = {
        body: {
          username: 'existinguser',
          email: 'existing@example.com',
          password: 'testpassword'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };
      jest.spyOn(User, 'findOne').mockResolvedValueOnce(true);
      await UserController.registerUser(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ message: 'User already exists' });
    });
  });

  describe('loginUser', () => {
    it('should authenticate a user', async () => {
      const req = {
        body: {
          username: 'testuser',
          password: 'testpassword'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };
      jest.spyOn(User, 'findOne').mockResolvedValueOnce({
        username: 'testuser',
        password: 'hashedpassword'
      });
      await UserController.loginUser(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalled();
    });

    it('should return error if authentication fails', async () => {
      const req = {
        body: {
          username: 'testuser',
          password: 'invalidpassword'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };
      jest.spyOn(User, 'findOne').mockResolvedValueOnce(null);
      await UserController.loginUser(req, res);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith({ message: 'Invalid username or password' });
    });
  });
});
