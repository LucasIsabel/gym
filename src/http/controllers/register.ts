import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { RegisterUserCase } from '@/use-cases/register';
import { PrismaUserRepository } from '@/repository/prisma-users-repository';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';

export async function register(
  request: FastifyRequest,
  response: FastifyReply
) {
  const registerBodySchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const prismaUserRepository = new PrismaUserRepository();
    const registerUseCase = new RegisterUserCase(prismaUserRepository);

    await registerUseCase.execute({ name, email, password });

    response.status(201).send();
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return response.status(409).send;
    }

    throw err;
  }
}
