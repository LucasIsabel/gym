import { hash } from 'bcryptjs';
import { InMemoryUserRepository } from '@/repository/in-memory/in-memory-user-repository';
import { beforeAll, describe, expect, it, beforeEach } from 'vitest';
import {
  AuthenticateUseCase,
  AuthenticateUseCaseRequest,
} from './authenticate';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

describe('Authenticate', () => {
  let prismaRepository: InMemoryUserRepository;
  let sut: AuthenticateUseCase;
  let userRequest: AuthenticateUseCaseRequest = {
    email: 'JhonDoen@email.com',
    password: '123',
  };

  beforeAll(() => {
    userRequest = {
      email: 'JhonDoen@email.com',
      password: '123',
    };
  });

  beforeEach(() => {
    prismaRepository = new InMemoryUserRepository();
    sut = new AuthenticateUseCase(prismaRepository);
  });

  it('Should authenticate user', async () => {
    await prismaRepository.create({
      name: 'Jhon Doen',
      email: 'JhonDoen@email.com',
      password_hash: await hash(userRequest.password, 6),
    });

    const isAuthenticate = await sut.execute(userRequest);

    expect(isAuthenticate.user.email).toEqual(userRequest.email);
  });

  it('Should not authenticate user with email', async () => {
    await expect(
      sut.execute({
        email: 'jhon@test.com',
        password: userRequest.password,
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('Should not authenticate user with wrong password', async () => {
    await expect(
      sut.execute({
        email: userRequest.email,
        password: '321',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
