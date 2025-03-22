import { describe, it, expect, vi, beforeEach } from 'vitest';
import Fastify, { FastifyInstance } from 'fastify';

import { setupUserRoutes } from '@routes/user';
import { User } from '@repositories/functions/user';

describe('User Routes', () => {
  const mockUser: User = {
    id: '123',
    name: 'Test User',
    email: 'test@example.com'
  };

  const mockServices = {
    user: {
      getUserById: vi.fn(),
      createUser: vi.fn()
    }
  };

  let fastify: FastifyInstance;

  beforeEach(async () => {
    vi.resetAllMocks();

    fastify = Fastify();
    await setupUserRoutes(fastify, mockServices);
    await fastify.ready();
  });

  it('should return user when found', async () => {
    mockServices.user.getUserById.mockResolvedValue(mockUser);

    const response = await fastify.inject({
      method: 'GET',
      url: '/users/123'
    });

    expect(response.statusCode).toBe(200);
    expect(mockServices.user.getUserById).toHaveBeenCalledWith('123');
    expect(JSON.parse(response.payload)).toEqual(mockUser);
  });

  it('should return 404 when user not found', async () => {
    mockServices.user.getUserById.mockResolvedValue(null);

    const response = await fastify.inject({
      method: 'GET',
      url: '/users/non-existent'
    });

    expect(response.statusCode).toBe(404);
    expect(JSON.parse(response.payload)).toHaveProperty('error', 'User not found');
  });

  it('should create user with valid data', async () => {
    const userData = { name: 'New User', email: 'new@example.com' };
    const newUser = { id: '456', ...userData };
    mockServices.user.createUser.mockResolvedValue(newUser);

    const response = await fastify.inject({
      method: 'POST',
      url: '/users',
      payload: userData
    });

    expect(response.statusCode).toBe(201);
    expect(mockServices.user.createUser).toHaveBeenCalledWith(userData);
    expect(JSON.parse(response.payload)).toEqual(newUser);
  });

  it('should return 400 with invalid data', async () => {
    const userData = { name: 'A', email: 'invalid' };
    mockServices.user.createUser.mockRejectedValue(new Error('Validation error'));

    const response = await fastify.inject({
      method: 'POST',
      url: '/users',
      payload: userData
    });

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.payload)).toHaveProperty('error', 'Validation error');
  });
});