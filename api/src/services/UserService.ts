import { User } from "@prisma/client";

import { UserRepository } from "../repositories/UserRepository";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async registerUser(name: string, email: string, passwordHash: string): Promise<User> {
    const existing = await this.userRepository.findByEmail(email);
    if (existing) {
      throw new Error("E-mail já cadastrado");
    }

    return this.userRepository.create({ name, email, passwordHash,  });
  }

  async listUsers(): Promise<User[]> {
    return this.userRepository.listAll();
  }
}
