import { FastifyInstance } from 'fastify';

import { Services } from '@services/index';
import { HttpStatus } from '@enums/status';

export async function setupUserRoutes(fastify: FastifyInstance, services: Services): Promise<void> {
  fastify.get('/users/:id', async (request, reply) => {
    const { id } = request.params as { id: string };

    try {
      const user = await services.user.getUserById(id);

      if (!user) {
        return reply.code(HttpStatus.NOT_FOUND).send({
          error: 'User not found'
        });
      }

      return user;
    } catch (error) {
      request.log.error(error);
      return reply.code(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: 'Internal server error'
      });
    }
  });

  fastify.post('/users', async (request, reply) => {
    const { name, email } = request.body as { name: string; email: string };

    try {
      const newUser = await services.user.createUser({ name, email });
      return reply.code(HttpStatus.CREATED).send(newUser);
    } catch (error) {
      if (error instanceof Error) {
        return reply.code(HttpStatus.BAD_REQUEST).send({
          error: error.message
        });
      }

      request.log.error(error);
      return reply.code(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: 'Internal server error'
      });
    }
  });
}