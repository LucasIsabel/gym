import { User, Prisma } from '@prisma/client';
import { UsersRepository } from '../users-repository';
import { randomUUID } from 'node:crypto';
export class InMemoryUserRepository implements UsersRepository {
  private users: User[] = [];

  async create(data: Prisma.UserCreateInput) {
    const user: User = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      created_at: data?.created_at ? new Date(data.created_at) : new Date(),
      password_hash: data.password_hash,
    };
    this.users.push(user);
    return user;
  }

  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email);
    if (!user) return null;
    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id);
    if (!user) return null;
    return user;
  }
}
