import { Repositories } from '@repositories/index';
import { User } from '@repositories/functions/user';
import { isValidEmail, isValidLength } from '@helpers/validate';

interface UserService {
  getUserById: (id: string) => Promise<User | null>;
  createUser: (data: { name: string; email: string }) => Promise<User>;
}

export function createUserService(repositories: Repositories): UserService {
  return {
    getUserById: async (id: string): Promise<User | null> => {
      return repositories.user.findById(id);
    },

    createUser: async (data: { name: string; email: string }): Promise<User> => {
      if (!data.email || !isValidEmail(data.email)) {
        throw new Error('Invalid email address');
      }

      if (!data.name || !isValidLength(data.name, 2)) {
        throw new Error('Name must be at least 2 characters');
      }

      return repositories.user.create(data);
    }
  };
}