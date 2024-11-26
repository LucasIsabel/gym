import { RegisterUserCase } from '@/use-cases/register';
import { PrismaUserRepository } from '@/repository/prisma/prisma-users-repository';

export function makeRegisterUseCase(): RegisterUserCase {
  const userRepository = new PrismaUserRepository();
  const registerUseCase = new RegisterUserCase(userRepository);
  return registerUseCase;
}
