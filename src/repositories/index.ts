import { Clients } from '@clients/index';
import { createUserRepository } from '@repositories/functions/user';

export interface Repositories {
  user: {
    findById: (id: string) => Promise<any>;
    create: (data: any) => Promise<any>;
  };
}

export function setupRepositories(clients: Clients): Repositories {
  const userRepository = createUserRepository(clients);

  return {
    user: userRepository
  };
}