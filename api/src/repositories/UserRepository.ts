import { Role, User } from "@prisma/client";

import prisma from "../config/prisma"

export class UserRepository {
  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  async create(data: { name: string; email: string; passwordHash: string }): Promise<User> {
    return prisma.user.create({ data });
  }

  async listAll(): Promise<User[]> {
    return prisma.user.findMany();
  }
}