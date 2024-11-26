import { CheckIn } from '@prisma/client';
import { PrismaCheckInsUserRepository } from '@/repository/prisma/prisma-check-ins-user-repository';

interface CheckInUserRequest {
  userId: string;
  gymId: string;
}

interface CheckInUserResponse {
  checkIn: CheckIn;
}

export class CheckInsUseCase {
  constructor(
    private readonly checkInsUserRepository: PrismaCheckInsUserRepository
  ) {}

  async execute({
    userId,
    gymId,
  }: CheckInUserRequest): Promise<CheckInUserResponse> {
    const checkIn = await this.checkInsUserRepository.create({
      gymId,
      userId,
    });

    return { checkIn };
  }
}
