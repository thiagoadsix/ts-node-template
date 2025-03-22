import { FastifyInstance } from 'fastify';

import { Services } from '@services/index';
import { setupUserRoutes } from './user';

export async function setupRoutes(fastify: FastifyInstance, services: Services): Promise<void> {
  await setupUserRoutes(fastify, services);

  fastify.get('/health', async () => {
    return { status: 'ok' };
  });
}