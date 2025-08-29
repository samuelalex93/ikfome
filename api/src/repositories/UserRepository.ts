import prisma from "../config/prisma"
import { CreateUserDto, SafeUser, UpdateUserDto, UserType } from "../types/UserTypes";

export class UserRepository {
  async findById(id: string): Promise<SafeUser | null> {
    return prisma.user.findUnique({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      }, where: { id }
    });
  }

  async findByEmail(email: string): Promise<UserType | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  async create(data: CreateUserDto): Promise<UserType> {
    return prisma.user.create({ data });
  }

  async update(id: string,
    data: UpdateUserDto): Promise<UserType> {
    return await prisma.user.update({
      where: { id },
      data,
    });
  }

  async listAll(): Promise<SafeUser[]> {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      }
    });
    return users
  }
}