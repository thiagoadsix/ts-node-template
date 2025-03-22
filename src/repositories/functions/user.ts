import { Clients } from '@clients/index';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserRepository {
  findById: (id: string) => Promise<User | null>;
  create: (data: Omit<User, 'id'>) => Promise<User>;
}

export function createUserRepository(clients: Clients): UserRepository {
  const users: User[] = [];

  return {
    findById: async (id: string): Promise<User | null> => {
      const user = users.find(u => u.id === id);
      return user || null;
    },

    create: async (data: Omit<User, 'id'>): Promise<User> => {
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        ...data
      };

      users.push(newUser);
      return newUser;
    }
  };
}