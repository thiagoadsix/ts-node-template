import { Repositories } from '@repositories/index';
import { createUserService } from '@services/user';

export interface Services {
  user: {
    getUserById: (id: string) => Promise<any>;
    createUser: (data: any) => Promise<any>;
  };
}

export function setupServices(repositories: Repositories): Services {
  const userService = createUserService(repositories);

  return {
    user: userService
  };
}