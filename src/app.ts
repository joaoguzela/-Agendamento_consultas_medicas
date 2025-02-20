import { appRoutes } from '@/http/routes';
import fastify from 'fastify';
import { ZodError } from 'zod';
import { env } from './env';

export const app = fastify();

app.register(appRoutes);

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: error.message });
  }
  if (env.NODE_ENV !== 'production') {
    console.error(error);
  } else {
    console.log('Error start application');
  }
  return reply.status(500).send({ message: 'Internal server error' });
});
