import { UsersRepository } from '@/repository/users-repository';
import { User } from '@prisma/client';
import { ResourceNotFound } from './errors/resoruce-not-foud';

export interface GetUserProfileUseCaseRequest {
  userId: string;
}

interface GetUserProfileUseCaseResponse {
  user: User;
}

export class GetUserProfileUseCase {
  constructor(private readonly userRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFound();
    }

    return { user };
  }
}
