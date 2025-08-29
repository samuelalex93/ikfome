import { UserRepository } from "../repositories/UserRepository";
import { compareHash } from "../utils/cryptHash";
import { TokenResponse } from "../types/AuthTypes";
import { generateToken } from "../utils/jtw";
import { InvalidPasswordError, NotFoundError } from "../errors/CustomError";

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async login(email: string, password: string): Promise<TokenResponse> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    const passwordMatch = await compareHash(password, user.password);
    if (!passwordMatch) {
      throw new InvalidPasswordError("Invalid password");
    }

    const token = generateToken(user);
    
    return { token };
  }
}
