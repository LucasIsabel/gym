import { Prisma, CheckIn } from '@prisma/client';
import { CheckInRepository } from '../check-in-repository';
import { prisma } from '@/lib/prisma';

export class PrismaCheckInsUserRepository implements CheckInRepository {
  create(checkIn: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const createdCheckIn = prisma.checkIn.create({
      data: checkIn,
    });
    return createdCheckIn;
  }
}
