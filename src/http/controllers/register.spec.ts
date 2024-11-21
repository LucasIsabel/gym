import bcrypt from 'bcryptjs';
import { RegisterUseCaseRequest, RegisterUserCase } from '@/use-cases/register';
import { expect, it, beforeAll } from 'vitest';
import { InMemoryUserRepository } from '@/repository/in-memory/in-memory-user-repository';
import { afterEach, describe } from 'node:test';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';

describe('Register', () => {
  let prismaUserRepository: InMemoryUserRepository;
  let registerUseCase: RegisterUserCase;
  let userRequest: RegisterUseCaseRequest;

  beforeAll(() => {
    prismaUserRepository = new InMemoryUserRepository();
    registerUseCase = new RegisterUserCase(prismaUserRepository);
    userRequest = {
      name: 'John Doe',
      email: 'lucas@hotmail.com',
      password: '123',
    };
  });

  it('Should create user', async () => {
    const email = 'another@hotmail.com';

    const { user } = await registerUseCase.execute({ ...userRequest, email });

    expect(user.email).toEqual(email);
  });

  it('Should create user with hash password', async () => {
    const { user } = await registerUseCase.execute(userRequest);

    const isPasswordCorrectlyHashed = await bcrypt.compare(
      '123',
      user.password_hash
    );

    await expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('Should not create user with same email', async () => {
    expect(() => registerUseCase.execute(userRequest)).rejects.toBeInstanceOf(
      UserAlreadyExistsError
    );
  });
});
