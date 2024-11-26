import bcrypt from 'bcryptjs';
import { InMemoryUserRepository } from '@/repository/in-memory/in-memory-user-repository';
import { beforeAll, describe, expect, it, beforeEach } from 'vitest';
import { GetUserProfileUseCase } from './get-user-profile';
import { ResourceNotFound } from './errors/resoruce-not-foud';

describe('GetUserProfile', () => {
  let prismaRepository: InMemoryUserRepository;
  let sut: GetUserProfileUseCase;
  let userData: { name: string; email: string; password_hash: string };

  beforeAll(() => {
    userData = {
      name: 'Jhon Doe',
      email: 'jhon@email.com',
      password_hash: '123',
    };
  });

  beforeEach(() => {
    prismaRepository = new InMemoryUserRepository();
    sut = new GetUserProfileUseCase(prismaRepository);
  });

  it('Should get user profile with userId', async () => {
    const createdUser = await prismaRepository.create({
      ...userData,
      password_hash: await bcrypt.hash(userData.password_hash, 6),
    });

    const { user } = await sut.execute({ userId: createdUser?.id });

    expect(user?.name).toEqual(user.name);
  });

  it('Should throw and error with wrong userId', async () => {
    await expect(sut.execute({ userId: '123' })).rejects.toBeInstanceOf(
      ResourceNotFound
    );
  });
});
