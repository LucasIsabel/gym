import { UsersRepository } from '@/repository/users-repository';
import bcrypt from 'bcryptjs';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';
import { User } from '@prisma/client';

export interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUserCaseResponse {
  user: User;
}

export class RegisterUserCase {
  constructor(private readonly userRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUserCaseResponse> {
    const password_hash = await bcrypt.hash(password, 6);
    const userWithSameEmail = await this.userRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.userRepository.create({
      name,
      email,
      password_hash,
    });

    return { user };
  }
}
