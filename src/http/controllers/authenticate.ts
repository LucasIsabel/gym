import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function authenticate(
  request: FastifyRequest,
  response: FastifyReply
) {
  const requestBody = z.object({
    email: z.string().min(3),
    password: z.string().min(3),
  });

  const { email, password } = requestBody.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();

    await authenticateUseCase.execute({ email, password });

    return response.status(200).send();
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return response.status(400).send({ message: error.message });
    }
  }
}
