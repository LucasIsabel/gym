import { AuthenticateUseCase } from '../authenticate';
import { PrismaUserRepository } from '../../repository/prisma/prisma-users-repository';

export function makeAuthenticateUseCase(): AuthenticateUseCase {
  const prismaUserRepository = new PrismaUserRepository();
  const authenticateUseCase = new AuthenticateUseCase(prismaUserRepository);

  return authenticateUseCase;
}
