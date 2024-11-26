import { Prisma, CheckIn } from '@prisma/client';
import { CheckInRepository } from '../check-in-repository';
import { randomUUID } from 'node:crypto';

export class InMemoryPrismaCheckInRepository implements CheckInRepository {
  private check_ins: CheckIn[] = [];

  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = {
      id: randomUUID(),
      validated_at: new Date(),
    };

    this.check_ins.push(checkIn);

    return checkIn;
  }
}
