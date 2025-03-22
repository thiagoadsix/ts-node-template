import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createUserService } from '@services/user';
import { User,UserRepository } from '@repositories/functions/user';

describe('User Service', () => {
  const mockUser: User = {
    id: '123',
    name: 'Test User',
    email: 'test@example.com'
  };

  let mockRepositories: { user: UserRepository };

  beforeEach(() => {
    vi.resetAllMocks();

    mockRepositories = {
      user: {
        findById: vi.fn().mockResolvedValue(mockUser),
        create: vi.fn().mockImplementation((data) =>
          Promise.resolve({ id: '123', ...data }))
      }
    };
  });

  it('should get user by id', async () => {
    const userService = createUserService(mockRepositories);

    const user = await userService.getUserById('123');

    expect(mockRepositories.user.findById).toHaveBeenCalledWith('123');
    expect(user).toEqual(mockUser);
  });

  it('should create a valid user', async () => {
    const userService = createUserService(mockRepositories);
    const userData = { name: 'New User', email: 'new@example.com' };

    const user = await userService.createUser(userData);

    expect(mockRepositories.user.create).toHaveBeenCalledWith(userData);
    expect(user).toEqual({ id: '123', ...userData });
  });

  it('should throw error when creating user with invalid email', async () => {
    const userService = createUserService(mockRepositories);
    const userData = { name: 'New User', email: 'invalid-email' };

    await expect(userService.createUser(userData))
      .rejects.toThrow('Invalid email address');
    expect(mockRepositories.user.create).not.toHaveBeenCalled();
  });

  it('should throw error when creating user with short name', async () => {
    const userService = createUserService(mockRepositories);
    const userData = { name: 'A', email: 'valid@example.com' };

    await expect(userService.createUser(userData))
      .rejects.toThrow('Name must be at least 2 characters');
    expect(mockRepositories.user.create).not.toHaveBeenCalled();
  });
});