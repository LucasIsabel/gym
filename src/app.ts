import { fastify } from 'fastify';
import { z } from 'zod';
import { prisma } from './lib/prisma';

export const app = fastify();

app.post('/user', async (request, response) => {
  const registerBodySchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  await prisma.user.create({
    data: {
      name,
      email,
      passwrod_hash: password,
    },
  });

  response.status(201).send();
});
