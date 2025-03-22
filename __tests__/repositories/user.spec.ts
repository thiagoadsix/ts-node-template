import { describe, it, expect } from 'vitest';
import { createUserRepository } from '@repositories/functions/user';

describe('User Repository', () => {
  const mockClients = {
    example: {
      connect: async () => {},
      disconnect: async () => {}
    }
  };

  it('should create a new user', async () => {
    const userRepository = createUserRepository(mockClients);
    const userData = { name: 'Test User', email: 'test@example.com' };

    const user = await userRepository.create(userData);

    expect(user).toHaveProperty('id');
    expect(user.name).toBe(userData.name);
    expect(user.email).toBe(userData.email);
  });

  it('should find a user by id after creation', async () => {
    const userRepository = createUserRepository(mockClients);
    const userData = { name: 'Test User', email: 'test@example.com' };

    const createdUser = await userRepository.create(userData);
    const foundUser = await userRepository.findById(createdUser.id);

    expect(foundUser).not.toBeNull();
    expect(foundUser).toEqual(createdUser);
  });

  it('should return null when finding a non-existent user', async () => {
    const userRepository = createUserRepository(mockClients);

    const user = await userRepository.findById('non-existent-id');

    expect(user).toBeNull();
  });
});