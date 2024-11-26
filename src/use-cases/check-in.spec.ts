import { PrismaCheckInsUserRepository } from '@/repository/prisma/prisma-check-ins-user-repository';
import { describe, it, beforeEach } from 'vitest';
import { CheckInsUseCase } from './check-In';

describe('CheckIn', () => {
  let prismaCheckInRepostitory: PrismaCheckInsUserRepository;
  let sut: CheckInsUseCase;

  /*   beforeEach(() => {
    prismaCheckInRepostitory: new Prisma
  }) */

  it('should create a checkIn', async () => {});
});
