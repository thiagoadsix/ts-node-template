import Fastify from 'fastify';

import { setupRoutes } from '@routes/index';
import { setupServices } from '@services/index';
import { setupClients } from '@clients/index';
import { setupRepositories } from '@repositories/index';

async function startServer() {
  const fastify = Fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      },
    },
  });

  const clients = setupClients();
  const repositories = setupRepositories(clients);
  const services = setupServices(repositories);

  await setupRoutes(fastify, services);

  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

startServer();
