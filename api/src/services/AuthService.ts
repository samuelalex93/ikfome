import jwt from "jsonwebtoken";

import { UserRepository } from "../repositories/UserRepository";
import { compareHash } from "../utils/cryptHash";
import { TokenResponse } from "../types/AuthTypes";

export class AuthService {
  private jwtSecret: string;
  private userRepository: UserRepository;

  constructor() {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET não configurado no .env");
    }
    this.jwtSecret = process.env.JWT_SECRET;
    this.userRepository = new UserRepository();
  }

  async login(email: string, password: string): Promise<TokenResponse> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const passwordMatch = await compareHash(password, user.password);
    if (!passwordMatch) {
      throw new Error("Senha inválida");
    }

    const token = jwt.sign(
      {
        sub: user.id,
        role: user.role,
        email: user.email,
      },
      this.jwtSecret,
      { expiresIn: "1h" }
    );

    return { token };
  }
}
