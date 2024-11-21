import { User, Prisma } from '@prisma/client';
export class InMemoryUserRepository implements UsersRepository {
  private users: User[] = [];

  async create(data: Prisma.UserCreateInput) {
    const user: User = {
      id: 'user-1',
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
}
