import { fastify } from 'fastify';
import { appRoutes } from './http/routes';
import { ZodError } from 'zod';
import { env } from './env';

export const app = fastify();
app.register(appRoutes);

app.setErrorHandler((error, _, response) => {
  if (error instanceof ZodError) {
    response.status(400).send({
      message: 'Validation error',
      issues: error.format(),
    });
  }

  if (env.data.NODE_ENV === 'production') {
    console.log(error);
  } else {
    // TODO LOG ERROR
  }

  return response.status(500).send({ message: 'Internal server error' });
});
