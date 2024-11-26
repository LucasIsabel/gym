import bcrypt from 'bcryptjs';
import { RegisterUseCaseRequest, RegisterUserCase } from '@/use-cases/register';
import { expect, it, beforeAll, describe } from 'vitest';
import { InMemoryUserRepository } from '@/repository/in-memory/in-memory-user-repository';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';

describe('Register', () => {
  let prismaUserRepository: InMemoryUserRepository;
  let sut: RegisterUserCase;
  let userRequest: RegisterUseCaseRequest;

  beforeAll(() => {
    prismaUserRepository = new InMemoryUserRepository();
    sut = new RegisterUserCase(prismaUserRepository);
    userRequest = {
      name: 'John Doe',
      email: 'lucas@hotmail.com',
      password: '123',
    };
  });

  it('Should create user', async () => {
    const email = 'another@hotmail.com';

    const { user } = await sut.execute({ ...userRequest, email });

    expect(user.email).toEqual(expect.any(String));
  });

  it('Should create user with hash password', async () => {
    const { user } = await sut.execute(userRequest);

    const isPasswordCorrectlyHashed = await bcrypt.compare(
      '123',
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('Should not create user with same email', async () => {
    await expect(() => sut.execute(userRequest)).rejects.toBeInstanceOf(
      UserAlreadyExistsError
    );
  });
});
