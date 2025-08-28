import prisma from "../config/prisma"
import { CreateUserDto, UpdateUserDto, UserType } from "../types/UserTypes";

export class UserRepository {
  async findById(id: string): Promise<UserType | null> {
    return prisma.user.findUnique({ where: { id } });
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

  async listAll(): Promise<UserType[]> {
    return prisma.user.findMany();
  }
}