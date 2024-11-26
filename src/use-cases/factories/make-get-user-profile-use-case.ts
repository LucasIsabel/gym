import { PrismaUserRepository } from '@/repository/prisma/prisma-users-repository';
import { GetUserProfileUseCase } from '../get-user-profile';

export function makeGetUserProfileUseCase(): GetUserProfileUseCase {
  const prismaUserRepository = new PrismaUserRepository();
  const getUserProfileUserCase = new GetUserProfileUseCase(
    prismaUserRepository
  );
  return getUserProfileUserCase;
}
