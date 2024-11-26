import { FastifyInstance } from 'fastify';
import { register, authenticate } from '@/http/controllers';

export async function appRoutes(app: FastifyInstance) {
  app.post('/user', register);
  app.post('/authenticate', authenticate);
}
