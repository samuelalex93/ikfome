import { User } from "@prisma/client";

import { UserRepository } from "../repositories/UserRepository";
import { cryptHash } from "../utils/cryptHash";
import { SafeUser } from "../types/UserTypes";
export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getUserById(id: string): Promise<SafeUser | null> {
    return this.userRepository.findById(id);
  }
  
  async getUserByEmail(email: string): Promise<SafeUser | null> {
    return this.userRepository.findByEmail(email);
  }

  async registerUser(name: string, email: string, password: string): Promise<SafeUser> {
    const existing = await this.userRepository.findByEmail(email);
    if (existing) {
      throw new Error("Email já cadastrado");
    }
    const passwordHash = await cryptHash(password);
    const user = await this.userRepository.create({
      name,
      email,
      password: passwordHash,
    });
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async listUsers(): Promise<SafeUser[]> {
    return this.userRepository.listAll();
  }

  async updateUser(
    id: string,
    data: Partial<Omit<User, "id" | "createdAt">>
  ): Promise<SafeUser> {
    if(data.password) {
      data.password = await cryptHash(data.password)
    }
    const updated = await this.userRepository.update(id, data)
    const { password: _, ...safeUser } = updated;
    return safeUser;
  }
}
